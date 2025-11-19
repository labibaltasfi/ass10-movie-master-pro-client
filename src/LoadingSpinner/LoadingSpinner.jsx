import React from 'react'
import { PacmanLoader } from 'react-spinners'


const LoadingSpinner = () => {
  return (
    <div className='flex justify-center items-center h-[calc(100vh-285px)]'>
      <PacmanLoader color={'purple'} />
    </div>
  )
}

export default LoadingSpinner