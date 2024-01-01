import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage, useField } from "formik";
import {
  GetEmployee,
  HandleEditEmployee,
  HandleEmployeeCreate,
} from "@/redux/action/employee";
import { CloseLoader, OpenLoader } from "@/redux/action/loader";
import { toast } from "react-toastify";

const tab = [
  { name: "Recent History" },
  { name: "Recent Transaction" },
  { name: "Profile" },
];
const documentType = ["Aadhar Card"];

export default function AddEmployee({ view, setView, editEmployee }) {
  const dispatch = useDispatch();
  const Product = useSelector((state) => state?.Employee?.employeelist);
  const [page, setPage] = useState(1);
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);

  const initialValues = {
    name: editEmployee ? editEmployee.name : "",
    email: editEmployee ? editEmployee.email : "",
    phone: editEmployee ? editEmployee.phone : "",
    dob: editEmployee ? editEmployee.dob : "",
    doc_type: editEmployee ? editEmployee.doc_type : "",
    gender: editEmployee ? editEmployee.gender : "",
    address: editEmployee ? editEmployee.address : "",
    front: editEmployee?.image ? editEmployee.image.front : "",
    back: editEmployee?.image ? editEmployee.image.back : "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().required("Email is required"),
    phone: Yup.string().required("Phone Number is required").max(10).min(10),
    dob: Yup.string().required("DOB is required"),
    doc_type: Yup.string().required("Document Type is required"),
    gender: Yup.string().required("Gender is required"),
    address: Yup.string().required("Address is required"),
    front: Yup.string().required("Front Image is required"),
    back: Yup.string().required("Back Image is required"),
  });

  const HandleData = async (values) => {
    try {
      let formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      formData.append("dob", values.dob);
      formData.append("doc_type", values.doc_type);
      formData.append("gender", values.gender);
      formData.append("address", values.address);
      formData.append("front", frontImage);
      formData.append("back", backImage);

      dispatch(OpenLoader(true));
      await dispatch(
        editEmployee?._id
          ? HandleEditEmployee(editEmployee._id, formData)
          : HandleEmployeeCreate(formData)
      )
        .then(async (result) => {
          if (result?.payload?.status === 201) {
            toast(result?.payload?.data.message, {
              hideProgressBar: true,
              autoClose: 3000,
              type: "success",
            });
            await dispatch(GetEmployee(1));
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

  const MyTextArea = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <>
        <label htmlFor={props.id || props.name}>{label}</label>
        <textarea className="text-area" {...field} {...props} />
      </>
    );
  };

  return (
    <div>
      <div className="">
        {" "}
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
                        Add New Employee
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
                                            placeholder="Enter Employee Name"
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
                                          htmlFor="email"
                                          className="block text-[13px] font-medium text-gray-700"
                                        >
                                          Email
                                        </label>
                                        <div className="mt-1">
                                          <Field
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="Enter Employee email"
                                            className="block bg-white text-[#090415] w-full h-[48px] appearance-none rounded-lg border border-slate-300 px-3 py-2 placeholder-gray-400 placeholder:italic focus:border-slate-300 focus:outline-none focus:ring-slate-300 sm:text-[15px] font-medium"
                                          />
                                          <div style={{ color: "red" }}>
                                            <ErrorMessage
                                              name="email"
                                              component="span"
                                              className="error text-[13px] font-medium leanding-[20px] text-red500"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      <div>
                                        <label
                                          htmlFor="phone"
                                          className="block text-[13px] font-medium text-gray-700"
                                        >
                                          Phone Number
                                        </label>
                                        <div className="mt-1">
                                          <Field
                                            id="phone"
                                            name="phone"
                                            type="number"
                                            placeholder="Enter Employee Phone Number"
                                            className="block bg-white text-[#090415] w-full h-[48px] appearance-none rounded-lg border border-slate-300 px-3 py-2 placeholder-gray-400 placeholder:italic focus:border-slate-300 focus:outline-none focus:ring-slate-300 sm:text-[15px] font-medium"
                                          />
                                          <div style={{ color: "red" }}>
                                            <ErrorMessage
                                              name="phone"
                                              component="span"
                                              className="error text-[13px] font-medium leanding-[20px] text-red500"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      <div>
                                        <label
                                          htmlFor="dob"
                                          className="block text-[13px] font-medium text-gray-700"
                                        >
                                          DOB
                                        </label>
                                        <div className="mt-1">
                                          <Field
                                            id="dob"
                                            name="dob"
                                            type="date"
                                            className="block bg-white text-[#090415] w-full h-[48px] appearance-none rounded-lg border border-slate-300 px-3 py-2 placeholder-gray-400 placeholder:italic focus:border-slate-300 focus:outline-none focus:ring-slate-300 sm:text-[15px] font-medium"
                                          />
                                          <div style={{ color: "red" }}>
                                            <ErrorMessage
                                              name="dob"
                                              component="span"
                                              className="error text-[13px] font-medium leanding-[20px] text-red500"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      <div>
                                        <label
                                          htmlFor="doc_type"
                                          className="block text-[13px] font-medium text-gray-700"
                                        >
                                          Document Type
                                        </label>
                                        <div className="mt-2">
                                          <Field
                                            as="select"
                                            id="doc_type"
                                            name="doc_type"
                                            className="block bg-white text-[#090415] w-full h-[48px] appearance-none rounded-lg border border-slate-300 px-3 py-2 placeholder-gray-400 placeholder:italic focus:border-slate-300 focus:outline-none focus:ring-slate-300 sm:text-[15px] font-medium"
                                          >
                                            <option value="" disabled selected>
                                              Please select Document Type
                                            </option>
                                            {documentType.length > 0 &&
                                              documentType?.map((item) => (
                                                <option key={item} value={item}>
                                                  {item}
                                                </option>
                                              ))}
                                          </Field>
                                          <div style={{ color: "red" }}>
                                            <ErrorMessage
                                              name="doc_type"
                                              component="span"
                                              className="error text-[13px] font-medium leanding-[20px] text-red500"
                                            />
                                          </div>
                                        </div>
                                      </div>

                                      <div className="">
                                        <h3 className="block text-[13px] font-medium text-gray-700">
                                          Gender
                                        </h3>
                                        <div className="flex items-center mt-3 gap-6">
                                          <div className="flex items-center gap-2 mr-6">
                                            <Field
                                              type="radio"
                                              id="male"
                                              name="gender"
                                              value="male"
                                              className="dark:checked:bg-orange checked:bg-orange cursor-pointer dark:bg-[#20304c] dark:checked:hover:bg-orange checked:hover:bg-orange dark:checked:active:bg-orange checked:active:bg-orange checked:focus:bg-orange focus:bg-orange focus:outline-none focus:ring-1 focus:ring-orange"
                                            />
                                            <label
                                              htmlFor="male"
                                              className="block font-bold text-[14px] md:text-[16px] leading-6 text-gray500"
                                            >
                                              Male
                                            </label>
                                          </div>
                                          <div className="flex items-center gap-2">
                                            <Field
                                              type="radio"
                                              id="female"
                                              name="gender"
                                              value="female"
                                              className="dark:checked:bg-orange checked:bg-orange cursor-pointer dark:bg-[#20304c] dark:checked:hover:bg-orange checked:hover:bg-orange dark:checked:active:bg-orange checked:active:bg-orange checked:focus:bg-orange focus:bg-orange focus:outline-none focus:ring-1 focus:ring-orange"
                                            />
                                            <label
                                              htmlFor="female"
                                              className="block font-bold text-[14px] md:text-[16px] leading-6 text-gray500"
                                            >
                                              Female
                                            </label>
                                          </div>
                                        </div>
                                        <div style={{ color: "red" }}>
                                          <ErrorMessage
                                            name="gender"
                                            component="span"
                                            className="error text-[13px] font-medium leanding-[20px] text-red500"
                                          />
                                        </div>
                                      </div>
                                      <div>
                                        <label
                                          htmlFor="address"
                                          className="block text-[13px] font-medium text-gray-700"
                                        >
                                          Address
                                        </label>
                                        <div className="mt-1">
                                          <MyTextArea
                                            name="address"
                                            id="address"
                                            rows="4"
                                            className="block bg-white text-[#090415] w-full appearance-none rounded-lg border border-slate-300 px-3 py-2 placeholder-gray-400 placeholder:italic focus:border-slate-300 focus:outline-none focus:ring-slate-300 sm:text-[15px] font-medium"
                                            placeholder="Enter Employee Address."
                                          />

                                          <div style={{ color: "red" }}>
                                            <ErrorMessage
                                              name="address"
                                              component="span"
                                              className="error text-[13px] font-medium leanding-[20px] text-red500"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      <div></div>
                                      <div className="">
                                        <label className="block mb-1 text-[13px] font-medium text-gray-700">
                                          Upload Front Document Image
                                        </label>
                                        <label
                                          for="dropzone-file"
                                          className="flex flex-col items-center justify-center w-full h-30 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                                        >
                                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg
                                              class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                              aria-hidden="true"
                                              xmlns="http://www.w3.org/2000/svg"
                                              fill="none"
                                              viewBox="0 0 20 16"
                                            >
                                              <path
                                                stroke="currentColor"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                              />
                                            </svg>
                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                              <span className="font-semibold">
                                                Click to upload
                                              </span>
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                              SVG, PNG, JPG or GIF (MAX.
                                              800x400px)
                                            </p>
                                          </div>
                                          <input
                                            id="dropzone-file"
                                            name="front"
                                            type="file"
                                            className="hidden"
                                            onChange={(e) => {
                                              formik.setFieldValue(
                                                "front",
                                                e.currentTarget.files[0].name
                                              );
                                              setFrontImage(
                                                e.currentTarget.files[0]
                                              );
                                            }}
                                          />
                                        </label>
                                        <div style={{ color: "red" }}>
                                          <ErrorMessage
                                            name="front"
                                            component="span"
                                            className="error text-[13px] font-medium leanding-[20px] text-red500"
                                          />
                                        </div>
                                      </div>
                                      <div className="">
                                        <label className="block mb-1 text-[13px] font-medium text-gray-700">
                                          Upload Back Document Image
                                        </label>
                                        <label
                                          for="dropzone"
                                          className="flex flex-col items-center justify-center w-full h-30 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                                        >
                                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg
                                              class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                              aria-hidden="true"
                                              xmlns="http://www.w3.org/2000/svg"
                                              fill="none"
                                              viewBox="0 0 20 16"
                                            >
                                              <path
                                                stroke="currentColor"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                              />
                                            </svg>
                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                              <span className="font-semibold">
                                                Click to upload
                                              </span>
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                              SVG, PNG, JPG or GIF (MAX.
                                              800x400px)
                                            </p>
                                          </div>
                                          <input
                                            id="dropzone"
                                            type="file"
                                            name="back"
                                            className="hidden"
                                            onChange={(e) => {
                                              formik.setFieldValue(
                                                "back",
                                                e.currentTarget.files[0].name
                                              );
                                              setBackImage(
                                                e.currentTarget.files[0]
                                              );
                                            }}
                                          />
                                        </label>
                                        <div style={{ color: "red" }}>
                                          <ErrorMessage
                                            name="back"
                                            component="span"
                                            className="error text-[13px] font-medium leanding-[20px] text-red500"
                                          />
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
