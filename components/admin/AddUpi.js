import React, { useEffect } from "react";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Formik, Form, Field, ErrorMessage, useField } from "formik";
import * as Yup from "yup";
import { CloseLoader, OpenLoader } from "@/redux/action/loader";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { GetBank } from "@/redux/action/bank";
import { GetUpi, HandleCreateUpi, HandleEditUpi } from "@/redux/action/upi";

const AddUpi = ({ open, setOpen, editEmployee }) => {
  console.log("🚀 ~ AddUpi ~ editEmployee:", editEmployee)
  const dispatch = useDispatch();
  const BankList = useSelector((state) => state?.Bank?.banklist?.data);
  const [customersData, setCustomersData] = useState({});

  const initialValues = {
    bank: editEmployee ? editEmployee.bank : "",
    name: editEmployee ? editEmployee.name : "",
  };

  const validationSchema = Yup.object({
    bank: Yup.string().required("Bank is required"),
    name: Yup.string().required("Name is required"),
  });

  const HandleData = async (values) => {
    try {
      dispatch(OpenLoader(true));
      const [id, bankname] = values.bank.split(",");
      if(!editEmployee?._id){
        values.bank = bankname
        values.bankId = id
      }
      await dispatch(
        editEmployee?._id
          ? HandleEditUpi(editEmployee._id, values)
          : HandleCreateUpi(values)
      )
        .then(async (result) => {
          if (
            result?.payload?.status === 201 ||
            result?.payload?.status === 200
          ) {
            toast(result?.payload?.data.message, {
              hideProgressBar: true,
              autoClose: 3000,
              type: "success",
            });
            await dispatch(GetUpi('all'));
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

  useEffect(() => {
    dispatch(GetBank("all"));
  }, []);

  useEffect(() => {
    setCustomersData(BankList);
  }, [BankList]);

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
                    Add New UPI
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
                            <div className="mb-6 gap-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-2">
                              <div className="">
                                <label
                                  htmlFor="price"
                                  className="block text-[13px] font-medium text-gray-700"
                                >
                                  Bank
                                </label>
                                <div className="mt-1">
                                  <Field
                                    as="select"
                                    id="bank"
                                    name="bank"
                                    className="block bg-white text-[#090415] w-full h-[48px] appearance-none rounded-lg border border-slate-300 px-3 py-2 placeholder-gray-400 placeholder:italic focus:border-slate-300 focus:outline-none focus:ring-slate-300 sm:text-[15px] font-medium"
                                  >
                                    <option value="" disabled selected>
                                      Please select Bank
                                    </option>

                                    {customersData.length > 0 &&
                                      customersData?.map((item, index) => {
                                        const value = `${item._id},${item.bankName}`;
                                        return (
                                          <option key={index} value={value}>
                                            {item.bankName}
                                          </option>
                                        );
                                      })}
                                  </Field>
                                  <div style={{ color: "red" }}>
                                    <ErrorMessage
                                      name="bank"
                                      component="span"
                                      className="error text-[13px] font-medium leanding-[20px] text-red500"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="">
                                <div>
                                  <label
                                    htmlFor="name"
                                    className="block text-[13px] font-medium text-gray-700"
                                  >
                                    Machine ID
                                  </label>
                                  <div className="mt-1">
                                    <Field
                                      id="name"
                                      name="name"
                                      type="text"
                                      className="block bg-white text-[#090415] w-full h-[48px] appearance-none rounded-lg border border-slate-300 px-3 py-2 placeholder-gray-400 placeholder:italic focus:border-slate-300 focus:outline-none focus:ring-slate-300 sm:text-[15px] font-medium"
                                    />
                                    <div style={{ color: "red" }}>
                                      <ErrorMessage
                                        name="name"
                                        component="span"
                                        className="error text-[13px] font-medium leanding-[20px] text-red500"
                                      />
                                    </div>
                                  </div>
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

export default AddUpi;
