import CreateCoupon from "@/components/admin/CreateCoupon";
import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";

const AllCoupons = () => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div className="px-6 sm:px-10">
        <div className="flex justify-between">
          <h4 className="text-[24px] dark:text-white font-medium text-gray-900">
            All Coupons
          </h4>
          <button onClick={() => setOpen(true)} className="text-white bg-gray500 hover:bg-dark700 transition duration-300 py-1.5 px-5 rounded">
            Add New Coupon
          </button>
        </div>
        <div className="mt-8 bg-white dark:bg-[#0c1a32] rounded-md shadow-sm flow-root">
          <div className=" overflow-x-auto ">
            <div className="inline-block min-w-full pt-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y dark:divide-gray-600 divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 dark:text-white pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                    >
                      #
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 dark:text-white text-left text-sm font-semibold text-gray-900"
                    >
                      Code
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 dark:text-white text-left text-sm font-semibold text-gray-900"
                    >
                      Type
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 dark:text-white text-left text-sm font-semibold text-gray-900"
                    >
                      Start Date
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 dark:text-white text-left text-sm font-semibold text-gray-900"
                    >
                      End Date
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 dark:text-white max-w-[80px] text-right text-sm font-semibold text-gray-900"
                    >
                      Option
                    </th>
                  </tr>
                </thead>
                <tbody className="dark:bg-[#0c1a32] bg-white">
                  <tr
                  // key={personIdx}
                  // className={
                  //   personIdx % 2 === 0
                  //     ? undefined
                  //     : "bg-gray-50  dark:bg-[#20304c]"
                  // }
                  >
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-gray-300 sm:pl-3">
                      1
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700 dark:text-gray-300">
                      TOTAL500
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">
                      Product Base
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">
                      04-10-2021
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">
                      30-11-2021
                    </td>
                    <td className="relative whitespace-nowrap max-w-[80px] pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                      <button
                        onClick={() => setOpen(true)}
                        className="hover:text-red-700 mr-2.5 text-orange trnasition duration-200 ease-in outline-none focus:outline-none"
                      >
                        <FaRegEdit className="text-[18px]" />
                      </button>
                      <button
                        className="hover:text-red-700  text-red-400 trnasition duration-200 ease-in outline-none focus:outline-none"
                      >
                        <RiDeleteBin5Line className="text-[18px]" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <CreateCoupon setOpen={setOpen} open={open} />
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
export default AllCoupons;
