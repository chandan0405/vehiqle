"use client";
import { cn } from '@/lib/utils'
import { Calendar, Car, Cog, LayoutDashboard } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'


const ROUTES = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin"
  },
  {
    label: "Cars",
    icon: Car,
    href: "/admin/cars"
  },
  {
    label: "Test Drives",
    icon: Calendar,
    href: "/admin/test-drives"
  },
  {
    label: "Settings",
    icon: Cog,
    href: "/admin/settings"
  },
]
const Sidebar = () => {
  const pathName = usePathname();
  return (
    <>
      <div className='hidden md:flex h-full flex-col overflow-y-auto bg-white shadow-sm border-r'>
        {
          ROUTES?.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn("flex items-center gap-x-2\
                 text-slate-500 font-medium pl-6 transition-all hover:text-slate-600 hover:bg-slate-100/50 h-12",
                pathName === route.href ? " text-blue-600 bg-blue-100/50 hover:text-blue-700" : ""
              )}
            >
              <route.icon className='h-5 w-5' />
              {route.label}
            </Link>
          ))
        }
      </div>
      <div className='flex md:hidden  fixed bottom-0 left-0 right-0 z-50 bg-white border-t justify-around items-center h-16 '>
        {
          ROUTES?.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn("flex flex-col items-center justify-center text-slate-500 font-medium  transition-all \
                py-1 flex-1",
                pathName === route.href ? " text-blue-700" : ""
              )}
            >
              <route.icon className='h-5 w-5' />
              {
                route.label === 'Test Drives' ? "Test" : route.label
              }
            </Link>
          ))
        }
      </div>
    </>
  )
}

export default Sidebar