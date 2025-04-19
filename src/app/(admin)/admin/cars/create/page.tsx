import React from 'react'
import AddNewCarForm from '../_components/add-new-car'


export const metadata = {
  title: "Add new car | Vehiqle Admin ",
  description: "Add a new car to market place"
}
const AddCarPage = () => {
  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-6'>
        Add New car
      </h1>
      <AddNewCarForm />
    </div>
  )
}

export default AddCarPage;