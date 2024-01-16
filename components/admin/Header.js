import React, { useEffect } from "react";
import { Fragment, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { GrTextAlignLeft } from "react-icons/gr";
import {
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import Cookies from "js-cookie";

import Link from "next/link";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Header = ({ openSidebar, setOpenSidebar, handle }) => {
  const router = useRouter();
  const userData = useSelector((state) => state.LogIn?.user?.user);
  const [UserData, serUserData] = useState({});
  useEffect(() => {
    serUserData(userData);
  }, [userData]);

  const handleSignOut = () => {
    localStorage.clear();
    Cookies.remove("authorization");
    router.push("/admin/login");
  };

  return (
    <>
      <Tooltip id="my-tooltip" style={{ zIndex: "1111" }} />
      <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b dark:border-gray-500 border-gray-200 dark:bg-[#0c1a32]  bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
        <button
          type="button"
          className="-m-2.5 p-2.5 dark:text-gray-400 text-gray-700 "
          onClick={() => setOpenSidebar(!openSidebar)}
        >
          <GrTextAlignLeft className="text-[20px]" />
        </button>
        {/* Separator */}
        <div
          className="h-6 w-px  dark:text-gray-400 bg-gray-900/10 lg:hidden"
          aria-hidden="true"
        />

        <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
          <form className="relative flex flex-1" action="#" method="GET">
            <label htmlFor="search-field" className="sr-only">
              Search
            </label>
            <div className="max-w-md w-full my-3 rounded-[8px] py-3 bg-gray-100 dark:bg-[#20304c] px-2.5">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="pointer-events-none top-[50%] -translate-y-[50%] absolute left-[10px] h-full w-5 text-gray-400"
              />
              <input
                id="search-field"
                className="block h-full w-full dark:bg-[#20304c] bg-gray-100 border-0 py-0 pl-8 pr-0 dark:text-gray-200 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                placeholder="Search..."
                type="search"
                name="search"
              />
            </div>
          </form>
          <div className="flex items-center gap-x-4 lg:gap-x-6">
            {/* Profile dropdown */}
            <Menu as="div" className="relative">
              <Menu.Button className="-m-1.5 flex items-center p-1.5">
                <span className="sr-only">Open user menu</span>
                <img
                  className="h-8 w-8 rounded-full bg-gray-50"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
                <span className="hidden lg:flex lg:items-center">
                  <span
                    className="ml-4 text-sm font-semibold leading-6 text-gray-900"
                    aria-hidden="true"
                  >
                    {UserData?.name}
                  </span>
                </span>
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
                  {/* {userNavigation.map((item) => ( */}
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href={"/admin/setting"}
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
                        className={classNames(
                          active ? "bg-gray-50" : "",
                          "block px-3 py-1 text-sm leading-6 text-gray-900"
                        )}
                        onClick={handleSignOut}
                      >
                        Sign out
                      </button>
                    )}
                  </Menu.Item>
                  {/* ))} */}
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
