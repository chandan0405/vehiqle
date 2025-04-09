import CardCard from "@/components/Car-card";
import HomeSearchPage from "@/components/Home-search";
import { Button } from "@/components/ui/button";
import { carMakes, featuredCars } from "@/lib/data";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="pt-20 flex flex-col">
      {/* Hero section */}
      <section className="relative py-16 md:py-24 dotted-background text-white">
        <div className="max-w-4xl mx-auto text-center">
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
    </div>
  );
}
