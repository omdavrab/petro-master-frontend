import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBowlFood,
  faChartColumn,
  faClipboard,
  faDesktop,
  faGear,
  faHouse,
  faPercent,
  faQrcode,
  faPercentage,
  faUserGroup,
  faXmark,
  faGears,
  faBank,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { AiOutlineArrowRight } from "react-icons/ai";
import Link from "next/link";
import { useRouter } from "next/router";
import { RxDotFilled } from "react-icons/rx";
import useMediaQuery from "@/hooks/useMedaQuery";
import { useDispatch, useSelector } from "react-redux";
import { HandleSideBar } from "@/redux/action/sidebar";
const navigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: faHouse },
  { name: "Collection", href: "/admin/collection", icon: faHouse },
  {
    name: "Bank/UPI",
    href: "#",
    href2: "/admin/bank",
    href3: "/admin/upi",
    href4: "/admin/addcategories",
    href5: "/admin/categorieslist",
    icon: faBank,
    submenu: [
      {
        name: "Bank",
        href: "/admin/bank",
        icon: faClipboard,
      },
      {
        name: "UPI",
        href: "/admin/upi",
        icon: faClipboard,
      },
    ],
  },
  {
    name: "Employee",
    href: "/admin/employee",
    icon: faUserGroup,
    current: false,
  },
  { name: "Tank", href: "/admin/tank", icon: faBowlFood, current: false },
  {
    name: "Machine",
    href: "/admin/machine",
    icon: faClipboard,
    current: false,
  },
  {
    name: "Rate",
    href: "/admin/rate",
    icon: faPercentage,
    current: false,
  },
  {
    name: "Shift",
    href: "/admin/shift",
    icon: faChartColumn,
    current: false,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const Sidebar = ({ openSidebar, setOpenSidebar }) => {
  const dispatch = useDispatch();
  const Restaurant = useSelector((state) => state.Restaurant?.restaurantData);
  const SideBar = useSelector((state) => state.StoraSideBarData.list);

  const router = useRouter();
  const [openSubMenu, setOpenSubMenu] = useState("");
  const isDesktop = useMediaQuery("(min-width: 1023px)");

  useEffect(() => {
    setOpenSubMenu(SideBar);
  }, [SideBar]);
  return (
    <div>
      <div
        className={`${
          !isDesktop && !openSidebar ? "block opacity-100" : "hidden opacity-0"
        }  fixed w-full inset-0 bg-black/[40%] z-[49]`}
      >
        {" "}
      </div>
      <div
        className={`${
          openSidebar ? "w-0 lg:w-20" : "w-72"
        } transition ease-in duration-300  fixed shadow-md inset-y-0 z-50 flex flex-col`}
      >
        <button
          onClick={() => setOpenSidebar(!openSidebar)}
          className={`${
            !isDesktop && !openSidebar ? "block" : "hidden"
          } absolute right-[-30px] sm:right-[-40px] w-[30px] h-[30px] flex items-center justify-center rounded bg-[#fff] top-[15px]`}
        >
          {" "}
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <div
          className={`${openSidebar ? "px-0 lg:px-3" : "px-6"} ${
            !isDesktop ? "overflow-y-auto" : ""
          } flex grow flex-col gap-y-5 dark:bg-[#0c1a32] bg-white   pb-4`}
        >
          <div className="flex h-16 shrink-0 items-center">
            <div className="flex gap-1 items-end">
              <Image
                alt="logo"
                src="/assets/icons/logo1.png"
                width={35}
                height={30}
              />
              <h1
                className={`${
                  openSidebar ? "hidden" : "block"
                } transition ease-in duration-300 text-xl md:text-2xl font-semibold text-darkolivegreen `}
              >
                Petro Master
              </h1>
            </div>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name} className="relative group">
                      <Link
                        onClick={() => {
                          setOpenSubMenu(item.name);
                          dispatch(HandleSideBar(item.name));
                        }}
                        href={item.href || "#"}
                        className={classNames(
                          router.pathname === item.href ||
                            router.pathname === item.href2 ||
                            router.pathname === item.href3 ||
                            router.pathname === item.href4 ||
                            router.pathname === item.href5
                            ? "bg-orange text-white"
                            : "text-gray-500 dark:text-gray-400 dark:hover:text-white group-hover:text-white  group-hover:bg-orange",
                          "group items-center transition ease-in duration-150 flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                        )}
                      >
                        <FontAwesomeIcon
                          className={classNames(
                            router.pathname === item.href ||
                              router.pathname === item.href2 ||
                              router.pathname === item.href3 ||
                              router.pathname === item.href4 ||
                              router.pathname === item.href5
                              ? "text-white"
                              : "text-gray-500 dark:text-gray-400  group-hover:text-white",
                            openSidebar
                              ? "text-[18px] py-1.5 h-10 w-10 "
                              : "h-6 w-6",
                            " shrink-0 "
                          )}
                          icon={item.icon}
                        />
                        {openSidebar ? " " : item.name}
                      </Link>

                      {openSubMenu === item.name ? (
                        <>
                          <ul className={`${openSidebar ? "hidden" : "block"}`}>
                            {item.submenu?.map((item, index) => {
                              return (
                                <li key={index}>
                                  <Link
                                    href={item.href}
                                    className={classNames(
                                      router.pathname === item.href
                                        ? " text-orange"
                                        : "text-gray-500 hover:text-white hover:bg-orange",
                                      "group items-center transition ease-in duration-150 flex gap-x-3 rounded-md py-2 px-5 text-sm leading-6 font-semibold"
                                    )}
                                  >
                                    <RxDotFilled /> {item.name}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </>
                      ) : (
                        <></>
                      )}
                      <ul
                        className={`${
                          openSidebar && item.submenu
                            ? "hidden group-hover:block transition duration-200 absolute w-[200px] rounded-md p-3 bg-white z-[10] shadow-box left-[60px]  -top-[10px]"
                            : " hidden"
                        }`}
                      >
                        <div className="relative ">
                          <span className="absolute top-[12-px] z-[1] -left-[20px] rotate-45 w-5 h-5 rounded-[2px] bg-white">
                            {" "}
                          </span>
                          {item.submenu?.map((item, index) => {
                            return (
                              <li key={index} className="relative z-[2]">
                                <Link
                                  href={item.href}
                                  className={classNames(
                                    router.pathname === item.href
                                      ? " text-orange"
                                      : "text-gray-500 hover:text-white hover:bg-orange",
                                    "group items-center transition ease-in duration-150 flex gap-x-2 rounded-md py-2 px-2 text-sm leading-6 font-semibold"
                                  )}
                                >
                                  <RxDotFilled /> {item.name}
                                </Link>
                              </li>
                            );
                          })}
                        </div>
                      </ul>
                      <></>
                    </li>
                  ))}
                </ul>
              </li>

              {/* <div className={`${openSidebar ? "hidden" : "block"} bg-main transition ease-in duration-300 flex-1 flex items-center`}>
                <div className='bg-svg bg-orange rounded-lg flex-col flex items-center mt-[66px]'>
                  <Image alt='res-menu' src="/assets/icons/res-menu.png" width={150} height={150} className="relative top-[-80px]" />
                  <h3 className='text-white text-[24px] mt-[-73px] '>Add Menu</h3>
                  <span className='text-white text-center text-md py-2.5'>Manage Your food and beverages menu  <AiOutlineArrowRight className='inline-block' /></span>
                </div>
              </div> */}
              <li className="mt-auto">
                <Link
                  href="/admin/setting"
                  className={classNames(
                    router.pathname === "/admin/setting"
                      ? "bg-orange text-white"
                      : "text-gray-500 hover:text-white dark:text-gray-400 dark:hover:text-white hover:bg-orange",
                    "group items-center transition ease-in duration-150 flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                  )}
                >
                  <FontAwesomeIcon
                    icon={faGear}
                    className={`${
                      openSidebar ? "text-[18px] py-1.5 h-10 w-10 " : "h-6 w-6"
                    } `}
                  />
                  {openSidebar ? " " : "Settings"}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
