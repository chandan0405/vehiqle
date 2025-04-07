import React from 'react'

const AuthLayout = ({ children }) => {
  return (
    <div className='flex justify-center items-center pt-40'>
      {children}
    </div>
  )
}

export default AuthLayout