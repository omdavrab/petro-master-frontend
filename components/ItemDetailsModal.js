import URL from "@/URL";
import React from "react";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { GrFormClose } from "react-icons/gr";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { HandleCartStoreData } from "@/redux/action/cart";
import { toast } from "react-toastify";
import { IoClose } from "react-icons/io5";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
const ItemDetailsModal = ({
  openDetail,
  setOpenDetail,
  categoryData,
  handleIncrement,
  handleDecrement,
  cartData,
}) => {
  const dispatch = useDispatch();

  const HandleCart = async () => {
    cartData?.filter((item) => item._id === categoryData._id);
    if (categoryData?.length) {
      toast("This Product is already added", {
        hideProgressBar: true,
        autoClose: 3000,
        type: "success",
      });
    } else {
      categoryData.Instructions = {};
      categoryData.AddCart = true;
      dispatch(HandleCartStoreData([...cartData, categoryData]));
    }
    setOpenDetail(false);
  };
  return (
    <Transition.Root show={openDetail} as={Fragment}>
      <Dialog as="div" className="relative z-[9999]" onClose={setOpenDetail}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 z-10 overflow-hidden">
          <div className="flex min-h-full justify-center  text-center items-end p-0">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-y-full"
              enterTo="translate-y-0"
              leave="transition ease-in-out duration-200 transform"
              leaveFrom="translate-y-0"
              leaveTo="translate-y-full"
            >
              <Dialog.Panel className="relative bg-gray-100 rounded-t-[22px] flex flex-col transform overflow-hidden md:rounded-lg bg-white text-left shadow-xl transition-all w-full sm:max-w-lg">
                <div className="bg-gray-100 w-full">
                  <div className="relative border-b flex-0 ">
                    <div className="flex h-[200px]">
                      <img
                        src={`${URL}/image/${categoryData?.image}`}
                        className="w-full object-cover"
                        width={700}
                        height={300}
                      />
                    </div>
                    <div className="absolute right-0 top-0 pr-4 pt-4 block">
                      <button
                        type="button"
                        className="rounded-full h-6 w-6 flex justify-center items-center border border-gray-100 shadow-lg bg-white text-gray-400 hover:text-gray-500 focus:outline-none "
                        onClick={() => setOpenDetail(false)}
                      >
                        <IoClose
                          className=" text-gray-400"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </div>
                </div>
                <div className=" bg-gray-100  flex-1 p-4  overflow-auto">
                  <Image
                    src={`${
                      categoryData?.vegetarian
                        ? "/assets/icons/veg.svg"
                        : "/assets/icons/none-veg.svg"
                    }`}
                    className=" "
                    width={14}
                    height={14}
                    alt="veg"
                  />
                  <div className="flex items-center">
                    <Dialog.Title
                      as="h4"
                      className="flex-1 mb-1.5 mt-1 font-semibold text-[15px] text-gray-900"
                    >
                      {categoryData?.name}
                    </Dialog.Title>
                    <div className="">
                      {categoryData?.AddCart ? (
                        <div className="font-bold text-green-600 text-center flex justify-evenly shadow-box py-0.5 rounded-md w-[80px]  bg-white border">
                          <button
                            className="text-xs"
                            onClick={() => handleDecrement(categoryData)}
                          >
                            <FontAwesomeIcon icon={faMinus} />
                          </button>
                          <span>{categoryData?.QTY}</span>
                          <button
                            className="text-xs"
                            onClick={() => handleIncrement(categoryData)}
                          >
                            <FontAwesomeIcon icon={faPlus} />
                          </button>
                        </div>
                      ) : (
                        <div className="font-bold  text-green-600 text-center flex justify-evenly shadow-box py-0.5 rounded w-[80px]  bg-white border ">
                          <button onClick={HandleCart}>ADD</button>
                        </div>
                      )}
                    </div>
                  </div>
                  <span className="text-gray-700 text-[15px]">
                    ${categoryData?.price}
                  </span>
                  <p className="block text-gray-600 font-medium text-[13px]">
                    {categoryData?.description}
                  </p>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ItemDetailsModal;
