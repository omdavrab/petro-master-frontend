import Image from 'next/image'
import React from 'react'

const NoData = () => {
    return (
        <div className='min-h-[calc(100vh_-_145px)] w-full flex items-center justify-center'>
            
            <Image
                src='/assets/images/No data (2).gif'
                // layout='responsive'
                height={600}
                width={600}
                className='opacity-90'
                alt="No data (2)"
                unoptimized={true}
            />
        </div>
    )
}

export default NoData
