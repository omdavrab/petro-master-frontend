import SvgComponent from '@/public/assets/404animation'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'

const Custom404 = () => {
  const router = useRouter()

  return (
    <div className='h-screen w-full flex items-center bg-white justify-center'>
      <div className='w-full max-w-[800px]'>
        <SvgComponent />
        <div className='flex mt-10 items-center justify-center'>
          <button onClick={() => router.back()} className='rounded-full bg-[#263238] text-white transition duration-300 px-7 py-2 hover:text-[#263238] hover:bg-[#f38c10]/[0.8]'>
            Go to Dashboard
          </button>
        </div>
      </div>

    </div>
  )
}

export default Custom404
