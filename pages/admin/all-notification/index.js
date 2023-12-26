import Pagination from '@/components/Pagination/Pagination';
import React from 'react'

const AllNotification = () => {
  return (
    <div className="px-6 sm:px-10">
      <h4 className="text-[24px] dark:text-white font-medium text-gray-900">
        All Notifications
      </h4>
      <div className="bg-white min-h-[calc(100vh_-_212px)] max-w-4xl dark:bg-[#0c1a32] w-full mx-auto mt-8 rounded-md shadow-sm  ">
        <div className="border-b py-4 px-5 dark:border-gray-600">
          <h2 className="text-[20px] dark:text-white/[85%] text-medium text-gray-800">Notifications</h2>
        </div>
        <div className=' px-5 divide-y'>
          <div className='p-5 '>
            <span className='text-[14px] block mb-1.5 text-gray-800'>Order code: 20220726-08275357 has been Placed</span>
            <span className='text-gray-500 text-[10px] block'>July 25 2022, 10:27 pm</span>
          </div>
          <div className='p-5 '>
            <span className='text-[14px] block mb-1.5 text-gray-800'>Order code: 20220726-08275357 has been Placed</span>
            <span className='text-gray-500 text-[10px] block'>July 25 2022, 10:27 pm</span>
          </div>
          <div className='p-5 '>
            <span className='text-[14px] block mb-1.5 text-gray-800'>Order code: 20220726-08275357 has been Placed</span>
            <span className='text-gray-500 text-[10px] block'>July 25 2022, 10:27 pm</span>
          </div>
        </div>
        {/* <Pagination /> */}
      </div>
    </div>
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

export default AllNotification
