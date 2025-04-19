"use client";
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Search } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'

const CarList = () => {
  const [search, setSearch] = useState<string>("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <div className='space-y-4'>
      <div className='flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between'>
        <Button className='cursor-pointer' asChild>
          <Link href={"/admin/cars/create"}>
            <Plus className='h-4 w-4' />Add Car
          </Link>
        </Button>
        <form onSubmit={handleSubmit} className='flex w-full sm:w-auto'>
          <div className='relative flex-1'>
            <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-gray-500' />
            <Input className='pl-9 w-full sm:w-60'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type='search'
              placeholder='Search cars...'
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default CarList