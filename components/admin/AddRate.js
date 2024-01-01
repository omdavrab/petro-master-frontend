import React from "react";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Formik, Form, Field, ErrorMessage, useField } from "formik";
import * as Yup from "yup";
import { GetRate, HandleCreateRate, HandleEditRate } from "@/redux/action/rate";
import { CloseLoader, OpenLoader } from "@/redux/action/loader";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

const AddRate = ({ open, setOpen, editrate }) => {
  const dispatch = useDispatch();
  const initialValues = {
    date: editrate ? editrate.date : "",
    msRate: editrate ? editrate.msRate : "",
    hsdRate: editrate ? editrate.hsdRate : "",
  };

  const validationSchema = Yup.object({
    date: Yup.string().required("Date is required"),
    msRate: Yup.string().required("MS Rate is required"),
    hsdRate: Yup.string().required("HSD Rate is required"),
  });

  const HandleData = async (values) => {
    try {
      dispatch(OpenLoader(true));
      await dispatch(
        editrate?._id
          ? HandleEditRate(editrate._id, values)
          : HandleCreateRate(values)
      )
        .then(async (result) => {
          if (result?.payload?.status === 201 || 200) {
            toast(result?.payload?.data.message, {
              hideProgressBar: true,
              autoClose: 3000,
              type: "success",
            });
            await dispatch(GetRate(1));
            setOpen(false);
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
                    Add Today Rate
                  </Dialog.Title>
                  <div className="px-4 py-4 space-y-3">
                    <Formik
                      initialValues={initialValues}
                      validationSchema={validationSchema}
                      enableReinitialize={true}
                      onSubmit={(values) => HandleData(values)}
                    >
                      {(formik) => {
                        return (
                          <Form>
                            <div className="flex mb-6 items-center grid grid-cols-3">
                              <span className="col-span-1 dark:text-gray-100 text-[14px] text-gray-700">
                                Date
                              </span>
                              <div className="col-span-2">
                                <Field
                                  id="date"
                                  name="date"
                                  type="Date"
                                  className="block  w-full text-[14px] py-1.5 px-6 text-[#6e6e6e] rounded-md border border-[#f0f1f5] focus:border-orange transition duration-300 focus:outline-none focus:ring-0  shadow-none rounded-md bg-white dark:text-gray-300 dark:bg-[#20304c]"
                                />
                                <div style={{ color: "red" }}>
                                  <ErrorMessage
                                    name="date"
                                    component="span"
                                    className="error text-[13px] font-medium leanding-[20px] text-red500"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="flex mb-6 items-center grid grid-cols-3">
                              <span className="col-span-1 dark:text-gray-100 text-[14px] text-gray-700">
                                MS Rate
                              </span>
                              <div className="col-span-2">
                                <Field
                                  id="msRate"
                                  name="msRate"
                                  type="number"
                                  placeholder="Enter MS Rate"
                                  className="block  w-full text-[14px] py-1.5 px-6 text-[#6e6e6e] rounded-md border border-[#f0f1f5] focus:border-orange transition duration-300 focus:outline-none focus:ring-0  shadow-none rounded-md bg-white dark:text-gray-300 dark:bg-[#20304c]"
                                />
                                <div style={{ color: "red" }}>
                                  <ErrorMessage
                                    name="msRate"
                                    component="span"
                                    className="error text-[13px] font-medium leanding-[20px] text-red500"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="flex mb-6 items-center grid grid-cols-3">
                              <span className="col-span-1 dark:text-gray-100 text-[14px] text-gray-700">
                                HSD Rate
                              </span>
                              <div className="col-span-2">
                                <Field
                                  id="hsdRate"
                                  name="hsdRate"
                                  type="number"
                                  placeholder="Enter HSD Rate"
                                  className="block  w-full text-[14px] py-1.5 px-6 text-[#6e6e6e] rounded-md border border-[#f0f1f5] focus:border-orange transition duration-300 focus:outline-none focus:ring-0  shadow-none rounded-md bg-white dark:text-gray-300 dark:bg-[#20304c]"
                                />
                                <div style={{ color: "red" }}>
                                  <ErrorMessage
                                    name="hsdRate"
                                    component="span"
                                    className="error text-[13px] font-medium leanding-[20px] text-red500"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="flex justify-end">
                              <button
                                type="submit"
                                className="bg-orange text-white px-4 py-2.5 rounded"
                              >
                                Save
                              </button>
                            </div>
                          </Form>
                        );
                      }}
                    </Formik>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default AddRate;
