import React, { useEffect } from "react";
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
import { HandleGetMenuByCategoryStore } from "@/redux/action/foodCategory";

const AddToCartModal = ({ open, setOpen, categoryData }) => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.CartStoreData.cartData);
  const [instructions, setInstructions] = useState({
    Instructions: "",
    customizeItem: [], // Initialize as an empty array
  });
  console.log(
    "🚀 ~ file: AddToCartModal.js:24 ~ AddToCartModal ~ instructions:",
    instructions
  );
  const menuDatas = useSelector(
    (state) => state.MenuFoodCategory.menuDataByCategory
  );

  const HandleCart = async () => {
    cartData?.filter((item) => item._id === categoryData._id);
    if (categoryData?.length) {
      toast("This Product is already added", {
        hideProgressBar: true,
        autoClose: 3000,
        type: "success",
      });
    } else {
      categoryData.Instructions = instructions;
      categoryData.AddCart = true;
      // data.QTY = 1;
      dispatch(HandleCartStoreData([...cartData, categoryData]));
    }
    setOpen(false);
  };

  const handleSpecialData = (event) => {
    const { name, value } = event.target;
    setInstructions((prevInstructions) => ({
      ...prevInstructions,
      Instructions: event.target.value,
    }));
  };

  const handleData = async (event) => {
    const { name, value, checked } = event.target;
    if (checked) {
      setInstructions((prevInstructions) => ({
        ...prevInstructions,
        [name]: [...prevInstructions[name], value], // Add the selected value to the array
      }));
      const [names, price] = event.target.value.split(",");
      const newDatas = menuDatas?.filter((item) => {
        if (item._id === categoryData._id) {
          item.Instructions = instructions;
          // item.customizeableItemPrice = item.customizeableItemPrice
          //   ? parseInt(price) * item.QTY + item.customizeableItemPrice
          //   : parseInt(price) * item.QTY;
          item.customizeableItemPrice = parseInt(price);
          return item;
        }
        return menuDatas;
      });
      await dispatch(HandleGetMenuByCategoryStore(newDatas));
    } else {
      setInstructions((prevInstructions) => ({
        ...prevInstructions,
        [name]: prevInstructions[name].filter((item) => item !== value), // Remove the deselected value from the array
      }));
      const [names, price] = event.target.value.split(",");
      const newDatas = menuDatas?.filter((item) => {
        if (item._id === categoryData._id) {
          // item.customizeableItemPrice =
          //   item.customizeableItemPrice - parseInt(price) * item.QTY;
          // item.newPrice -= parseInt(price);
          item.customizeableItemPrice = parseInt(price);
          return item;
        }
        return menuDatas;
      });
      await dispatch(HandleGetMenuByCategoryStore(newDatas));
    }

    return;
  };

  const handleIncrement = async (data) => {
    const newDatas = menuDatas?.filter((item) => {
      if (item._id === data._id && item.QTY < 5) {
        item.QTY += 1;
        item.newPrice = item.price * item.QTY;
        return item;
      }
      return menuDatas;
    });
    await dispatch(HandleGetMenuByCategoryStore(newDatas));
  };

  const handleDecrement = async (data) => {
    const newDatas = menuDatas.filter((item) => {
      if (item._id === data._id && item.QTY > 1) {
        item.QTY -= 1;
        item.newPrice = item.price * item.QTY;
        return item;
      }
      return menuDatas;
    });
    await dispatch(HandleGetMenuByCategoryStore(newDatas));
  };

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-[9999]" onClose={setOpen}>
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
            <div className="flex min-h-full justify-center text-center items-end p-0">
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
                    <div className="relative border-b flex-0 p-4">
                      <Dialog.Title
                        as="h4"
                        className=" font-normal leading-6 text-gray-600"
                      >
                        {categoryData?.name}
                      </Dialog.Title>
                      <span className="text-gray-900 font-semibold">
                        Customise as per your taste
                      </span>
                      <div className="absolute right-0 top-0 pr-4 pt-4 block">
                        <button
                          type="button"
                          className="rounded-full h-6 w-6 flex justify-center items-center border border-gray-100 shadow-lg bg-white text-gray-400 hover:text-gray-500 focus:outline-none "
                          onClick={() => setOpen(false)}
                        >
                          <IoClose
                            className=" text-gray-400"
                            aria-hidden="true"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className=" bg-gray-100 flex-1 px-4 max-h-[380px] pb-4 sm:max-h-[calc(100vh_-_158px)] min-h-[300px] overflow-auto">
                    <div className="w-full ">
                      <div className="mt-4">
                        <label className="block font-medium mb-1 text-[16px]">
                          Special Instructions
                        </label>
                        <textarea
                          className="resize-none rounded border outline-none focus:ring-0 focus:border-orange border-gray-200 w-full"
                          name="Instructions"
                          onChange={(e) => handleSpecialData(e)}
                        />
                      </div>
                      {categoryData?.customizeable &&
                        categoryData?.customizeItem && (
                          <div className="">
                            <h3 className="py-2 border-t mt-3 font-medium">
                              Options
                            </h3>
                            <div className="bg-white rounded-md border border-gray-200 py-2 px-3 shadow-sm">
                              {categoryData?.customizeItem &&
                                categoryData?.customizeItem?.map(
                                  (item, index) => {
                                    const value = `${item.customizeItem},${item.customizeItemPrice}`;
                                    return (
                                      <div
                                        key={index}
                                        className="flex justify-between items-center gap-4 h-[30px]"
                                      >
                                        <span className="text-[16px]">
                                          {item.customizeItem}
                                        </span>
                                        <div className="flex items-center gap-2">
                                          <span className="text-[16px] text-gray-600">
                                            ${item.customizeItemPrice}
                                          </span>
                                          <input
                                            aria-label="Meat"
                                            type="checkbox"
                                            data-role="none"
                                            name="customizeItem"
                                            onChange={(e) => handleData(e)}
                                            value={value}
                                            className="checked:bg-orange checked:active:bg-orange checked:focus:bg-orange border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-orange"
                                          />
                                        </div>
                                      </div>
                                    );
                                  }
                                )}
                            </div>
                          </div>
                        )}
                    </div>
                  </div>
                  <div className="w-full flex gap-4 px-4 py-4">
                    <div className="">
                      <div className="font-bold text-green-600 text-center flex justify-evenly shadow-box py-0.5 rounded-md w-[80px]  bg-white border">
                        <>
                          <button className="text-xs">
                            <FontAwesomeIcon
                              icon={faMinus}
                              onClick={() => handleDecrement(categoryData)}
                            />
                          </button>
                          <span>{categoryData?.QTY}</span>
                          <button
                            className="text-xs"
                            onClick={() => handleIncrement(categoryData)}
                          >
                            <FontAwesomeIcon icon={faPlus} />
                          </button>
                        </>
                      </div>
                    </div>
                    <button
                      className="bg-green-600 flex-1 rounded-md text-white px-3 text-[16px] font-medium"
                      onClick={HandleCart}
                    >
                      Add Item | $
                      {categoryData?.newPrice
                        ? categoryData?.newPrice
                        : categoryData?.price}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default AddToCartModal;
