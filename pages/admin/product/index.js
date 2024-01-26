import React, { useEffect, useRef, useState } from "react";
import Pagination from "@/components/Pagination/Pagination";
import DeletePopup from "@/components/admin/DeletePopup";
import NoData from "@/components/admin/NoData";
import { RiDeleteBin5Line, RiEditBoxFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { FaRegEdit } from "react-icons/fa";
import AddProduct from "@/components/admin/AddProduct";
import { GetProduct } from "@/redux/action/product";

const Product = () => {
  const dispatch = useDispatch();
  const ProductList = useSelector((state) => state?.Product?.productlist);

  const [open, setOpen] = useState(false);
  const [customersData, setCustomersData] = useState({});
  const cancelButtonRef = useRef(null);
  const [page, setPage] = useState(1);
  const [view, setView] = useState(false);
  const [editEmployee, setEditEmployee] = useState();

  useEffect(() => {
    dispatch(GetProduct(page));
  }, [page]);

  useEffect(() => {
    setCustomersData(ProductList);
  }, [ProductList]);

  return (
    <>
      <button
        onClick={() => {
          setEditEmployee(null);
          setView(true);
        }}
        className="text-white bg-gray500 hover:bg-dark700 transition duration-300 py-1.5 px-5 rounded ml-auto mr-[40px] flex"
      >
        Add New Product
      </button>
      <AddProduct open={view} setOpen={setView} editEmployee={editEmployee} />
      {customersData?.data?.length > 0 ? (
        <div className="px-6 sm:px-10">
          <div>
            <h4 className="text-[24px] dark:text-white font-medium text-gray-900">
              Product
            </h4>
          </div>
          <div className="mt-8 bg-white dark:bg-[#0c1a32] rounded-md shadow-sm flow-root">
            <div className=" overflow-x-auto ">
              <div className="inline-block min-w-full pt-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full ">
                  <thead className="bg-white">
                    <tr>
                      <th
                        scope="col"
                        className="px-3 py-[9px]  text-left text-[15px] font-semibold text-violet600"
                      >
                        Product ID
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-[9px]   text-left text-[15px] font-semibold text-violet600"
                      >
                        Product Name
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-[9px]   text-left text-[15px] font-semibold text-violet600"
                      >
                        Total Quantity
                      </th>

                      <th
                        scope="col"
                        className="px-3 py-[9px]   text-left text-[15px] font-semibold text-violet600"
                      >
                        Available Quantity
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-[9px]   text-left text-[15px] font-semibold text-violet600"
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-[9px] flex justify-center text-center text-left text-[15px] font-semibold text-violet600"
                      >
                        Option
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {customersData.data &&
                      customersData.data.map((person, personIdx) => (
                        <tr
                          key={person.email}
                          className={`${
                            personIdx % 2 === 1
                              ? undefined
                              : "bg-[#D9D9D9] bg-opacity-[0.2]"
                          } influencertable`}
                        >
                          <td className="whitespace-nowrap py-3 px-3 text-sm  font-medium text-gray-900 ">
                            <div className="flex space-x-[7px]">
                              <div className="">{personIdx}</div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-3 leading-5 font-medium  text-sm font-medium text-gray-900">
                            <div className=" ">{person?.name}</div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-3 leading-5 font-medium  text-xs font-medium text-gray-900">
                            {person?.total_Quantity}
                          </td>
                          <td className="whitespace-nowrap px-3 py-3 text-sm  text-gray-500">
                            <span
                              className={`${
                                person.available_Quantity > 15
                                  ? " bg-green100 text-green600"
                                  : person.available_Quantity < 15 &&
                                    person.available_Quantity > 5
                                  ? " bg-[#FFEFDB] text-[#FF8B00]"
                                  : "bg-[#f9d6d6] text-[#ff2500]"
                              } text-black400 px-[25px] py-[3px] rounded font-medium leading-[15px] text-[13px] text-center`}
                            >
                              {person.available_Quantity
                                ? person.available_Quantity
                                : 0}
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-3 py-3 text-center leading-5 font-medium  text-xs text-gray-900">
                            {person?.price}
                          </td>
                          <td className="relative gap-6 whitespace-nowrap max-w-[80px] pl-3 pr-4 text-center text-sm font-medium sm:pr-3">
                            <button
                              onClick={() => {
                                setEditEmployee(person);
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
export default Product;
