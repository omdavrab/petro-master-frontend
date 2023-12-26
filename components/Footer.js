import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'
import { BiSearchAlt } from 'react-icons/bi';
import { MdOutlineStorefront } from "react-icons/md";
const Footer = () => {
  const router = useRouter()
  const { table_id, restaurant_id } = router.query

  return (
    <div className='py-2 px-5 z-[9999] bottom-0 w-full border-t bg-white'>
      <ul className='flex items-center justify-between'>
        <li >
          <Link href={`/${table_id}/${restaurant_id}/menu`} className='cursor-pointer'>
            <Image alt='menu' width={20} height={20} className="mx-auto" src="/assets/icons/menu.png" />
            <span className={`${router.pathname === "/drink" || router.pathname === "/[table_id]/[restaurant_id]/menu" ? "text-orange" : 'text-black'} text-xs`}>Menu</span>
          </Link>
        </li>
        <li>
          <Link href={`/${table_id}/${restaurant_id}/search`} className='cursor-pointer'>
            <button className='block mx-auto'>
              <BiSearchAlt className='w-5 h-6 text-gray-600' />
            </button>
            <span className={`${router.pathname === "/[table_id]/[restaurant_id]/search" ? "text-orange" : 'text-black'} text-xs`}>Search</span>
          </Link>
        </li>
        <Link href={`/${table_id}/${restaurant_id}/order`} className='cursor-pointer'>
          <li>
            <Image alt='restaurant' width={20} height={20} className="mx-auto" src="/assets/icons/restaurant.png" />
            <span className={`${router.pathname === "/[table_id]/[restaurant_id]/order" ? "text-orange" : 'text-black'} text-xs`}>Order</span>
          </li>
        </Link>
        {/* <Link href={`/${table_id}/${restaurant_id}/payment`} className='cursor-pointer'>
          <li>
            <Image alt='cashier' width={20} height={20} className="mx-auto" src="/assets/icons/cashier.png" />
            <span className={`${router.pathname === "/[table_id]/[restaurant_id]/payment" ? "text-orange" : 'text-black'} text-xs`}>Checkout</span>
          </li>
        </Link> */}
      </ul>
    </div>
  )
}

export default Footer
