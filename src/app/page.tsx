import CardCard from "@/components/Car-card";
import HomeSearchPage from "@/components/Home-search";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { bodyTypes, carMakes, faqItems, featuredCars } from "@/lib/data";
import { SignedOut } from "@clerk/nextjs";
import { Calendar, Car, ChevronRight, Shield } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="pt-20 flex flex-col ">
      {/* Hero section */}
      <section className="relative py-16 md:py-24 dotted-background text-white">
        <div className="max-w-4xl mx-auto text-center p-4">
          <div className="mb-8">
            <h1 className="text-5xl lg:text-8xl mb-4 tracking-tight font-extrabold pr-2 pb-2 bg-gradient-to-r from-blue-500 to-green-500 text-transparent bg-clip-text">
              Find your dream car with Vehiql AI</h1>
            <p className="text-xl text-gray-500 mb-8 max-w-2xl mx-auto">
              Advanced AI car search and test drive from thousand of vehicles.
            </p>
          </div>
          {/* Search section */}
          <HomeSearchPage />
        </div>
      </section>

      {/* Feature Cars */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Featured Cars</h2>
            <Link href={"/cars"}  >
              <Button variant={"ghost"} className="flex items-center"  >
                View All <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
          {/* Featured car image */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {
              featuredCars.map((car) => (
                <CardCard key={car.id} car={car} />
              ))
            }
          </div>
        </div>
      </section>

      {/* Browse by make */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Browse By Make</h2>
            <Link href={"/cars"}  >
              <Button variant={"ghost"} className="flex items-center"  >
                View All <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
          {/* Featured car image */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {
              carMakes?.map((car) => (
                <Link
                  key={car.id}
                  href={`/cars?make=${car.name}`}
                  className="bg-white rounded-lg shadow p-4 text-center hover:shadow-md transition cursor-pointer"
                >
                  <div
                    className="h-16 w-auto mx-auto mb-2 relative "
                  >
                    <Image
                      src={car.image}
                      alt={car.name}
                      fill
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                  <h3 className="font-medium">{car.name}</h3>
                </Link>
              ))
            }
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-18">
            Why choose our Platform
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 text-blue-700 rounded-full w-16 h-16 flex justify-center
               items-center mx-auto mb-4">
                <Car className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Wide selection</h3>
              <p className="text-gray-600">
                Thousands of verified vehicles from trusted dealership and private sellers.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 text-blue-700 rounded-full w-16 h-16 flex justify-center
               items-center mx-auto mb-4">
                <Calendar className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Easy test Drive</h3>
              <p className="text-gray-600">
                Book a online test drive within a minute, with flexible sheduling options.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 text-blue-700 rounded-full w-16 h-16 flex justify-center
               items-center mx-auto mb-4">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Secure Process</h3>
              <p className="text-gray-600">
                Varified listing and secure booking process for peace of mind.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* Browse by Body Type */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Browse By Body Type</h2>
            <Link href={"/cars"}  >
              <Button variant={"ghost"} className="flex items-center"  >
                View All <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {
              bodyTypes?.map((types) => (
                <Link
                  key={types.id}
                  href={`/cars?bodyTypes=${types.name}`}
                  className="group cursor-pointer relative "
                >
                  <div
                    className=" relative overflow-hidden flex justify-end rounded-lg h-28 mb-4 "
                  >
                    <Image
                      src={types.image}
                      alt={types.name}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-300"

                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-lg flex  items-end">
                    <h3 className="text-white text-xl font-bold pl-4 pb-2 mb-1">{types.name}</h3>
                  </div>
                </Link>
              ))
            }
          </div>
        </div>
      </section>


      {/* FAQ */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Question</h2>
          {
            faqItems?.map((faq, index) => (
              <Accordion type="single" collapsible key={index} className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

            ))
          }
        </div>
      </section>

      {/* Explore Page */}
      <section className="dotted-background py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to find your dream car?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who found their perfect vehicle through our platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size={"lg"} variant={"secondary"} asChild>
              <Link href={"/cars"}>
                View all cars
              </Link>
            </Button>
            <SignedOut>
              <Button size={"lg"} asChild>
                <Link href={"/sign-up"}>
                  Sign Up Now
                </Link>
              </Button>
            </SignedOut>
          </div>
        </div>
      </section>
    </div>
  );
}
