"use client";
import React, { useState } from 'react'
import { Card, CardContent } from './ui/card';
import Image from 'next/image';
import { CarIcon, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useRouter } from 'next/navigation';

export interface CarProps {
  id: number;
  make: string,
  model: string,
  year: number,
  price: number,
  images: Array<string>,
  transmission: string,
  fuelType: string,
  bodyType: string,
  mileage: number,
  color: string,
  wishlisted: boolean,
}

const CardCard = ({ car }: { car: CarProps }) => {
  const [isSaved, setIsSaved] = useState(car.wishlisted);
  const router = useRouter();
  const hadleToggleSave = async () => {
  }

  return (
    <Card className='overflow-hidden hover:shadow-lg group transition py-0'>
      <div className='relative h-48'>
        {
          car?.images && car?.images.length > 0 ?
            <div className='h-full w-full relative'>
              <Image
                src={car?.images[0]}
                alt={`${car?.make} ${car?.model}`}
                fill
                className='object-cover group-hover:scale-105 transition duration-300'
              />
            </div>
            :
            <div className='w-full h-full  bg-gray-200 flex items-center justify-center '>
              <CarIcon className='h-12 w-12 text-gray-400' />
            </div>
        }

        <Button variant={"ghost"} size={"icon"}
          className={`absolute top-2 right-2 bg-white/90 rounded-full p-1.5 
            ${isSaved ? "text-red-500 hover:text-red-600" : "text-gray-600 hover:text-gray-900"
            }`}
          onClick={hadleToggleSave}
        >
          <Heart className={isSaved ? "fill-current" : ""} size={20} />
        </Button>
      </div>

      <CardContent className='p-4'>
        <div className='flex flex-col mb-2'>
          <h3 className='text-lg font-bold line-clamp-1'>
            {car.make} {car.model}
          </h3>
          <span className='text-xl font-bold text-blue-500'>
            ${car.price.toLocaleString()}
          </span>
        </div>

        <div className='text-gray-600 flex items-center'>
          <span>{car.year}</span>
          <span className='mx-2'><b>&middot;</b></span>
          <span>{car.transmission}</span>
          <span className='mx-2'><b>&middot;</b></span>
          <span>{car.fuelType}</span>
        </div>

        {/* Badge */}
        <div className='flex flex-wrap gap-1 mb-4'>
          <Badge variant={"outline"} className='bg-gray-50' >
            {car.bodyType}
          </Badge>
          <Badge variant={"outline"} className='bg-gray-50' >
            {car.mileage.toLocaleString()}milage
          </Badge>
          <Badge variant={"outline"} className='bg-gray-50' >
            {car.color}
          </Badge>
        </div>

        <div className='flex' >
          <Button
            className='flex-1'
            onClick={() => { router.push(`/cars/${car.id}`) }}
          >View Car</Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default CardCard;