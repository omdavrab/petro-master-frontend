import React from "react";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { MdClose } from "react-icons/md";
import URL from "@/URL";
const customizationList = [
  {
    name: "Chicken",
  },
  {
    name: "Ham",
  },
  {
    name: "Roast",
  },
  {
    name: "Tuna",
  },
  {
    name: "Turkey",
  },
  {
    name: "Lobster",
  },
  {
    name: "Tomatoes",
  },
  {
    name: "Potatoes",
  },
  {
    name: "Lettuce",
  },
];
const ItemsDetails = ({ cancelButtonRef, setOpen, open, menuData }) => {
  return (
    <div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-[99]"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/[60%] bg-opacity-75 transition-opacity" />
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
                <Dialog.Panel className="relative transform  rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
                  <button
                    onClick={() => setOpen(false)}
                    className="absolute outline-none -top-[14px] bg-white hover:bg-red-400 hover:text-white transition duration-300 rounded-full shadow-sm p-2 -right-[14px]"
                  >
                    <MdClose />
                  </button>
                  <div className="flex gap-6">
                    <div className=" text-center flex-none float-left">
                      <img
                        width={150}
                        height={150}
                        className="w-[150px] h-[150px]"
                        src={`${URL}/image/${menuData?.image}`}
                      />
                    </div>
                    <div className="w-full">
                      <div className="flex items-center justify-between">
                        <h3 className="text-[16px] font-semibold text-gray-700">
                          {menuData.name}
                        </h3>
                        <span className="font-bold text-[16px] text-gray-800">
                          ${menuData.price}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[13px] block mb-2 text-gray-700">
                          {menuData?.category}
                        </span>
                        <div>
                          {menuData.vegetarian === true ? (
                            <Image
                              width={15}
                              height={15}
                              className="w-[15px] h-[15px]"
                              src="/assets/images/clipart2998556.png"
                              alt="clipart2998556"
                            />
                          ) : (
                            <Image
                              width={15}
                              height={15}
                              className="w-[15px] h-[15px]"
                              alt="pngkit_veg-png_2579552"
                              src="/assets/images/pngkit_veg-png_2579552.png"
                            />
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 text-justify">
                        {menuData.description}
                      </p>
                    </div>
                  </div>
                  {menuData.customizeable && (
                    <div className="mt-5">
                      <h2 className="text-[16px] ">Customization List</h2>
                      <ul className="grid grid-cols-3 gap-1 mt-2 list-disc px-4">
                        {menuData.customizeItem &&
                          menuData.customizeItem.map((item, index) => {
                            return (
                              <li key={index} className="text-xs text-gray-600">
                                {item.customizeItem} ${item.customizeItemPrice}
                              </li>
                            );
                          })}
                      </ul>
                    </div>
                  )}
                  {/* <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                                        <button
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                                            onClick={() => setOpen(false)}
                                        >
                                            Deactivate
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                                            onClick={() => setOpen(false)}
                                            ref={cancelButtonRef}
                                        >
                                            Cancel
                                        </button>
                                    </div> */}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default ItemsDetails;
