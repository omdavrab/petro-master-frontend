import Pagination from "@/components/Pagination/Pagination";
import AddCreditParty from "@/components/admin/AddCreditParty";
import AddRate from "@/components/admin/AddRate";
import NoData from "@/components/admin/NoData";
import { GetCreditParty } from "@/redux/action/credit";
import { GetRate } from "@/redux/action/rate";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";

const Credit = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const PartytList = useSelector((state) => state?.Party?.partylist);
  const [editRate, setEditRate] = useState();
  const [customersData, setCustomersData] = useState({});
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(GetCreditParty(page));
  }, [page]);

  useEffect(() => {
    setCustomersData(PartytList);
  }, [PartytList]);

  return (
    <>
      <button
        onClick={() => {
          setEditRate(null);
          setOpen(true);
        }}
        className="text-white bg-gray500 hover:bg-dark700 transition duration-300 py-1.5 px-5 rounded ml-auto mr-[40px] flex"
      >
        Add Credit Party
      </button>
      <AddCreditParty setView={setOpen} view={open} editEmployee={editRate} />
      {customersData?.data?.length > 0 ? (
        <div className="px-6 sm:px-10">
          <div>
            <h4 className="text-[24px] dark:text-white font-medium text-gray-900">
              Credit Party
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
                        className="py-3.5 pl-4 dark:text-white pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                      >
                        #
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 dark:text-white text-left text-sm font-semibold text-gray-900"
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 dark:text-white text-left text-sm font-semibold text-gray-900"
                      >
                        MS Rate
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 dark:text-white text-left text-sm font-semibold text-gray-900"
                      >
                        HSD Rate
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
                    {customersData?.data?.length > 0 &&
                      customersData?.data?.map((item, index) => (
                        <tr
                          key={index}
                          className={
                            index % 2 === 0
                              ? undefined
                              : "bg-gray-50  dark:bg-[#20304c]"
                          }
                        >
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-gray-300 sm:pl-3">
                            {index + 1}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700 dark:text-gray-300">
                            {moment(item.date).format("DD/MM/yyyy")}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">
                            {item.msRate}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">
                            {item.hsdRate}
                          </td>
                          <td className="relative whitespace-nowrap max-w-[80px] pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                            <button
                              onClick={() => {
                                setEditRate(item);
                                setOpen(true);
                              }}
                              className="hover:text-red-700 mr-2.5 text-orange trnasition duration-200 ease-in outline-none focus:outline-none"
                            >
                              <FaRegEdit className="text-[18px]" />
                            </button>
                            <button className="hover:text-red-700  text-red-400 trnasition duration-200 ease-in outline-none focus:outline-none">
                              <RiDeleteBin5Line className="text-[18px]" />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                <div className="grid border-t dark:border-gray-600 py-5 md:grid-cols-12">
                  <div className="md:col-span-5">
                    <span className="text-gray-700 dark:text-gray-400 font-medium">
                      Showing {customersData?.startIndex} to{" "}
                      {customersData?.endIndex} of {customersData?.results}{" "}
                      entries
                    </span>
                  </div>
                  <div className="md:col-span-7 ">
                    {customersData?.data?.length > 0 && (
                      <Pagination
                        className="pagination-bar"
                        currentPage={
                          customersData.current ? customersData.current : 1
                        }
                        totalCount={
                          customersData.results ? customersData.results : 10
                        }
                        pageSize={8}
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
export default Credit;
