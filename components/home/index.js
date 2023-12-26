import { useRouter } from 'next/router'
import React from 'react'

const Home = () => {
  const router = useRouter()
  return (
    <div className='h-screen relative w-full'>
      <img
        className="absolute inset-0 h-full w-full object-cover"
        src="./assets/images/scennmenu.jpg"
        alt=""
      />
      <div className='absolute flex justify-center items-center inset-0 bg-lightsteelblue/[0.5]'>

      <button onClick={()=>{router.push('/menu')}} className=' rounded-full py-[16px] w-[200px] font-semibold text-[18px] text-white bg-orange transition duration-300 hover:bg-darkolivegreen  '>
        Menu
      </button>
      </div>
    </div>
  )
}

export default Home
