import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBowlFood, faChartColumn, faClipboard, faDesktop, faGear, faHouse, faPercent, faQrcode, faPercentage, faUserGroup, faXmark, faGears } from "@fortawesome/free-solid-svg-icons";
import Image from 'next/image';
import { AiOutlineArrowRight } from 'react-icons/ai';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { RxDotFilled } from "react-icons/rx";
import useMediaQuery from '@/hooks/useMedaQuery';
import { useDispatch, useSelector } from "react-redux";
import { HandleSideBar } from "@/redux/action/sidebar";
const navigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: faHouse },
  {
    name: "Order",
    href: "/admin/order",
    href2: "/admin/order/orderdetail",
    icon: faClipboard,
  },
  {
    name: "Menu",
    href: "#",
    href2: "/admin/addnewmenu",
    href3: "/admin/menulist",
    href4: "/admin/addcategories",
    href5: "/admin/categorieslist",

    icon: faBowlFood,
    submenu: [
      {
        name: "Add New Menu",
        href: "/admin/addnewmenu",
        icon: faClipboard,
      },
      {
        name: "Menu List",
        href: "/admin/menulist",
        icon: faClipboard,
      },
      {
        name: "Add Categories",
        href: "/admin/addcategories",
        icon: faClipboard,
      },
      {
        name: "Categories List",
        href: "/admin/categorieslist",
        icon: faClipboard,
      },

    ],
  },
  { name: "Qr Code", href: "/admin/manage_qrcode", icon: faQrcode, current: false },
  { name: "User", href: "/admin/customers", icon: faUserGroup, current: false },
  {
    name: "Coupon Code",
    href: "/admin/coupon",
    icon: faPercentage,
    current: false,
  },
  {
    name: "Analysis",
    href: "/admin/analysis",
    icon: faChartColumn ,
    current: false,
  },
  {
    name: "Setup & Configurations",
    // href2: "/admin/languages",
    href3: "/admin/currency",
    href4: "/admin/tax",
    href5: "/admin/activation",
    href6: "/admin/social-login",
    icon: faGears ,
    current: false,
    submenu: [
      // {
      //   name: "Languages",
      //   href: "/admin/edit/homepage",
      //   icon: faClipboard,
      // },
      {
        name: "Currency",
        href: "/admin/currency",
        icon: faClipboard,
      },
      {
        name: "TAX",
        href: "/admin/tax",
        icon: faClipboard,
      },
      {
        name: "Social media Logins",
        href: "/admin/social-login" ,
        icon: faClipboard,
      },
    ],
  },
  {
    name: "Website Setup",
    href: "#",
    href2: "/admin/edit/homepage",
    href3: "/admin/menulist",
    href4: "/admin/addcategories",
    href5: "/admin/categorieslist",
    icon: faDesktop,
    submenu: [
      {
        name: "Home Page Settings",
        href: "/admin/edit/homepage",
        icon: faClipboard,
      },
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const Sidebar = ({ openSidebar, setOpenSidebar }) => {
  const dispatch = useDispatch()
  const Restaurant = useSelector((state) => state.Restaurant?.restaurantData);
  const SideBar = useSelector((state) => state.StoraSideBarData.list)

  const router = useRouter();
  const [openSubMenu, setOpenSubMenu] = useState("");
  const isDesktop = useMediaQuery('(min-width: 1023px)');

  useEffect(() => {
    setOpenSubMenu(SideBar)
  }, [SideBar])
  return (
    <div>
      <div className={`${!isDesktop && !openSidebar ? "block opacity-100" : 'hidden opacity-0'}  fixed w-full inset-0 bg-black/[40%] z-[49]`}> </div>
      <div className={`${openSidebar ? "w-0 lg:w-20" : "w-72"} transition ease-in duration-300  fixed shadow-md inset-y-0 z-50 flex flex-col`}>
        <button onClick={() => setOpenSidebar(!openSidebar)} className={`${!isDesktop && !openSidebar ? "block" : "hidden"} absolute right-[-30px] sm:right-[-40px] w-[30px] h-[30px] flex items-center justify-center rounded bg-[#fff] top-[15px]`}> <FontAwesomeIcon icon={faXmark} /></button>
        <div className={`${openSidebar ? "px-0 lg:px-3" : "px-6"} ${!isDesktop ? "overflow-y-auto" : ""} flex grow flex-col gap-y-5 dark:bg-[#0c1a32] bg-white   pb-4`}>
          <div className="flex h-16 shrink-0 items-center">
            <div className='flex gap-1 items-end'>
              <Image alt='logo' src="/assets/icons/logo.png" width={50} height={50} />
              <h1 className={`${openSidebar ? "hidden" : "block"} transition ease-in duration-300 text-xl md:text-2xl font-semibold text-darkolivegreen `}>Restaurant</h1>
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
                          dispatch(HandleSideBar(item.name))
                        }}
                        href={item.href || "#"}
                        className={classNames(
                          router.pathname === item.href ||
                            router.pathname === item.href2 ||
                            router.pathname === item.href3 ||
                            router.pathname === item.href4 ||
                            router.pathname === item.href5
                            ? 'bg-orange text-white'
                            : 'text-gray-500 dark:text-gray-400 dark:hover:text-white group-hover:text-white  group-hover:bg-orange',
                          'group items-center transition ease-in duration-150 flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                        )}
                      >
                        <FontAwesomeIcon className={classNames(
                          router.pathname === item.href ||
                            router.pathname === item.href2 ||
                            router.pathname === item.href3 ||
                            router.pathname === item.href4 ||
                            router.pathname === item.href5
                            ? 'text-white' : 'text-gray-500 dark:text-gray-400  group-hover:text-white',
                          openSidebar ? 'text-[18px] py-1.5 h-10 w-10 ' : 'h-6 w-6',
                          ' shrink-0 ')} icon={item.icon} />
                        {
                          openSidebar ? " " :
                            item.name
                        }
                      </Link>
                  
                      {openSubMenu === item.name
                        ? <>
                          <ul className={`${openSidebar ? "hidden" : "block"}`}>
                            {item.submenu?.map((item, index) => {
                              return (
                                <li key={index}>
                                  <Link href={item.href} className={classNames(
                                    router.pathname === item.href
                                      ? ' text-orange'
                                      : 'text-gray-500 hover:text-white hover:bg-orange',
                                    'group items-center transition ease-in duration-150 flex gap-x-3 rounded-md py-2 px-5 text-sm leading-6 font-semibold'
                                  )}>
                                    <RxDotFilled /> {item.name}
                                  </Link>
                                </li>
                              )
                            })}
                          </ul>
                        </>
                        :
                        <>
                        </>
                      }
                      <ul className={`${openSidebar && item.submenu ? "hidden group-hover:block transition duration-200 absolute w-[200px] rounded-md p-3 bg-white z-[10] shadow-box left-[60px]  -top-[10px]" : " hidden"}`}>
                        <div className="relative ">
                          <span className="absolute top-[12-px] z-[1] -left-[20px] rotate-45 w-5 h-5 rounded-[2px] bg-white"> </span>
                          {item.submenu?.map((item, index) => {
                            return (
                              <li key={index} className="relative z-[2]">
                                <Link href={item.href} className={classNames(
                                  router.pathname === item.href
                                    ? ' text-orange'
                                    : 'text-gray-500 hover:text-white hover:bg-orange',
                                  'group items-center transition ease-in duration-150 flex gap-x-2 rounded-md py-2 px-2 text-sm leading-6 font-semibold'
                                )}>
                                  <RxDotFilled /> {item.name}
                                </Link>
                              </li>

                            )
                          })}
                        </div>
                      </ul>
                      <>
                      </>
                    </li>
                  ))}
                </ul>
              </li>

              <div className={`${openSidebar ? "hidden" : "block"} bg-main transition ease-in duration-300 flex-1 flex items-center`}>
                <div className='bg-svg bg-orange rounded-lg flex-col flex items-center mt-[66px]'>
                  <Image alt='res-menu' src="/assets/icons/res-menu.png" width={150} height={150} className="relative top-[-80px]" />
                  <h3 className='text-white text-[24px] mt-[-73px] '>Add Menu</h3>
                  <span className='text-white text-center text-md py-2.5'>Manage Your food and beverages menu  <AiOutlineArrowRight className='inline-block' /></span>
                </div>
              </div>
              <li className="mt-auto">
                <Link
                  href="/admin/setting"
                  className={classNames(
                    router.pathname === "/admin/setting"
                      ? 'bg-orange text-white'
                      : 'text-gray-500 hover:text-white dark:text-gray-400 dark:hover:text-white hover:bg-orange',
                    'group items-center transition ease-in duration-150 flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                  )}
                >
                  <FontAwesomeIcon icon={faGear} className={`${openSidebar ? 'text-[18px] py-1.5 h-10 w-10 ' : 'h-6 w-6'} `} />
                  {
                    openSidebar ? " " :
                      "Settings"
                  }
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
