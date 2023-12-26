import URL from '@/URL'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { HiArrowLeft } from 'react-icons/hi'
import { RxDotFilled } from 'react-icons/rx'
import { useSelector } from 'react-redux'
const people = [
    { itemimage: '/assets/images/dish-2.png', course: 'Main Course', productname: 'Instant Pot Pad Thai', price: '270', qty: '1', totalprice: '270' },
    { itemimage: '/assets/images/dish-2.png', course: 'Main Course', productname: 'Instant Pot Pad Thai', price: '270', qty: '1', totalprice: '270' },
    { itemimage: '/assets/images/dish-2.png', course: 'Main Course', productname: 'Instant Pot Pad Thai', price: '270', qty: '1', totalprice: '270' },
    { itemimage: '/assets/images/dish-2.png', course: 'Main Course', productname: 'Instant Pot Pad Thai', price: '270', qty: '1', totalprice: '270' },
]
const OrderDetail = () => {
    const router = useRouter()
    const OrderView = useSelector((state) => state.GetOrder.orderViewData)
    const [orderViewsData, setorderViewsData] = useState()

    useEffect(() => {
        setorderViewsData(OrderView)
    }, [OrderView])
    return (
        <div className='px-6 sm:px-10'>
            <div className='text-gray-900 dark:text-white text-[24px] flex mb-6 items-center gap-4'>
                <button onClick={() => router.back()} className='outline-none'>
                    <HiArrowLeft />
                </button>
                <h4>Order Details</h4>
            </div>
            <div className='bg-white dark:bg-[#0c1a32] rounded-lg mb-5 shadow-sm '>
                <div className='flex items-center gap-3 dark:border-gray-500  border-b p-4'>
                    <div className=''>
                        <Image src="/assets/images/3.jpg" alt='3' className='rounded-full border dark:border-gray-500 shadow' width={60} height={60} />
                    </div>
                    <div>
                        <h3 className='font-semibold text-[18px] dark:text-white text-gray-800'>{orderViewsData?.userId?.name}</h3>
                        <span className='text-darkolivegreen dark:text-gray-400'>{orderViewsData?.number}</span>
                    </div>
                </div>
                <div className='p-4 flex items-center gap-3 dark:border-gray-500 border-b'>
                    <FontAwesomeIcon icon={faEnvelope} className="text-orange" />
                    <span className='text-gray-800 dark:text-gray-300'>{orderViewsData?.userId?.email}</span>
                </div>
                <div className='p-4 '>
                    <h3 className='font-semibold mb-1.5 dark:text-white text-gray-800'>
                        Order Nots
                    </h3>
                    <p className='text-gray-700 dark:text-gray-400 text-[14px]'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                </div>
            </div>
            <div className='bg-white dark:bg-[#0c1a32] rounded-lg shadow-sm px-5 py-2'>
                <div className=" flow-root">
                    <div className=" overflow-x-auto ">
                        <div className="inline-block min-w-full align-middle">
                            <table className="min-w-full divide-y dark:divide-gray-500 divide-gray-400">
                                <thead>
                                    <tr>
                                        <th scope="col" className="py-3.5 px-2 text-left text-sm font-semibold text-gray-900 dark:text-white ">
                                            <input type="checkbox" id="status" name="status" value="order" className="h-4 w-4 rounded border-gray-300 text-orange focus:ring-orange" />
                                            {/* <label htmlFor="order">Order status</label> */}
                                        </th>
                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900 dark:text-white ">
                                            Item
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                                            Product info
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                                            Customization
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                                            Price
                                        </th>

                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                                            Quantity
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                                            Total
                                        </th>
                                        <th scope="col" className="relative text-right text-sm font-semibold text-gray-900 dark:text-white py-3.5 pl-3 pr-4 sm:pr-0">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y dark:divide-gray-500 divide-gray-200">
                                    {orderViewsData?.menuList?.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td className='py-3.5 px-2'>
                                                    <input type="checkbox" id="status" name="status" value="order" className="h-4 w-4 rounded border-gray-300 text-orange focus:ring-orange" />
                                                </td>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-white ">
                                                    <img width={130} height={130} alt={item.itemimage} src={`${URL}/image/${item?.menuId?.image}`} className='mx-auto' />
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm dark:text-gray-400 text-gray-500">
                                                    <h3 className='text-[16px] font-semibold mt-2 dark:text-gray-200 text-gray-600'>
                                                        {item?.menuId?.name}
                                                    </h3>
                                                    <span>
                                                        {item?.menuId?.category}
                                                    </span>
                                                </td>
                                                <td className="whitespace-wrap max-w-[250px] px-3 py-4 text-sm dark:text-gray-400 ">
                                                    <div className='flex  gap-2'>
                                                        <h3 className=''>Instructions:- </h3>
                                                        <p className="text-gray-500 break-all">{item?.Instructions?.Instructions}</p>
                                                    </div>
                                                    <div className="flex mt-4">
                                                        <h3 className=" font-medium">Customization:-</h3>
                                                        <ul className="flex gap-x-3 flex-wrap">
                                                            {item?.Instructions?.customizeItem?.map((i, index) => {
                                                                return (
                                                                    <li key={index} className='text-gray-500 whitespace-nowrap flex items-center'
                                                                    >
                                                                        <RxDotFilled />  {i}
                                                                    </li>
                                                                );
                                                            })}
                                                        </ul>
                                                    </div>
                                                </td>

                                                <td className="whitespace-nowrap px-3 py-4 text-sm dark:text-gray-200 text-gray-500">${item?.menuId?.price}</td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm dark:text-gray-200 text-gray-700">{item?.QTY}</td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm dark:text-gray-200 text-gray-700">${item?.price * item?.QTY}</td>
                                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4  text-right text-sm font-medium sm:pr-0">
                                                    <a href="#" className="text-indigo-600 dark:text-orange hover:text-indigo-900">
                                                        Edit
                                                    </a>

                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export async function getServerSideProps(ctx) {
    const myCookie = ctx.req?.cookies || "";

    if (!myCookie.authorization) {
        return {
            redirect: {
                destination: "/admin/login",
                permanent: false,
            },
        };
    }
    return {
        props: {},
    };
}
export default OrderDetail
