import CustomerFlow from '@/components/admin/CustomerFlow'
import DasboardChart from '@/components/admin/DasboardChart'
import NoData from '@/components/admin/NoData'
import OverviewChart from '@/components/admin/OverviewChart'
import { faAngleUp, faArrowUp, faBoltLightning, faBullhorn, faCartShopping, faChartPie, faCircleArrowUp, faTrophy, faTruck, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import React from 'react'

const Analysis = () => {
  return (
    <div className="px-6 sm:px-10">
      <h4 className="text-[24px] dark:text-white font-medium text-gray-900">
        Analysis
      </h4>
      <div className='grid lg:grid-cols-2 mt-8 gap-8'>
        <div className='bg-white dark:bg-[#0c1a32] rounded-md shadow-box '>
          <div className='border-b py-4 px-5 dark:border-gray-600'>
            <h2 className='text-[20px] dark:text-white/[85%] text-medium text-gray-800'>Restaurant Analytics</h2>
          </div>
          <div className='flex justify-between p-5'>
            <div className=''>
              <div>
                <FontAwesomeIcon icon={faUser} className="text-gray-600 dark:text-gray-100 text-[14px] mr-2" />
                <span className='text-[14px] '>Users</span>
              </div>
              <h5 className='text-[18px] dark:text-gray-100 text-gray-600 font-semibold'>61K</h5>
            </div>
            <div>
              <div>
                <FontAwesomeIcon icon={faArrowUp} className="text-gray-600 dark:text-gray-100 text-[14px] mr-2" />
                <span className='text-[14px]'>Sessions</span>
              </div>
              <h5 className='text-[18px] dark:text-gray-100 text-gray-600 font-semibold'>92K</h5>
            </div>
            <div>
              <div> 
                <FontAwesomeIcon icon={faChartPie} className="text-gray-600 dark:text-gray-100 text-[14px] mr-2" />
                <span className='text-[14px]'>Rate</span>
              </div>
              <h5 className='text-[18px] dark:text-gray-100 text-gray-600 font-semibold'>72.6%</h5>
            </div>
          </div>
          <div className='p-5'>
            <CustomerFlow />
          </div>
        </div>
        <div className='bg-white dark:bg-[#0c1a32] rounded-md shadow-box'>
          <div className='border-b py-4 px-5 dark:border-gray-600'>
            <h2 className='text-[20px] text-medium text-gray-800 dark:text-white/[85%]'>Daily Sales Overview</h2>
          </div>
          <div className='p-5'>
            <DasboardChart />
          </div>
        </div>
      </div>
      <div className='bg-orange/[10%] dark:bg-gray-300 grid sm:grid-cols-2 shadow-box gap-10 rounded-md p-4 mt-8'>
        <div className='pl-2'>
          <h2 className='text-[20px] text-medium text-gray-800'>Revenue Overview</h2>
          <div className='grid lg:grid-cols-2 mt-8 lg:mt-0'>
            <div className='flex gap-6 items-end lg:pb-5'>
              <div className='flex gap-6 w-full'>
                <div className='w-[50px] h-[50px] lg:w-[60px] lg:h-[60px] rounded-full bg-orange/[80%] flex items-center justify-center'>
                  <FontAwesomeIcon icon={faTrophy} className="text-white" />
                </div>
                <div className='flex-1 pr-3'>
                  <div>
                    <h2 className='text-[26px] leading-[22px] font-bold text-gray-700'>
                      $967K
                    </h2>
                    <span className='text-gray-600 text-[13px]'>Sales</span>
                  </div>
                  <div className='mt-3'>
                    <div className='flex items-center  justify-between'>
                      <h4 className='text-[16px] font-bold text-gray-700 leading-[16px]'>-6.20967 </h4>
                      <FontAwesomeIcon icon={faAngleUp} className="text-gray-700" />
                    </div>
                    <span className='text-gray-600  text-[13px]'>Sales</span>
                  </div>
                </div>

              </div>
            </div>
            <div className=''>
              <OverviewChart />
            </div>
          </div>
        </div>
        <div className='pl-2'>
          <h2 className='text-[20px] text-medium text-gray-800'>Sales Overview</h2>
          <div className='grid lg:grid-cols-2 mt-8 lg:mt-0'>
            <div className='flex gap-6 items-end lg:pb-5'>
              <div className='flex gap-6 w-full'>
                <div className='w-[50px] h-[50px] lg:w-[60px] lg:h-[60px] rounded-full bg-orange/[80%] flex items-center justify-center'>
                  <FontAwesomeIcon icon={faTrophy} className="text-white" />
                </div>
                <div className='flex-1 pr-3'>
                  <div>
                    <h2 className='text-[26px] leading-[22px] font-bold text-gray-700'>
                      $967K
                    </h2>
                    <span className='text-gray-600 text-[13px]'>Sales</span>
                  </div>
                  <div className='mt-3'>
                    <div className='flex items-center  justify-between'>
                      <h4 className='text-[16px] font-bold text-gray-700 leading-[16px]'>-6.20967 </h4>
                      <FontAwesomeIcon icon={faAngleUp} className="text-gray-700"/>
                    </div>
                    <span className='text-gray-600 text-[13px]'>Sales</span>
                  </div>
                </div>

              </div>
            </div>
            <div>
              <OverviewChart />
            </div>
          </div>
        </div>
      </div>
      <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8'>
        <div className='bg-white dark:bg-[#0c1a32] rounded-md flex items-center shadow-box p-4 lg:p-5 xl:p-6'>
          <div className='flex-1'>
            <h3 className='font-bold text-[28px] text-gray-600 dark:text-gray-300'>4.56k</h3>
            <span className='font-noraml text-gray-600 dark:text-gray-400'>Sales Today</span>
          </div>
          <div className='w-[50px] h-[50px] lg:w-[60px] lg:h-[60px] rounded-full bg-gray-600 dark:bg-orange text-white flex items-center justify-center'>
            <FontAwesomeIcon icon={faTruck} />
          </div>
        </div>
        <div className='bg-white dark:bg-[#0c1a32] rounded-md flex items-center shadow-box p-4 lg:p-5 xl:p-6'>
          <div className='flex-1'>
            <h3 className='font-bold text-[28px] text-gray-600 dark:text-gray-300'>27.4k</h3>
            <span className='font-noraml text-gray-600 dark:text-gray-400'>Visitors Today</span>
          </div>
          <div className='w-[50px] h-[50px] lg:w-[60px] lg:h-[60px] rounded-full bg-gray-600 dark:bg-orange text-white flex items-center justify-center'>
            <FontAwesomeIcon icon={faBoltLightning} />
          </div>
        </div>
        <div className='bg-white dark:bg-[#0c1a32] rounded-md flex items-center shadow-box p-4 lg:p-5 xl:p-6'>
          <div className='flex-1'>
            <h3 className='font-bold text-[28px] text-gray-600 dark:text-gray-300'>$ 29.2k</h3>
            <span className='font-noraml text-gray-600 dark:text-gray-400'>Total Earnings</span>
          </div>
          <div className='w-[50px] h-[50px] lg:w-[60px] lg:h-[60px] rounded-full bg-gray-600 dark:bg-orange text-white flex items-center justify-center'>
            <FontAwesomeIcon icon={faCartShopping} />
          </div>
        </div>
        <div className='bg-white dark:bg-[#0c1a32] rounded-md flex items-center shadow-box p-4 lg:p-5 xl:p-6'>
          <div className='flex-1'>
            <h3 className='font-bold text-[28px] text-gray-600 dark:text-gray-300'>45</h3>
            <span className='font-noraml text-gray-600 dark:text-gray-400'>Pending Orders</span>
          </div>
          <div className='w-[50px] h-[50px] lg:w-[60px] lg:h-[60px] rounded-full bg-gray-600 dark:bg-orange text-white flex items-center justify-center'>
            <FontAwesomeIcon icon={faBullhorn} />
          </div>
        </div>
      </div>
    </div>
  )
}
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
export default Analysis
