import React from 'react'
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import DatePicker from './DatePicker'


const CreateCoupon = ({ open, setOpen }) => {

    return (
        <div>
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-[999]" onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black dark:bg-gray-500/[75%] bg-opacity-75 transition-opacity" />
                    </Transition.Child>
                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform  dark:bg-[#0c1a32] rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl ">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-base font-semibold border-b px-4 py-4 leading-6 dark:text-white text-gray-900"
                                    >
                                        Add Your Product Base Coupon
                                    </Dialog.Title>
                                    <div className='px-4 py-4 space-y-3'>
                                        <div className='flex items-center  grid grid-cols-3'>
                                            <span className='col-span-1 dark:text-gray-100 text-[14px] text-gray-700'>
                                                Coupon code
                                            </span>
                                            <div className='col-span-2'>
                                                <input placeholder='Coupon code' className="block  w-full text-[14px] py-1.5 px-6 text-[#6e6e6e] rounded-md border border-[#f0f1f5] focus:border-orange transition duration-300 focus:outline-none focus:ring-0  shadow-none rounded-md bg-white dark:text-gray-300 dark:bg-[#20304c]" />
                                            </div>
                                        </div>
                                        <div className='flex items-center grid grid-cols-3'>
                                            <span className='col-span-1 dark:text-gray-100 text-[14px] text-gray-700'>
                                                Minimum Shopping
                                            </span>
                                            <div className='col-span-2'>
                                                <input placeholder='Minimum Shopping' className="block  w-full text-[14px] py-1.5 px-6 text-[#6e6e6e] rounded-md border border-[#f0f1f5] focus:border-orange transition duration-300 focus:outline-none focus:ring-0  shadow-none rounded-md bg-white dark:text-gray-300 dark:bg-[#20304c]" />
                                            </div>
                                        </div>
                                        <div className='flex items-center grid grid-cols-3'>
                                            <span className='col-span-1 dark:text-gray-100 text-[14px] text-gray-700'>
                                                Discount
                                            </span>
                                            <div className='col-span-2'>
                                                <input placeholder='Discount' className="block  w-full text-[14px] py-1.5 px-6 text-[#6e6e6e] rounded-md border border-[#f0f1f5] focus:border-orange transition duration-300 focus:outline-none focus:ring-0  shadow-none rounded-md bg-white dark:text-gray-300 dark:bg-[#20304c]" />
                                            </div>
                                        </div>
                                        <div className='flex items-center  grid grid-cols-3'>
                                            <span className='col-span-1 dark:text-gray-100 text-[14px] text-gray-700'>
                                                Maximum Discount Amount
                                            </span>
                                            <div className='col-span-2'>
                                                <input placeholder='Maximum Discount Amount' className="block  w-full text-[14px] py-1.5 px-6 text-[#6e6e6e] rounded-md border border-[#f0f1f5] focus:border-orange transition duration-300 focus:outline-none focus:ring-0  shadow-none rounded-md bg-white dark:text-gray-300 dark:bg-[#20304c]" />
                                            </div>
                                        </div>
                                        <div className='flex items-center grid grid-cols-3'>
                                            <span className='col-span-1 dark:text-gray-100 text-[14px] text-gray-700'>
                                                Date
                                            </span>
                                            <div className='col-span-2'>
                                                <DatePicker />
                                            </div>
                                        </div>
                                        <div className='flex justify-end'>
                                            <button onClick={() => setOpen(false)} className='bg-orange text-white px-4 py-2.5 rounded'>
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </div>
    )
}

export default CreateCoupon
