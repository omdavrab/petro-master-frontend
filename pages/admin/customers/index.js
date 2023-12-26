import React, { useEffect, useRef, useState } from 'react';
import Pagination from '@/components/Pagination/Pagination';
import DeletePopup from '@/components/admin/DeletePopup';
import NoData from '@/components/admin/NoData';
import { HandleRestaurantCustomersData } from '@/redux/action/restaurant';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';

const Customers = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false)
  const [customersData, setCustomersData] = useState()
  const useData = useSelector((state) => state.RestaurantUserData.restaurantCustomersData)
  const cancelButtonRef = useRef(null)
  const [page, setPage] = useState(1)

  useEffect(() => {
    dispatch(HandleRestaurantCustomersData());
  }, []);

  useEffect(() => {
    setCustomersData(useData.customersWithLastOrder);
  }, [useData])

  return (
    <>
      {customersData ?
        <div className='px-6 sm:px-10'>
          <div>
            <h4 className="text-[24px] dark:text-white font-medium text-gray-900">Customers</h4>
          </div>
          <div className="mt-8 bg-white dark:bg-[#0c1a32] rounded-md shadow-sm flow-root">
            <div className=" overflow-x-auto ">
              <div className="inline-block min-w-full pt-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y dark:divide-gray-600 divide-gray-300">
                  <thead>
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 dark:text-white pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3">
                        Order ID
                      </th>
                      <th scope="col" className="px-3 py-3.5 dark:text-white text-left text-sm font-semibold text-gray-900">
                        Customer Name
                      </th>
                      <th scope="col" className="px-3 py-3.5 dark:text-white text-left text-sm font-semibold text-gray-900">
                        Email
                      </th>
                      <th scope="col" className="px-3 py-3.5 dark:text-white text-left text-sm font-semibold text-gray-900">
                        Join Date
                      </th>
                      <th scope="col" className="px-3 py-3.5 dark:text-white text-left text-sm font-semibold text-gray-900">
                        Totle Spent
                      </th>
                      <th scope="col" className="px-3 py-3.5 dark:text-white text-left text-sm font-semibold text-gray-900">
                        Last Order
                      </th>
                      <th scope="col" className="px-3 py-3.5 dark:text-white max-w-[80px] text-right text-sm font-semibold text-gray-900">
                        Delete User
                      </th>
                    </tr>
                  </thead>
                  <tbody className="dark:bg-[#0c1a32] bg-white">
                    {/* {customersData?.data?.length > 0 && customersData?.data.map((customers, personIdx)  => ( */}
                    {customersData?.length > 0 && customersData?.map((customers, personIdx) => (
                      <tr key={personIdx} className={personIdx % 2 === 0 ? undefined : 'bg-gray-50  dark:bg-[#20304c]'}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-gray-300 sm:pl-3">
                          #{customers?.orderId}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">{customers?.userData?.name}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">{customers?.userData?.email}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">{customers?.createdAt}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">${customers?.totalSpent}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">${customers?.lastOrderSpent}</td>
                        <td className="relative whitespace-nowrap max-w-[80px] pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                          <button onClick={() => setOpen(true)} className="hover:text-red-700  text-red-400 trnasition duration-200 ease-in outline-none focus:outline-none">
                            <RiDeleteBin5Line className='text-[18px]' />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="grid border-t dark:border-gray-600 py-5 md:grid-cols-12">
                  <div className="md:col-span-5">
                    <span className='text-gray-700 dark:text-gray-400 font-medium'>Showing {customersData?.startIndex} to {customersData?.endIndex} of {customersData?.results} entries</span>
                  </div>
                  <div className="md:col-span-7 ">
                    {customersData?.data?.length > 0 &&
                      <Pagination
                        className="pagination-bar"
                        currentPage={customersData.current ? customersData.current : 1}
                        totalCount={customersData.results ? customersData.results : 10}
                        pageSize={8}
                        onPageChange={(pages) => setPage(pages)}
                      />
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        :
        <NoData />
      }
      <DeletePopup
        title="Delete User"
        dis="Are you sure you want to Delte User? All of your data will be permanently removed
        from our servers forever. This action cannot be undone."
        deletebuttonTitle="Delete User"
        open={open}
        cancelButtonRef={cancelButtonRef}
        setOpen={setOpen} />
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
export default Customers;
