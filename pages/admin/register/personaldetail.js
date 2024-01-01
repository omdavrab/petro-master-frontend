import Link from "next/link";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, useField } from "formik";
import * as Yup from "yup";
import { Fragment, useRouter } from "next/router";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import { HandleSignUp } from "@/redux/action/auth";
import { CloseLoader, OpenLoader } from "@/redux/action/loader";
import { toast } from "react-toastify";

export default function Personaldetail() {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.SignUpStateData);
  const [image, setImage] = useState();
  const router = useRouter();
  const initialValues = {
    phone: "",
    gstnumber: "",
    vatnumber: "",
    tinnumber: "",
    udhyamnumber: "",
    address: "",
  };

  const validationSchema = Yup.object({
    phone: Yup.string().required("Phone Number is required!").min(10),
    gstnumber: Yup.string().required("GST Number is required!"),
    vatnumber: Yup.string().required("Vat Number is required!"),
    tinnumber: Yup.string().required("Tin Number is required!"),
    udhyamnumber: Yup.string().required("Udhyam Number is required!"),
    address: Yup.string().required("Address is required!"),
  });

  const handleBack = () => {
    router.back();
  };

  const handleSubmit = async (values) => {
    dispatch(OpenLoader(true));
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("image", image);
    formData.append("phone", values.phone);
    formData.append("gstnumber", values.gstnumber);
    formData.append("vatnumber", values.vatnumber);
    formData.append("tinnumber", values.tinnumber);
    formData.append("udhyamnumber", values.udhyamnumber);
    formData.append("address", values.address);
    await dispatch(HandleSignUp(formData))
      .then((result) => {
        if (result?.payload?.status === 200) {
          toast(result?.payload?.data.message, {
            hideProgressBar: true,
            autoClose: 3000,
            type: "success",
          });
          router.push("/admin/register/verification");
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
    <div className=" min-h-screen grid bg-white lg:grid-cols-2 lg:col-rows-1">
      <div className="hidden lg:flex items-center after:top-0 after:bottom-0 after:opacity-60 after:left-0 after:right-0 ">
        <img className="h-full w-full" src="/assets/login.svg" alt="Branding" />
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        {(formik) => {
          return (
            <Form action="#" method="POST" className=" h-screen overflow-auto">
              <div className=" flex-col py-12">
                <div className="flex  flex-col justify-center items-center flex-1 ">
                  <div className="mx-auto w-full ">
                    <div className="text-center">
                      <p className=" text-[13px] font-medium text-gray600">
                        Step 1
                      </p>
                      <h2 className=" mt-2 text-xl font-semibold tracking-tight text-dark900">
                        Personal Details
                      </h2>
                    </div>
                    <div className="mt-8">
                      {!image ? (
                        <div className="h-[148px] w-[148px] rounded-full bg-upload-img mx-auto flex justify-center items-center">
                          <img src="/assets/icons/camera.svg" />
                        </div>
                      ) : (
                        <div className="h-[148px] w-[148px] rounded-full shadow-dark15 mx-auto flex justify-center items-center bg-white p-1">
                          <img
                            src={URL.createObjectURL(image)}
                            alt="image"
                            className="w-full h-full rounded-full"
                          />
                        </div>
                      )}

                      <div className="flex">
                        <input
                          type="file"
                          id="image"
                          className="hidden"
                          onChange={(e) => setImage(e.target.files[0])}
                          accept="image/*"
                        />
                        <label
                          htmlFor="image"
                          className="flex bg-gray50 rounded-[6px] mt-7 mx-auto py-[8.5px] px-[12.6px]  items-center text-[15.8px] font-semibold text-gray700"
                        >
                          <img
                            src="/assets/icons/upload.svg"
                            className="mr-1"
                          />
                          Upload Your Profile Photo
                        </label>
                      </div>
                    </div>

                    <div className="space-y-5 mt-[52px] px-4 sm:px-6  lg:px-20 xl:px-[134px]">
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-[13px] font-medium text-gray700"
                        >
                          Phone
                        </label>
                        <div className="mt-1">
                          <Field
                            id="phone"
                            name="phone"
                            placeholder="Enter Your Phone Number."
                            type="number"
                            className="block bg-white text-[#090415] w-full h-[48px] appearance-none rounded border border-slate-300 px-3 py-2 placeholder-gray-400 placeholder:italic focus:border-slate-300 focus:outline-none focus:ring-slate-300 sm:text-[15px] font-medium"
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
                          htmlFor="gstnumber"
                          className="block text-[13px] font-medium text-gray700"
                        >
                          GST Number
                        </label>
                        <div className="mt-1">
                          <Field
                            id="gstnumber"
                            name="gstnumber"
                            placeholder="Enter Your GST Number."
                            type="text"
                            className="block  bg-white text-[#090415] w-full h-[48px] appearance-none rounded border border-slate-300 px-3 py-2 placeholder-gray-400 placeholder:italic focus:border-slate-300 focus:outline-none focus:ring-slate-300 sm:text-[15px] font-medium"
                          />
                          <div style={{ color: "red" }}>
                            <ErrorMessage
                              name="gstnumber"
                              component="span"
                              className="error text-[13px] font-medium leanding-[20px] text-red500"
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="vatnumber"
                          className="block text-[13px] font-medium text-gray700"
                        >
                          Vat Number
                        </label>
                        <div className="mt-1">
                          <Field
                            id="vatnumber"
                            name="vatnumber"
                            placeholder="Enter Your Vat Number."
                            type="text"
                            className="block bg-white text-[#090415] w-full h-[48px] appearance-none rounded border border-slate-300 px-3 py-2 placeholder-gray-400 placeholder:italic focus:border-slate-300 focus:outline-none focus:ring-slate-300 sm:text-[15px] font-medium"
                          />
                          <div style={{ color: "red" }}>
                            <ErrorMessage
                              name="vatnumber"
                              component="span"
                              className="error text-[13px] font-medium leanding-[20px] text-red500"
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="tinnumber"
                          className="block text-[13px] font-medium text-gray700"
                        >
                          Tin Number
                        </label>
                        <div className="mt-1">
                          <Field
                            id="tinnumber"
                            name="tinnumber"
                            placeholder="Enter Your Tin Number."
                            type="text"
                            className="block bg-white text-[#090415] w-full h-[48px] appearance-none rounded border border-slate-300 px-3 py-2 placeholder-gray-400 placeholder:italic focus:border-slate-300 focus:outline-none focus:ring-slate-300 sm:text-[15px] font-medium"
                          />
                          <div style={{ color: "red" }}>
                            <ErrorMessage
                              name="tinnumber"
                              component="span"
                              className="error text-[13px] font-medium leanding-[20px] text-red500"
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="udhyamnumber"
                          className="block text-[13px] font-medium text-gray700"
                        >
                          Udhyam Number
                        </label>
                        <div className="mt-1">
                          <Field
                            id="udhyamnumber"
                            name="udhyamnumber"
                            placeholder="Enter Your Udhyam Number."
                            type="text"
                            className="block bg-white text-[#090415] w-full h-[48px] appearance-none rounded border border-slate-300 px-3 py-2 placeholder-gray-400 placeholder:italic focus:border-slate-300 focus:outline-none focus:ring-slate-300 sm:text-[15px] font-medium"
                          />
                          <div style={{ color: "red" }}>
                            <ErrorMessage
                              name="udhyamnumber"
                              component="span"
                              className="error text-[13px] font-medium leanding-[20px] text-red500"
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="address"
                          className="block text-[13px] font-medium text-gray700"
                        >
                          Address
                        </label>
                        <div className="mt-1">
                          <MyTextArea
                            name="address"
                            id="address"
                            rows="4"
                            className="block bg-white text-[#090415] w-full appearance-none rounded border border-slate-300 px-3 py-2 placeholder-gray-400 placeholder:italic focus:border-slate-300 focus:outline-none focus:ring-slate-300 sm:text-[15px] font-medium"
                            placeholder="Enter your Address."
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
                    </div>
                  </div>
                </div>
                <div className="flex px-[60px] mt-20  justify-between">
                  <button
                    type="button"
                    className="flex justify-center rounded border border-transparent bg-transparent  py-3 px-[20px] text-[15px] flex items-center font-semibold text-violet600 focus:outline-none focus:ring-0 "
                    onClick={handleBack}
                  >
                    <img src="/assets/icons/left.svg" className="mr-3.5" /> Back
                  </button>

                  <button
                    type="submit"
                    className="flex justify-center rounded border border-transparent bg-orange py-3 px-[30px] text-[15px] font-semibold text-white shadow-sm  focus:outline-none focus:ring-0 "
                  >
                    Create Account
                  </button>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
