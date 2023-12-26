import URL from "@/URL";
import CustomerFlow from "@/components/admin/CustomerFlow";
import CustomerReview from "@/components/admin/CustomerReview";
import DasboardChart from "@/components/admin/DasboardChart";
import { HandleTotal } from "@/redux/action/dashboard";
import {
  HandleRestaurantData,
  HandleTrendingItem,
} from "@/redux/action/restaurant";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { BiLineChart, BiLineChartDown } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";

const socket = io(URL);

const Dashboard = () => {
  const dispatch = useDispatch();
  const TotalCount = useSelector((state) => state.TotalCount.total);
  const RestaurantTrendingItem = useSelector(
    (state) => state.RestaurantTrendingItem.restaurantTrendingItem
  );
  const [total, setTotal] = useState();
  const [trendingItems, setTrendingItems] = useState();
  // const [notificationPermission, setNotificationPermission] = useState();

  // const Restaurant = useSelector((state) => state.Restaurant?.restaurantData);

  useEffect(() => {
    dispatch(HandleTotal());
    dispatch(HandleRestaurantData());
    dispatch(HandleTrendingItem());
  }, []);

  // useEffect(() => {
  //   socket.emit("join", Restaurant._id);
  //   // return () => {
  //   //   socket.disconnect();
  //   // };
  // }, [Restaurant]);

  // useEffect(() => {
  //   if (notificationPermission !== "granted") {
  //     requestNotificationPermission();
  //   }
  //   socket.on("notification", (notification) => {
  //     console.log(
  //       "🚀 ~ file: index.js:84 ~ socket.on ~ notification:",
  //       notification
  //     );
  //     showBrowserNotification(notification);
  //   });
  //   return () => {
  //     socket.off("notification");
  //   };
  // }, []);

  // const requestNotificationPermission = async () => {
  //   const permission = await Notification.requestPermission();
  //   setNotificationPermission(permission);
  // };

  // const showBrowserNotification = (message) => {
  //   if (Notification.permission === "granted") {
  //     new Notification("New Notification", { body: message });
  //   }
  // };

  useEffect(() => {
    setTotal(TotalCount);
    setTrendingItems(RestaurantTrendingItem);
  }, [TotalCount, RestaurantTrendingItem]);
  return (
    <div className="px-4 sm:px-6 lg:px-8 ">
      <div className="grid  md:grid-cols-2 xl:grid-cols-3  gap-4">
        <div className="bg-white dark:bg-[#0c1a32] flex gap-5 items-start shadow-sm rounded-md p-5">
          <div>
            <Image
              alt="order"
              height={80}
              width={80}
              src="/assets/icons/online-order.png"
            />
          </div>
          <div>
            <h2 className="dark:text-white text-black/[85%] font-bold text-[32px]">
              {total?.AllData?.TotalOrder}
            </h2>
            <span className="dark:text-white/[60%] text-black/[60%]">
              Total Order
            </span>
          </div>
        </div>
        <div className="bg-white dark:bg-[#0c1a32] flex gap-5 items-start shadow-sm rounded-md p-5">
          <div>
            <Image
              alt="food-delivery"
              height={70}
              width={70}
              src="/assets/icons/user.png  "
            />
          </div>
          <div>
            <h2 className="dark:text-white text-black/[85%] font-bold text-[32px]">
              {total?.AllData?.TotalUser}
            </h2>
            <span className="dark:text-white/[60%] text-black/[60%]">
              Total User
            </span>
          </div>
        </div>
        <div className="bg-white dark:bg-[#0c1a32] flex gap-5 items-start shadow-sm rounded-md p-5">
          <div>
            <Image
              alt="cancel"
              height={80}
              width={80}
              src="/assets/icons/order.png"
            />
          </div>
          <div>
            <h2 className="dark:text-white text-black/[85%] font-bold text-[32px]">
              {total?.AllData?.TotalStatusCounts?.complete}
            </h2>
            <span className="dark:text-white/[60%] text-black/[60%]">
              Total Completed Order
            </span>
          </div>
        </div>
        <div className="bg-white dark:bg-[#0c1a32] flex gap-5 items-start shadow-sm rounded-md p-5">
          <div>
            <Image
              alt="cancel"
              height={80}
              width={80}
              src="/assets/icons/food-delivery.png  "
            />
          </div>
          <div>
            <h2 className="dark:text-white text-black/[85%] font-bold text-[32px]">
              {total?.AllData?.TotalStatusCounts?.pending}
            </h2>
            <span className="dark:text-white/[60%] text-black/[60%]">
              Total Pending Order
            </span>
          </div>
        </div>
        <div className="bg-white dark:bg-[#0c1a32] flex gap-5 items-start shadow-sm rounded-md p-5">
          <div>
            <Image
              alt="cancel"
              height={80}
              width={80}
              src="/assets/icons/cancel.png"
            />
          </div>
          <div>
            <h2 className="dark:text-white text-black/[85%] font-bold text-[32px]">
              {total?.AllData?.TotalStatusCounts?.cancel}
            </h2>
            <span className="dark:text-white/[60%] text-black/[60%]">
              Total Canceled Order
            </span>
          </div>
        </div>
        <div className="bg-white dark:bg-[#0c1a32] flex gap-5 items-start shadow-sm rounded-md p-5">
          <div>
            <Image
              alt="salary"
              height={80}
              width={80}
              src="/assets/icons/salary.png"
            />
          </div>
          <div>
            <h2 className="dark:text-white text-black/[85%] font-bold text-[32px]">
              $ {total?.AllData?.TotalRevenue}K
            </h2>
            <span className="dark:text-white/[60%] text-black/[60%]">
              Total Revenue
            </span>
          </div>
        </div>
      </div>
      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        <div className="dark:bg-[#0c1a32] bg-white lg:col-span-2 shadow-sm rounded-md p-5">
          <div className="flex mb-5">
            <div className="flex-1">
              <h2 className="font-semibold dark:text-white/[85%] text-black/[85%] text-[18px] md:text-[24px]">
                Daily Revenue
              </h2>
              <span className="text-black/[70%] dark:text-white/[70%]  text-xs md:text-[14px]">
                Lorem ipsum dolor
              </span>
            </div>
            <div className="text-end">
              <h1 className="text-black/[85%] dark:text-white/[85%] font-bold text-[20px] md:text-[38px] ">
                $ 154K
              </h1>
              <span className="text-black/[70%] dark:text-white/[70%] text-xs md:text-[14px]">
                <span className="text-[#01b075]">+ 1.5% </span>than last week
              </span>
            </div>
          </div>
          <DasboardChart />
        </div>
        <div className="dark:bg-[#0c1a32] bg-white shadow-sm rounded-md p-5">
          <div className="flex mb-5">
            <div className="flex-1">
              <h2 className="font-semibold  dark:text-white/[85%]  text-black/[85%] text-[18px] md:text-[24px]">
                Customer Flow
              </h2>
            </div>
          </div>
          <CustomerFlow />
        </div>
      </div>
      <div className="mt-10">
        <CustomerReview />
      </div>
      <div className="bg-white dark:bg-[#0c1a32] shadow-sm rounded-md ">
        <div className="flex-1 border-b dark:border-gray-600 p-[20px]">
          <h2 className="font-semibold text-black/[85%]  dark:text-white/[85%]  text-[18px] md:text-[24px]">
            Trending Items
          </h2>
        </div>
        <div className="px-7 py-1 grid dark:divide-gray-600 divide-y ">
          {trendingItems?.length > 0 &&
            trendingItems?.map((item, index) => {
              return (
                <div
                  key={index}
                  className="md:flex justify-between py-5 items-center"
                >
                  <div className="flex justify-start items-center mb-5 md:mb-0">
                    <div>
                      <p className="text-[18px] dark:text-gray-300 text-gray-600">
                        {index + 1}
                      </p>
                    </div>
                    <div className="text-start">
                      <img
                        src={`${URL}/image/${item.menuItem.image}`}
                        className="rounded-[10px] w-[80px] ml-[15px] mr-[15px]"
                        alt={item.menuItem.name}
                      />
                    </div>
                    <div>
                      <h5 className="font-semibold mb-1 text-[16px] ">
                        {item.menuItem.name}
                      </h5>
                      <p className="text-gray-700 dark:text-gray-400">
                        ${item.menuItem.price}{" "}
                        <span className="text-[#01b075]">
                          {item.menuItem.category}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="flex md:justify-end items-center">
                    <div className="text-end mx-[15px]">
                      {item.saleLevel === "high" ? (
                        <BiLineChart className="text-[#01b075] text-[48px]" />
                      ) : (
                        <BiLineChartDown className="text-[#4c95dd] text-[48px]" />
                      )}
                    </div>
                    <div className="text-start min-w-[120px]">
                      <h3 className="text-[1.7rem] leading-[1.2] font-medium ">
                        {item.quantity}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-500 text-[14px]">
                        Sales ({item.percentage}%)
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};


// export async function getServerSideProps(ctx) {
//   const myCookie = ctx.req?.cookies || "";

//   if (!myCookie.authorization) {
//     return {
//       redirect: {
//         destination: "/admin/login",
//         permanent: false,
//       },
//     };
//   }
//   return {
//     props: {},
//   };
// }

export default Dashboard;
