import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Pagination from "@/components/Pagination/Pagination";
import DeletePopup from "@/components/admin/DeletePopup";
import NoData from "@/components/admin/NoData";
import { RiDeleteBin5Line, RiEditBoxFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import AddEmployee from "@/components/admin/AddEmployee";
import { GetEmployee } from "@/redux/action/employee";
import { GrView } from "react-icons/gr";
import EmployeeView from "@/components/admin/EmployeeView";
import AddTank from "@/components/admin/AddTank";
import { GetTank } from "@/redux/action/tank";
import { FaRegEdit } from "react-icons/fa";
import { GetBank } from "@/redux/action/bank";
import AddBank from "@/components/admin/AddBank";

const Bank = () => {
  const dispatch = useDispatch();
  const BankList = useSelector((state) => state?.Bank?.banklist);

  const [open, setOpen] = useState(false);
  const [customersData, setCustomersData] = useState();
  const cancelButtonRef = useRef(null);
  const [page, setPage] = useState(1);
  const [view, setView] = useState(false);
  const [editEmployee, setEditEmployee] = useState();

  useEffect(() => {
    dispatch(GetBank(page));
  }, [page]);

  useMemo(() => {
    setCustomersData(BankList);
  }, [BankList]);

  return (
    <>
      <button
        onClick={() => {
          setEditEmployee(null);
          setView(true);
        }}
        className="text-white bg-gray500 hover:bg-dark700 transition duration-300 py-1.5 px-5 rounded ml-auto mr-[40px] flex"
      >
        Add New Bank
      </button>
      <AddBank view={view} setView={setView} editEmployee={editEmployee} />
      {customersData?.data?.length > 0 ? (
        <div className="px-6 sm:px-10">
          <div>
            <h4 className="text-[24px] dark:text-white font-medium text-gray-900">
              Bank
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
                        className="px-3 py-3.5 dark:text-white text-left text-sm font-semibold text-gray-900"
                      >
                        #
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 dark:text-white text-left text-sm font-semibold text-gray-900"
                      >
                        Account Number
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 dark:text-white text-left text-sm font-semibold text-gray-900"
                      >
                        Bank Name
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 dark:text-white text-left text-sm font-semibold text-gray-900"
                      >
                        Holder Name
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 dark:text-white text-left text-sm font-semibold text-gray-900"
                      >
                        IFSC Code
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 dark:text-white text-left text-sm font-semibold text-gray-900"
                      >
                        Phone Number
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 dark:text-white max-w-[80px] text-right text-sm font-semibold text-gray-900"
                      >
                        Other
                      </th>
                    </tr>
                  </thead>
                  <tbody className="dark:bg-[#0c1a32] bg-white">
                    {/* {customersData?.data?.length > 0 && customersData?.data.map((item, personIdx)  => ( */}
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
                            #{index + 1}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">
                            {item?.accountNo}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">
                            {item?.bankName}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">
                            {item?.holderName}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">
                            {item.ifscCode}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">
                            {item.phone}
                          </td>
                          <td className="relative gap-6 whitespace-nowrap max-w-[80px] pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                            <button
                              onClick={() => {
                                setEditEmployee(item);
                                setView(true);
                              }}
                              className="hover:text-red-700 mr-2.5 text-orange trnasition duration-200 ease-in outline-none focus:outline-none"
                            >
                              <FaRegEdit className="text-[18px]" />
                            </button>
                            <button
                              onClick={() => setOpen(true)}
                              className="hover:text-red-700  text-red-400 trnasition duration-200 ease-in outline-none focus:outline-none"
                            >
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
      <DeletePopup
        title="Delete User"
        dis="Are you sure you want to Delte User? All of your data will be permanently removed
          from our servers forever. This action cannot be undone."
        deletebuttonTitle="Delete User"
        open={open}
        cancelButtonRef={cancelButtonRef}
        setOpen={setOpen}
      />
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
export default Bank;
