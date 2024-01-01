import React from "react";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import URL from "@/URL";

const EmployeeView = ({ open, setOpen, data }) => {
  return (
    <div>
      {data && (
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
                      Employee View
                    </Dialog.Title>
                    <div className="px-4 py-4 space-y-3">
                      <div className="flex items-center  grid grid-cols-3">
                        <span className="col-span-1 dark:text-gray-100 text-[14px] text-gray-700">
                          Name
                        </span>
                        <div className="col-span-2">
                          <span className="block  w-full text-[14px] py-1.5 px-6 text-[#6e6e6e] rounded-md border border-[#f0f1f5] focus:border-orange transition duration-300 focus:outline-none focus:ring-0  shadow-none rounded-md bg-white dark:text-gray-300 dark:bg-[#20304c]">
                            {data.name}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center  grid grid-cols-3">
                        <span className="col-span-1 dark:text-gray-100 text-[14px] text-gray-700">
                          Email
                        </span>
                        <div className="col-span-2">
                          <span className="block  w-full text-[14px] py-1.5 px-6 text-[#6e6e6e] rounded-md border border-[#f0f1f5] focus:border-orange transition duration-300 focus:outline-none focus:ring-0  shadow-none rounded-md bg-white dark:text-gray-300 dark:bg-[#20304c]">
                            {data.email}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center  grid grid-cols-3">
                        <span className="col-span-1 dark:text-gray-100 text-[14px] text-gray-700">
                          Gender
                        </span>
                        <div className="col-span-2">
                          <span className="block  w-full text-[14px] py-1.5 px-6 text-[#6e6e6e] rounded-md border border-[#f0f1f5] focus:border-orange transition duration-300 focus:outline-none focus:ring-0  shadow-none rounded-md bg-white dark:text-gray-300 dark:bg-[#20304c]">
                            {data.gender}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center  grid grid-cols-3">
                        <span className="col-span-1 dark:text-gray-100 text-[14px] text-gray-700">
                          Phone Number
                        </span>
                        <div className="col-span-2">
                          <span className="block  w-full text-[14px] py-1.5 px-6 text-[#6e6e6e] rounded-md border border-[#f0f1f5] focus:border-orange transition duration-300 focus:outline-none focus:ring-0  shadow-none rounded-md bg-white dark:text-gray-300 dark:bg-[#20304c]">
                            {data.phone}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center  grid grid-cols-3">
                        <span className="col-span-1 dark:text-gray-100 text-[14px] text-gray-700">
                          DOB
                        </span>
                        <div className="col-span-2">
                          <span className="block  w-full text-[14px] py-1.5 px-6 text-[#6e6e6e] rounded-md border border-[#f0f1f5] focus:border-orange transition duration-300 focus:outline-none focus:ring-0  shadow-none rounded-md bg-white dark:text-gray-300 dark:bg-[#20304c]">
                            {data.dob}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center  grid grid-cols-3">
                        <span className="col-span-1 dark:text-gray-100 text-[14px] text-gray-700">
                          Joining Date
                        </span>
                        <div className="col-span-2">
                          <span className="block  w-full text-[14px] py-1.5 px-6 text-[#6e6e6e] rounded-md border border-[#f0f1f5] focus:border-orange transition duration-300 focus:outline-none focus:ring-0  shadow-none rounded-md bg-white dark:text-gray-300 dark:bg-[#20304c]">
                            {data.joining}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center  grid grid-cols-3">
                        <span className="col-span-1 dark:text-gray-100 text-[14px] text-gray-700">
                          Address
                        </span>
                        <div className="col-span-2">
                          <span className="block  w-full text-[14px] py-1.5 px-6 text-[#6e6e6e] rounded-md border border-[#f0f1f5] focus:border-orange transition duration-300 focus:outline-none focus:ring-0  shadow-none rounded-md bg-white dark:text-gray-300 dark:bg-[#20304c]">
                            {data.address}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center  grid grid-cols-3">
                        <span className="col-span-1 dark:text-gray-100 text-[14px] text-gray-700">
                          Document Type
                        </span>
                        <div className="col-span-2">
                          <span className="block  w-full text-[14px] py-1.5 px-6 text-[#6e6e6e] rounded-md border border-[#f0f1f5] focus:border-orange transition duration-300 focus:outline-none focus:ring-0  shadow-none rounded-md bg-white dark:text-gray-300 dark:bg-[#20304c]">
                            {data.doc_type}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center  grid grid-cols-2 gap-3 p-4">
                      <label
                        for="dropzone-file"
                        className="flex flex-col items-center justify-center w-full h-30 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                      >
                        <img src={`${URL}/image/${data.image.front}`} />
                      </label>
                      <label
                        for="dropzone-file"
                        className="flex flex-col items-center justify-center w-full h-30 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                      >
                        <img src={`${URL}/image/${data.image.back}`} />
                      </label>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      )}
    </div>
  );
};

export default EmployeeView;
