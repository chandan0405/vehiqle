import { SignedIn } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { Button } from './ui/button';
import { ArrowLeft, CarFront, HeartIcon, Layout } from 'lucide-react';

const Header = ({ isAdminPage = false }) => {
  const isAdmin = false;
  return (
    <header className='fixed top-0 w-full bg-white/80 backdrop-blur-lg z-50 border-b'>
      <nav className='mx-auto px-4 py-4 flex justify-between items-center'>
        <Link href={isAdminPage ? "/admin" : '/'} className='flex'>

          <Image
            src={"/logo.png"}
            alt='logo'
            width={200}
            height={60}
            className='h-12 w-auto object-contain'
          />
          {
            isAdminPage && (
              <span className='text-xs font-extralight'>
                Admin
              </span>
            )
          }
        </Link>
        <div className='flex items-center space-x-4'>
          {
            isAdminPage ? <Link href={"/"} >
              <Button variant={"outline"} className='cursor-pointer flex gap-2 items-center'>
                <ArrowLeft size={18} />
                <span className='hidden lg:inline'>Back to app</span>
              </Button>
            </Link>
              :
              <SignedIn>
                <Link href={"/saved-cars"} >
                  <Button className='cursor-pointer'>
                    <HeartIcon size={18} />
                    <span className='hidden lg:inline'>Saved Cars</span>
                  </Button>
                </Link>
                {
                  !isAdmin ? <Link href={"/reservations"} >
                    <Button variant={'outline'} className='cursor-pointer'>
                      <CarFront size={18} />
                      <span className='hidden lg:inline'>Reservation</span>
                    </Button>
                  </Link>
                    :
                    <Link href={"/admin"} >
                      <Button variant={'outline'} className='cursor-pointer'>
                        <Layout size={18} />
                        <span className='hidden lg:inline'>Admin</span>
                      </Button>
                    </Link>
                }
              </SignedIn>
          }
        </div>
      </nav>
    </header>
  )
}

export default Header