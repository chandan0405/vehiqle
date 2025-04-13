import React from 'react'

const CarPage = async ({ params }) => {
  const { id } = await params;

  return (
    <div>caqr id : {id}</div>
  )
}

export default CarPage