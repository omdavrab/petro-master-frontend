import React, { Fragment, useEffect, useState } from "react";
import { TbUserCircle } from "react-icons/tb";
import { IoArrowBack, IoCartOutline } from "react-icons/io5";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { Menu, Transition } from "@headlessui/react";
import { logout } from "@/redux/action/logout";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const Header = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { table_id, restaurant_id } = router.query;
  const [open, setOpen] = useState(false);
  const [countOrder, setCountOrder] = useState();
  const cartData = useSelector((state) => state.CartStoreData.cartData);
  const FoodCategory = useSelector(
    (state) =>
      state.GetFoodCategoryByRestaurant?.categoryByRestaurant[0]?.restaurantId
  );
  const [restaurantDetails, setRestaurantDetails] = useState();
  const HandleLogIn = () => {
    setOpen(true);
  };
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let token;
  if (typeof window !== "undefined") {
    token = window.localStorage.getItem("authorization");
  }
  const handleSignOut = () => {
    localStorage.clear();
    dispatch(logout());
    // router.push(`/${table_id}/${restaurant_id}`);
    setIsLoggedIn(false);
  };

  useEffect(() => {
    setRestaurantDetails(FoodCategory);
    setCountOrder(cartData);
    setIsLoggedIn(!!token);
  }, [FoodCategory, cartData]);

  return (
    <>
      <div className="bg-white h-[56px] z-[9999] w-full flex items-center justify-between px-4 py-3 shadow-header">
        <div className=" w-full flex items-center md:gap-0 gap-3 justify-between mx-auto">
          <div className="items-center gap-3 flex">
            <button
              onClick={() => router.back()}
              className={`${
                router.pathname === "/[table_id]/[restaurant_id]/menu"
                  ? "hidden"
                  : "block"
              } outline-none focus:outline-none`}
            >
              <IoArrowBack className="w-5 h-5 text-gray-800" />
            </button>
            <div className="flex items-end gap-2">
              <Image
                alt="logo"
                width={40}
                height={40}
                src="/assets/icons/logo.png"
              />
              <h3 className="text-[20px] text-darkolivegreen font-bold sm:text-left leading-[20px] text-center ">
                {restaurantDetails?.name}
              </h3>
            </div>
          </div>
          <div className="flex items-center gap-4 sm:justify-start justify-center">
            <Link
              href={`/${table_id}/${restaurant_id}/cart`}
              className="flex items-center"
            >
              <button className="relative">
                <IoCartOutline className="w-6 h-6" />
                <span className="w-4 top-[-4px] right-[-4px] h-4 absolute rounded-full bg-orange text-[12px] w- text-white">
                  {countOrder && countOrder?.length}
                </span>
              </button>
            </Link>
            {isLoggedIn ? (
              <div>
                <Menu as="div" className="relative">
                  <Menu.Button className="-m-1.5 flex items-center p-1.5 text-gray-700">
                    <TbUserCircle className="w-6 h-6" />
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href={`/${table_id}/${restaurant_id}/profile`}
                            className={classNames(
                              active ? "bg-gray-50" : "",
                              "block px-3 py-1 text-sm leading-6 text-gray-900"
                            )}
                          >
                            Your profile
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => handleSignOut()}
                            className={classNames(
                              active ? "bg-gray-50" : "",
                              "block px-3 py-1 text-sm leading-6 text-gray-900"
                            )}
                          >
                            Sign out
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            ) : (
              <Link href={`/${table_id}/${restaurant_id}/login`} >
              <button
                className="flex items-center gap-1.5 text-gray-700"
              >
                <TbUserCircle className="w-6 h-6" /> Login
              </button>
              </Link>
            )}
          </div>
        </div>
      </div>

    </>
  );
};

export default Header;
