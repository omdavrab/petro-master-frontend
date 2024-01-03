import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage, useField } from "formik";
import { CloseLoader, OpenLoader } from "@/redux/action/loader";
import { toast } from "react-toastify";
import { GetTank, HandleEditTank, HandleTankCreate } from "@/redux/action/tank";
import { GetBank, HandleCreateBank, HandleEditBank } from "@/redux/action/bank";
import { GetUpi, HandleCreateUpi, HandleEditUpi } from "@/redux/action/upi";

export default function AddUpi({ view, setView, editEmployee }) {
  const dispatch = useDispatch();

  const initialValues = {
    accountNo: editEmployee ? editEmployee.accountNo : "",
  };

  const validationSchema = Yup.object({
    accountNo: Yup.string().required("Account No. is required"),
  });

  const HandleData = async (values) => {
    try {
      dispatch(OpenLoader(true));
      await dispatch(
        editEmployee?._id
          ? HandleEditUpi(editEmployee._id, values)
          : HandleCreateUpi(values)
      )
        .then(async (result) => {
          if (result?.payload?.status === 201 || 200) {
            toast(result?.payload?.data.message, {
              hideProgressBar: true,
              autoClose: 3000,
              type: "success",
            });
            await dispatch(GetUpi(1));
            setView(false);
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
          dispatch(CloseLoader(false));
          console.log(err, "Edit ERROR");
        });
    } catch (err) {
      dispatch(CloseLoader(false));
      console.log(err, "Edit ERROR");
    }
  };

  return (
    <div>
      <div className="">
        <Transition.Root show={view} as={Fragment}>
          <Dialog as="div" className="relative z-40" onClose={setView}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-[#00000080] " />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex justify-end">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative min-h-[100vh] flex w-full max-w-[988px] flex-1 flex-col bg-white">
                  <div className="flex h-full flex-col flex-shrink-0 pt-8 px-3 md:px-12">
                    <div className="w-full flex items-center space-x-[25px]">
                      <button
                        className="focus:outline-none"
                        onClick={() => setView(false)}
                      >
                        <img src="/assets/icons/left.svg" />
                      </button>
                      <h2 className="text-black600 font-semibold text-xl">
                        Add New UPI
                      </h2>
                    </div>
                    <div className="mt-7 custom-scrollbar min-h-[calc(100vh_-_5rem)] overflow-auto">
                      <nav
                        className="-mb-px flex gap-[20px] sm:gap-[30px] lg:gap-[68px] "
                        aria-label="Tabs"
                      >
                        <div className=" w-full ">
                          <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            enableReinitialize={true}
                            onSubmit={(values) => HandleData(values)}
                          >
                            {(formik) => {
                              return (
                                <Form className=" mt-10 lg:mt-0 flex-auto mr-[25px] ml-[25px] sm:mr-[50px] sm:ml-[50px] lg:ml-[75px] py-10">
                                  <div>
                                    <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-2">
                                      <div>
                                        <label
                                          htmlFor="accountNo"
                                          className="block text-[13px] font-medium text-gray-700"
                                        >
                                          Account No.
                                        </label>
                                        <div className="mt-1">
                                          <Field
                                            id="accountNo"
                                            name="accountNo"
                                            type="number"
                                            placeholder="Enter Account No"
                                            className="block bg-white text-[#090415] w-full h-[48px] appearance-none rounded-lg border border-slate-300 px-3 py-2 placeholder-gray-400 placeholder:italic focus:border-slate-300 focus:outline-none focus:ring-slate-300 sm:text-[15px] font-medium"
                                          />
                                          <div style={{ color: "red" }}>
                                            <ErrorMessage
                                              name="accountNo"
                                              component="span"
                                              className="error text-[13px] font-medium leanding-[20px] text-red500"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="space-y-3 sm:space-x-[30px] mt-9 md:mt-[60px]">
                                    <button
                                      type="submit"
                                      // disabled={
                                      //   !(formik.isValid && formik.dirty)
                                      // }
                                      className={`bg-orange shadow-blue100  w-full sm:w-auto block sm:inline-block  focus:outline-none rounded-[4px] sm:rounded-lg py-3 px-[30px] font-semibold text-[15px] leading-[22px] text-white  `}
                                    >
                                      Save
                                    </button>
                                    <button
                                      type="button"
                                      className="text-[15px] w-full sm:w-auto block sm:inline-block border border-violet600 sm:border-none font-semibold text-violet600 sm:text-[#8A8A8A] rounded-[4px]  focus:outline-none py-3 px-[30px] sm:p-0"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </Form>
                              );
                            }}
                          </Formik>
                        </div>
                      </nav>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
      </div>
    </div>
  );
}
