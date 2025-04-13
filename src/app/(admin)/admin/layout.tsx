import React from 'react'
import { getAdmin } from '../../../../actions/admin'
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Sidebar from './_components/Sidebar';

const AdminLayout = async ({ children }) => {
  const admin = await getAdmin();
  if (!admin) {
    return notFound();
  }
  return (
    <div className='h-full'>
      <Header isAdminPage={true} />
      <div className='flex flex-col h-full w-56 fixed top-20 inset-y-0 z-50  '>
        <Sidebar />
      </div>
      <main className='md:pl-56 pt-[80px] h-full'>
        {children}
      </main>
    </div>
  )
}

export default AdminLayout