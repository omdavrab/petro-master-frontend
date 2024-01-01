import React from "react";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import URL from "@/URL";

const NozzleView = ({ open, setOpen, data }) => {
  return (
    <div>
      {data && (
        <Transition.Root show={open} as={Fragment}>
          <Dialog as="div" className="relative z-[999]" onClose={setOpen}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black dark:bg-gray-500/[75%] bg-opacity-75 transition-opacity" />
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
                  <Dialog.Panel className="relative transform  dark:bg-[#0c1a32] rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl ">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold border-b px-4 py-4 leading-6 dark:text-white text-gray-900"
                    >
                      Nozzle/Tank View
                    </Dialog.Title>
                    <div className="px-4 py-4 space-y-3">
                      <div className="">
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
                                  Nozzle
                                </th>
                                <th
                                  scope="col"
                                  className="px-3 py-3.5 dark:text-white text-left text-sm font-semibold text-gray-900"
                                >
                                  Tank
                                </th>
                              </tr>
                            </thead>
                            <tbody className="dark:bg-[#0c1a32] bg-white">
                              {data?.nozzles?.length > 0 &&
                                data?.nozzles?.map((item, index) => (
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
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">
                                      {item?.nozzle}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">
                                      {item?.tank}
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      )}
    </div>
  );
};

export default NozzleView;
