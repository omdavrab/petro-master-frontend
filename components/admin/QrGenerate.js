import React from 'react'
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { HandleGetQRCode, HandleQRCode } from '@/redux/action/qrCode'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { CloseLoader, OpenLoader } from '@/redux/action/loader'

const QrGenerate = ({ setTableNumbers, setOpen, open, tableNumbers }) => {
  const [numOfTable, setNumOfTable] = useState()
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOpen(false);
    dispatch(OpenLoader(true))
    await dispatch(HandleQRCode({ numOfTable: numOfTable })).then((result) => {
      if (result.payload.status === 200) {
        toast(result?.payload?.data.message, {
          hideProgressBar: true,
          autoClose: 3000,
          type: "success",
        });
        dispatch(HandleGetQRCode())
        dispatch(CloseLoader(false));
      } else {
        dispatch(CloseLoader(false));
        toast(result?.payload?.data.message, {
          hideProgressBar: true,
          autoClose: 3000,
          type: "error",
        });
      }
    })
      .catch((err) => {
        console.log(err, "SignUP ERROR");
      });

  };

  const cancelButtonRef = useRef(null)
  return (
    <div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-[99]" initialFocus={cancelButtonRef} onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
          </Transition.Child>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                  <Dialog.Title as="h3" className="text-[18px] font-semibold leading-6 text-gray-800">
                    QR generator
                  </Dialog.Title>
                  <form onSubmit={handleSubmit} method="post" className='mt-7'>
                    <label className='text-gray-800 font-medium block mb-1.5'>
                      Enter Number of Table
                    </label>
                    <input onChange={(e) => setNumOfTable(e.target.value)} type="number" min="1" max="20" placeholder='Enter Number' className='block  w-full text-[14px] py-1.5 px-6 text-[#6e6e6e] rounded-md border border-[#f0f1f5] focus:border-orange transition duration-300 focus:outline-none focus:ring-0  shadow-none rounded-md bg-white ' />
                    <div className='mt-5'>
                      <button type="submit" className='bg-green-600 transition duration-300 font-medium  hover:bg-green-700 focus:bg-greeen-700 focus:outline-none text-white py-1.5 rounded px-4'>
                        Generate
                      </button>
                      <button onClick={() => setOpen(false)} type='button' className='bg-white transition duration-300 hover:text-red-600 font-medium focus:bg-greeen-700 focus:outline-none text-gray-800 py-1.5 rounded px-4'>
                        Cancel
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  )
}

export default QrGenerate
