import Image from 'next/image'
import React from 'react'

const NoItemFound = () => {
    return (
        <div className='flex items-cenetr flex-col items-center justify-center h-full'>
            <div className=''>
                <Image width={300} height={300} src="/assets/icons/noitem.png" alt='noitem' className='flex-none mx-auto' />
            </div>
            <h2 className='text-orange font-semibold mb-4 text-[20px]'>
                No Item Found
            </h2>
            <span className='text-gray-600 block text-center'>
                Come back for the yumminess <br /> we are updating the menu
            </span>
        </div>
    )
}

export default NoItemFound
