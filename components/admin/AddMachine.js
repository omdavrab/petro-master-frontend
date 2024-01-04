import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage, useField } from "formik";
import { CloseLoader, OpenLoader } from "@/redux/action/loader";
import { toast } from "react-toastify";
import {
  GetMachine,
  HandleCreateMachine,
  HandleEditMachine,
} from "@/redux/action/machine";
import { GetTank } from "@/redux/action/tank";
import { RiErrorWarningFill } from "react-icons/ri";

const machineType = ["MDU", "DU"];

export default function AddMachine({ view, setView, editEmployee }) {
  const dispatch = useDispatch();
  const [inputFields, setInputFields] = useState([]);
  const TankList = useSelector((state) => state?.Tank?.tanklist?.data);

  const initialValues = {
    name: editEmployee ? editEmployee.name : "",
    type: editEmployee ? editEmployee.type : "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Tank Name is required"),
    type: Yup.string().required("Tank Type is required"),
  });

  useEffect(() => {
    setInputFields(editEmployee?.nozzles);
  }, [editEmployee]);

  useEffect(() => {
    dispatch(GetTank(1));
  }, []);

  const HandleData = async (values) => {
    try {
      dispatch(OpenLoader(true));
      values.nozzles = inputFields;
      await dispatch(
        editEmployee?._id
          ? HandleEditMachine(editEmployee._id, values)
          : HandleCreateMachine(values)
      )
        .then(async (result) => {
          if (result?.payload?.status === 201 || 200) {
            toast(result?.payload?.data.message, {
              hideProgressBar: true,
              autoClose: 3000,
              type: "success",
            });
            await dispatch(GetMachine(1));
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

  const HandleNozzle = async (value) => {
    console.log(value);
    if (value.type === "DU") {
      setInputFields(editEmployee?.nozzles || [{}, {}]);
    } else if (value.type === "MDU") {
      setInputFields(editEmployee?.nozzles || [{}, {}, {}, {}]);
    }
  };
  const handleChange = (index, evnt) => {
    const { name, value } = evnt.target;
    const list = [...inputFields];
    if (name === "tank") {
      const [tankName, tankId] = value.split("?id");
      list[index]["tank"] = tankName;
      list[index]["tankId"] = tankId;
    }
    if (name === "nozzle") {
      list[index]["nozzle"] = value;
    }
    setInputFields(list);
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
                        Add New Machine
                      </h2>
                    </div>
                    <div className="mt-7 custom-scrollbar min-h-[calc(100vh_-_5rem)] overflow-auto">
                      {!TankList?.length > 0 && (
                        <div className="flex gap-2">
                          <button className="hover:text-red-700  text-red-400 trnasition duration-200 ease-in outline-none focus:outline-none">
                            <RiErrorWarningFill className="text-[18px]" />
                          </button>
                          <h1 className="text-red-600">
                            Tank is not available please create Tank first.
                          </h1>
                        </div>
                      )}
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
                              React.useEffect(() => {
                                HandleNozzle(formik.values);
                                if (!formik.values.type) {
                                  setInputFields([]);
                                }
                              }, [formik.values]);

                              return (
                                <Form className=" mt-10 lg:mt-0 flex-auto mr-[25px] ml-[25px] sm:mr-[50px] sm:ml-[50px] lg:ml-[75px] py-10">
                                  <div>
                                    <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-2">
                                      <div>
                                        <label
                                          htmlFor="name"
                                          className="block text-[13px] font-medium text-gray-700"
                                        >
                                          Name
                                        </label>
                                        <div className="mt-1">
                                          <Field
                                            id="name"
                                            name="name"
                                            type="name"
                                            placeholder="Enter Machine Name"
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
                                      <div>
                                        <label
                                          htmlFor="type"
                                          className="block text-[13px] font-medium text-gray-700"
                                        >
                                          Machine Type
                                        </label>
                                        <div className="mt-1">
                                          <Field
                                            as="select"
                                            id="type"
                                            name="type"
                                            className="block bg-white text-[#090415] w-full h-[48px] appearance-none rounded-lg border border-slate-300 px-3 py-2 placeholder-gray-400 placeholder:italic focus:border-slate-300 focus:outline-none focus:ring-slate-300 sm:text-[15px] font-medium"
                                          >
                                            <option value="" disabled selected>
                                              Please select Machine Type
                                            </option>
                                            {machineType.length > 0 &&
                                              machineType?.map((item) => (
                                                <option key={item} value={item}>
                                                  {item}
                                                </option>
                                              ))}
                                          </Field>
                                          <div style={{ color: "red" }}>
                                            <ErrorMessage
                                              name="type"
                                              component="span"
                                              className="error text-[13px] font-medium leanding-[20px] text-red500"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      {inputFields?.length > 0 &&
                                        inputFields?.map((item, index) => {
                                          return (
                                            <>
                                              <div>
                                                <label
                                                  htmlFor={`nozzle${index + 1}`}
                                                  className="block text-[13px] font-medium text-gray-700"
                                                >
                                                  Nozzle {index + 1}
                                                </label>
                                                <div className="mt-1">
                                                  <Field
                                                    id={`nozzle${index + 1}`}
                                                    name="nozzle"
                                                    type="text"
                                                    placeholder={`Enter Nozzle ${
                                                      index + 1
                                                    }`}
                                                    value={item.nozzle}
                                                    className="block bg-white text-[#090415] w-full h-[48px] appearance-none rounded-lg border border-slate-300 px-3 py-2 placeholder-gray-400 placeholder:italic focus:border-slate-300 focus:outline-none focus:ring-slate-300 sm:text-[15px] font-medium"
                                                    onChange={(evnt) =>
                                                      handleChange(index, evnt)
                                                    }
                                                  />
                                                </div>
                                              </div>
                                              <div>
                                                <label
                                                  id={`tankName${index + 1}`}
                                                  className="block text-[13px] font-medium text-gray-700"
                                                >
                                                  Select Tank
                                                </label>
                                                <div className="mt-1">
                                                  <Field
                                                    as="select"
                                                    id={`tankName${index + 1}`}
                                                    name="tank"
                                                    value={item.tank}
                                                    className="block bg-white text-[#090415] w-full h-[48px] appearance-none rounded-lg border border-slate-300 px-3 py-2 placeholder-gray-400 placeholder:italic focus:border-slate-300 focus:outline-none focus:ring-slate-300 sm:text-[15px] font-medium"
                                                    onChange={(evnt) =>
                                                      handleChange(index, evnt)
                                                    }
                                                  >
                                                    <option
                                                      value=""
                                                      disabled
                                                      selected
                                                    >
                                                      Please select Tank Type
                                                    </option>
                                                    {TankList.length > 0 &&
                                                      TankList?.map(
                                                        (item, index) => {
                                                          const value =
                                                            item.name +
                                                            "?id" +
                                                            item._id;
                                                          return (
                                                            <option
                                                              key={index}
                                                              id={item._id}
                                                              value={value}
                                                            >
                                                              {item.name}
                                                            </option>
                                                          );
                                                        }
                                                      )}
                                                  </Field>
                                                  <div style={{ color: "red" }}>
                                                    <ErrorMessage
                                                      name="type"
                                                      component="span"
                                                      className="error text-[13px] font-medium leanding-[20px] text-red500"
                                                    />
                                                  </div>
                                                </div>
                                              </div>
                                            </>
                                          );
                                        })}
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
