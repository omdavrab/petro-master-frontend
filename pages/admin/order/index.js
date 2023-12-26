import Pagination from "@/components/Pagination/Pagination";
import {
  HandleGetOrderByRestaurant,
  HandleViewStoreData,
} from "@/redux/action/order";
import { DateFormat } from "@/utils/dateFormat";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import NoItemFound from "@/components/NoItemFound";
import { useRouter } from "next/router";
import NoData from "@/components/admin/NoData";

const OrderList = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const orderData = useSelector(
    (state) => state.GetOrder.orderListByRestaurant
  );
  const [orderDataList, setorderDataList] = useState();
  const [page, setPage] = useState(1);

  useEffect(() => {
    setorderDataList(orderData);
  }, [orderData]);

  useEffect(() => {
    dispatch(HandleGetOrderByRestaurant(page));
  }, [page]);

  return (
    <>
      <Tooltip
        id="my-tooltip"
        style={{ zIndex: "1111", background: "#fff", color: "#000" }}
      />
      {orderDataList?.data?.length > 0 ? (
        <div className="px-6 sm:px-10">
          <div>
            <h4 className="text-[24px] font-medium text-gray-900 dark:text-white">
              Order List
            </h4>
          </div>
          <div className="mt-8 bg-white dark:bg-[#0c1a32] rounded-md shadow-sm flow-root">
            <div className=" overflow-x-auto ">
              <div className="inline-block min-w-full pt-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y dark:divide-gray-600 divide-gray-300">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold dark:text-white text-gray-900 sm:pl-3"
                      >
                        Order ID
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white"
                      >
                        Customer Name
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white"
                      >
                        Table Num
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white"
                      >
                        Time
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white"
                      >
                        Amount
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white"
                      >
                        Payment Method
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900 dark:text-white"
                      >
                        Menu
                      </th>
                    </tr>
                  </thead>
                  <tbody className="dark:bg-[#0c1a32] bg-white">
                    {orderDataList?.data?.length > 0 &&
                      orderDataList?.data.map((item, itemIdx) => {
                        return (
                          <tr
                            key={itemIdx}
                            className={
                              itemIdx % 2 === 0
                                ? undefined
                                : "bg-gray-50  dark:bg-[#20304c]"
                            }
                          >
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-white sm:pl-3">
                              {item.orderId}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">
                              {item?.userId?.name}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">
                              {item?.tableNum}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">
                              {DateFormat(item.createdAt)}
                            </td>
                            <td className=" whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">
                              <span
                                className={`${
                                  item.status === "Complete"
                                    ? "bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20"
                                    : item.status === "Pending"
                                    ? "bg-yellow-50 text-yellow-700 ring-1 ring-inset ring-yellow-600/20"
                                    : "bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20"
                                }  text-sm rounded px-2 py-1`}
                              >
                                {item.status}
                              </span>
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">
                              ${item?.totalPrice}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">
                              <span
                                className={`${
                                  item.paymentMethod !== "cash"
                                    ? "bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20"
                                    : "bg-yellow-50 text-yellow-700 ring-1 ring-inset ring-yellow-600/20"
                                }  text-sm rounded px-2 py-1`}
                              >
                                {item.paymentMethod}
                              </span>
                            </td>
                            <td className="relative whitespace-nowrap max-w-[50px] pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                              <button
                                data-tooltip-id="my-tooltip"
                                onClick={() => {
                                  dispatch(HandleViewStoreData(item));
                                  router.push("/admin/order/orderdetail");
                                }}
                                data-tooltip-content="View Details"
                                className="hover:text-darkolivegreen dark:hover:text-white dark:hover:bg-orange hover:bg-orange dark:bg-slate-500 bg-darkolivegreen rounded py-1 px-2 text-white trnasition duration-200 ease-in outline-none focus:outline-none"
                              >
                                <FontAwesomeIcon icon={faEye} />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
                <div className="grid border-t dark:border-gray-600 py-5 md:grid-cols-12">
                  <div className="md:col-span-5">
                    <span className="text-gray-700 dark:text-gray-400 font-medium">
                      Showing {orderDataList?.startIndex} to{" "}
                      {orderDataList?.endIndex} of {orderDataList?.results}{" "}
                      entries
                    </span>
                  </div>
                  <div className="md:col-span-7 ">
                    {orderDataList?.data?.length > 0 && (
                      <Pagination
                        className="pagination-bar"
                        currentPage={
                          orderDataList.current ? orderDataList.current : 1
                        }
                        totalCount={
                          orderDataList.results ? orderDataList.results : 10
                        }
                        pageSize={10}
                        onPageChange={(pages) => setPage(pages)}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <NoData />
      )}
    </>
  );
};
export async function getServerSideProps(ctx) {
  const myCookie = ctx.req?.cookies || "";

  if (!myCookie.authorization) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
export default OrderList;
