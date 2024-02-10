import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage, useField } from "formik";
import { formatCurrency } from "@/utils/formatCurrency";

export default function Coine({ open, setOpen, collection, setCollection }) {
  const initialValues = {
    cash: "",
    coine: "",
  };
  const validationSchema = Yup.object({
    cash: Yup.string().required(),
  });
  const cancelButtonRef = useRef(null);
  const [totalCash, setTotalCash] = useState();

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <Formik
                      initialValues={initialValues}
                      validationSchema={validationSchema}
                      enableReinitialize={true}
                      onSubmit={(value) => {
                        setOpen(false);
                      }}
                    >
                      {(formik) => {
                        useEffect(() => {
                          const cash = parseFloat(formik.values.cash) || 0;
                          const coine = parseFloat(formik.values.coine) || 0;
                          const total = cash + coine;
                          setTotalCash(total);
                          setCollection({
                            ...collection,
                            totalCash: total,
                            cash: cash,
                            coine: coine,
                          });
                        }, [formik.values.cash, formik.values.coine]);
                        return (
                          <Form>
                            <div>
                              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-2">
                                <div>
                                  <label
                                    htmlFor="cash"
                                    className="block text-[13px] font-medium text-gray-700"
                                  >
                                    Cash
                                  </label>
                                  <div className="mt-1">
                                    <Field
                                      id="cash"
                                      name="cash"
                                      type="number"
                                      placeholder="Cash"
                                      className="block bg-white text-[#090415] w-full h-[48px] appearance-none rounded-lg border border-slate-300 px-3 py-2 placeholder-gray-400 placeholder:italic focus:border-slate-300 focus:outline-none focus:ring-slate-300 sm:text-[15px] font-medium"
                                    />
                                  </div>
                                  <div style={{ color: "red" }}>
                                    <ErrorMessage
                                      name="cash"
                                      component="span"
                                      className="error text-[13px] font-medium leanding-[20px] text-red500"
                                    />
                                  </div>
                                </div>
                                <div>
                                  <label
                                    htmlFor="coine"
                                    className="block text-[13px] font-medium text-gray-700"
                                  >
                                    Coine
                                  </label>
                                  <div className="mt-1">
                                    <Field
                                      id="coine"
                                      name="coine"
                                      type="number"
                                      placeholder="Coine"
                                      className="block bg-white text-[#090415] w-full h-[48px] appearance-none rounded-lg border border-slate-300 px-3 py-2 placeholder-gray-400 placeholder:italic focus:border-slate-300 focus:outline-none focus:ring-slate-300 sm:text-[15px] font-medium"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-[20px]">
                                {formatCurrency(totalCash)}
                              </span>
                              <div className="sm:flex gap-4 sm:flex-row-reverse pt-2">
                                <button
                                  type="submit"
                                  className={`bg-orange shadow-blue100 w-full sm:w-auto block sm:inline-block  focus:outline-none rounded-[4px] sm:rounded-lg py-3 px-[30px] font-semibold text-[15px] leading-[22px] text-white  `}
                                >
                                  Save
                                </button>
                                <button
                                  type="button"
                                  className="text-[15px] w-full sm:w-auto block sm:inline-block border border-violet600 sm:border-none font-semibold text-violet600 sm:text-[#8A8A8A] rounded-[4px]  focus:outline-none py-3 px-[30px] sm:p-0"
                                  onClick={() => {
                                    setOpen(false);
                                    setCollection({
                                      ...collection,
                                      totalCash: 0,
                                    });
                                  }}
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          </Form>
                        );
                      }}
                    </Formik>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
