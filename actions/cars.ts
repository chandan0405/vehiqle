import { db } from "@/lib/prisma";
import { createClient } from "@/lib/supabase";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";

async function convertFileToBase64(file: File) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  return buffer.toString("base64");
}

export async function processCarImageWithAI(file: File) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("Gemini API is not configured correctly");
    }
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const base64Image = await convertFileToBase64(file);

    const imagePart = {
      inlineData: {
        data: base64Image,
        mimeType: file.type,
      },
    };
    const propmt = `
    Analyze this car Image and extract the following information:    
    1. Make(Manufacturer)
    2. Model
    3. Year(Approx)
    4. Color
    5. BodyType(SUV, Sudan, Hatchback, etc)
    6. Mileage
    7. Fuel Type(Your best guess)
    8. Transmission Type(Your best guess)
    9.  Price(Your best guess)
    10. Short description as to be added to a car listing

    Format your response as a clean JSON object with these fields:
    {
      make: "",
      model: "",
      year: 0000,
      color: "",
      price: "",
      mileage: "",
      bodyType: "",
      fuelType: "",
      transmission: "",
      description: "",
      confidence: 0.0,

    }

    For confidence , Provide a value between 0 and 1 represnting how confident you are in overall identification.
    Only respond with JSON Object, nothing else.
    `;

    const result = await model.generateContent([imagePart, propmt]);
    const response = await result.response;
    const text = response.text();
    const cleanText = text.replace(/```(?:json)?\n?/g, "").trim();
    try {
      const parsedCarDetails = JSON.parse(cleanText);

      const requiredField = [
        "make",
        "model",
        "year",
        "color",
        "price",
        "mileage",
        "bodyType",
        "fuelType",
        "transmission",
        "description",
        "confidence",
      ];
      const missingFields = requiredField.filter(
        (field) => !(field in parsedCarDetails)
      );
      if (missingFields.length > 0) {
        throw new Error(
          `AI response mission required fields: ${missingFields.join(", ")}`
        );
      }
      return {
        success: true,
        data: parsedCarDetails,
      };
    } catch (error) {
      console.log("error in parsing the text", error);
      return {
        success: false,
        error: "Failed to parse the AI response",
      };
    }
  } catch (error) {
    console.log("Error in image processing", error);
  }
}

export async function addCar({ carData, Images }) {
  try {
    const { userId } = await auth();
    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
    });
    if (!user) {
      throw new Error("User not found");
    }

    const carId = uuidv4();
    const folderPath = `cars/${carId}`;
    const cookiesStore = await cookies();
    const supabase = createClient(cookiesStore);

    const imageUrl = [];
    for (let i = 0; i < Images.length; i++) {
      const base64Data = Images[i];

      // Skip the image if data is not valid
      if (!base64Data || !base64Data.startsWith("data:images/")) {
        console.warn("Skipping invalid images data");
        continue;
      }
      //Extract the base64 part (remove the data: image/xyz;base64, prefix)
      const base64 = base64Data.split(",")[1];
      const imageBuffer = Buffer.from(base64, "base64");
      // Deteremine the File Extension from the Data URL
      const mimeMatch = base64Data.match("/data:image/([a-zA-Z]+);/");
      const fileExtension = mimeMatch ? mimeMatch[1] : "jpeg";

      // create the FileName
      const fileName = `image-${Date.now()}-${i}.${fileExtension}`;
      const filePath = `${folderPath}/${fileName}`;
      const { data, error } = await supabase.storage
        .from("car-images")
        .upload(filePath, imageBuffer, {
          contentType: `images/${fileExtension}`,
        });
      if (error) {
        console.error("Error uploading the image", error);
        throw new Error("Failed to Upload images : ", error.message);
      }
      const publicUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/car-images/${filePath}`;
      imageUrl.push(publicUrl);
    }
    if (imageUrl.length === 0) {
      throw new Error("No Valid Images were uploaded");
    }
    const car = await db.car.create({
      data: {
        id: carId,
        make: carData?.make,
        model: carData?.model,
        year: carData?.year,
        price: carData?.price,
        mileage: carData?.mileage,
        color: carData?.color,
        fuelType: carData?.fuelType,
        transimission: carData?.transimission,
        bodyType: carData?.bodyType,
        seats: carData?.seats,
        description: carData?.description,
        status: carData?.status,
        featured: carData?.featured,
        images: carData?.images,
      },
    });
    revalidatePath("/admin/cars");
    return {
      success: true,
    };
  } catch (error) {
    console.error("error in adding car", error);
    throw new Error("Error in adding new Car");
  }
}
