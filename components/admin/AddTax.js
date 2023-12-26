import React, { useEffect } from 'react'
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useDispatch } from 'react-redux'
import { HandleCreateTax, HandleEditTax, HandleGetTax } from '@/redux/action/tax'
import { CloseLoader, OpenLoader } from '@/redux/action/loader'
import { toast } from 'react-toastify'



const AddTax = ({ open, setOpen, taxEdit, setTaxEdit }) => {
    console.log("🚀 ~ file: AddTax.js:12 ~ AddTax ~ taxEdit:", taxEdit)
    const dispatch = useDispatch()
    const [taxData, setTaxData] = useState({ name: "", value: "" })
    console.log("🚀 ~ file: AddTax.js:12 ~ AddTax ~ taxData:", taxData)

    const HandleUserData = (event) => {
        setTaxData({ ...taxData, [event.target.name]: event.target.value });
    };

    const HandleTax = () => {
        dispatch(OpenLoader(true));
        dispatch(taxEdit?._id ? HandleEditTax(taxEdit._id, taxData) : HandleCreateTax(taxData)).then((result) => {
            if (result.payload.status === 200) {
                toast(result?.payload?.data.message, {
                    hideProgressBar: true,
                    autoClose: 3000,
                    type: "success",
                });
                setTaxEdit()
                dispatch(HandleGetTax())
                setTaxData({ name: "", value: "" })
                dispatch(CloseLoader(false));
            } else {
                dispatch(CloseLoader(false));
                toast(result?.payload?.data.message, {
                    hideProgressBar: true,
                    autoClose: 3000,
                    type: "error",
                });
            }
        })
            .catch((err) => {
                console.log(err);
            });
        setOpen(false)
    }

    useEffect(() => {
        setTaxData({
            name: taxEdit?.name,
            value: taxEdit?.value
        })
    }, [taxEdit])
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
                                <Dialog.Panel className="relative transform  dark:bg-[#0c1a32] rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl ">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-base font-semibold border-b px-4 py-5 leading-6 dark:text-white text-gray-900"
                                    >
                                        Add New Tax
                                    </Dialog.Title>
                                    <div className='px-4 py-4 space-y-3'>
                                        <div className='flex items-center  grid grid-cols-3'>
                                            <span className='col-span-1 dark:text-gray-100 text-[14px] text-gray-700'>
                                                Tax name
                                            </span>
                                            <div className='col-span-2'>
                                                <input value={taxData.name} placeholder='Name' name='name' onChange={(e) => HandleUserData(e)} className="block  w-full text-[14px] py-2.5 px-6 text-[#6e6e6e] rounded-md border border-[#f0f1f5] focus:border-orange transition duration-300 focus:outline-none focus:ring-0  shadow-none rounded-md bg-white dark:text-gray-300 dark:bg-[#20304c]" />
                                            </div>
                                        </div>
                                        <div className='flex items-center grid grid-cols-3'>
                                            <span className='col-span-1 dark:text-gray-100 text-[14px] text-gray-700'>
                                                Tax value in percentage
                                            </span>
                                            <div className='col-span-2'>
                                                <input value={taxData.value} placeholder='Value' name='value' type='number' onChange={(e) => HandleUserData(e)} className="block  w-full text-[14px] py-2.5 px-6 text-[#6e6e6e] rounded-md border border-[#f0f1f5] focus:border-orange transition duration-300 focus:outline-none focus:ring-0  shadow-none rounded-md bg-white dark:text-gray-300 dark:bg-[#20304c]" />
                                            </div>
                                        </div>

                                        <div className='flex justify-end'>
                                            <button type='button' onClick={() => {
                                                setTaxEdit()
                                                setTaxData({ name: "", value: "" })
                                                setOpen(false)
                                            }} className='bg-white text-gray-800 px-4 py-2.5 rounded'>
                                                Close
                                            </button>
                                            <button type='submit' disabled={taxData.name === "" || taxData.value === ""} onClick={() => HandleTax()} className='bg-orange text-white px-4 py-2.5 rounded'>
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

export default AddTax
