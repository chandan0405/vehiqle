"use client";
import React, { useState } from 'react'
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers"
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';


const fuelTypes = ["Petrol", "Diesel", "Electric", "Hybrid", "Plug-in Hybrid"];
const transmission = ["Automatic", "Manual", "Semi-Automatic"]
const bodyTypes = [
  "SUV",
  "Sedan",
  "Hatchback",
  "Covertible",
  "Coupe",
  "Vegan",
  "Pickup"
];

const carStatuses = ["AVAILABLE", "UNAVAILABLE", "SOLD"]


const AddNewCarForm = () => {
  const [activeTabs, setActiveTabs] = useState("ai")

  const carFormSchema = z.object({
    make: z.string().min(1, "Make is required"),
    model: z.string().min(1, "Model is required"),
    year: z.string().refine((val) => {
      const year = parseInt(val);
      return (
        !isNaN(year) && year >= 1900 && year <= new Date().getFullYear() + 1
      )
    }, "valid year required"),
    price: z.string().min(1, "Price is required"),
    mileage: z.string().min(1, "Mileage is required"),
    color: z.string().min(1, "Color is required"),
    fuelType: z.string().min(1, "Tuel bodyType is required"),
    transmission: z.string().min(1, "Transmission is required"),
    bodyType: z.string().min(1, "Body is required"),
    seats: z.string().optional(),
    description: z.string().min(10, "Description must be at least 10 character"),
    status: z.enum(["AVAILABLE", "UNAVAILABLE", "SOLD"]),
    featured: z.boolean().default(false)

  });

  const {
    register,
    setValue,
    getValues,
    formState: { error },
    handleSubmit,
    watch
  } = ({
    resolver: zodResolver(carFormSchema),
    defaultValues: {
      make: "",
      model: "",
      year: "",
      price: "",
      mileage: "",
      color: "",
      fuelType: "",
      transmission: "",
      bodyType: "",
      seats: "",
      description: "",
      status: "AVAILABLE",
      featured: false,
    }
  })

  return (
    <div>
      <Tabs defaultValue="ai" className="mt-6" value={activeTabs}
        onValueChange={setActiveTabs}
      >
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value="manual">Manual Entry</TabsTrigger>
          <TabsTrigger value="ai">AI Upload</TabsTrigger>
        </TabsList>
        <TabsContent value="manual" className='mt-6'>
          <Card>
            <CardHeader  >
              <CardTitle  >Car Details</CardTitle>
              <CardDescription >Enter the detail of the car you want to add.</CardDescription>
            </CardHeader>
          </Card>
        </TabsContent>
        <TabsContent value="ai" className='mt-6'>Change your password here.</TabsContent>
      </Tabs>

    </div>
  )
}

export default AddNewCarForm;