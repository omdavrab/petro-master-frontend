import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string().required("Email Id is required!").email(),
    password: Yup.string().required("Must be at least 4 characters.").min(4),
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (values) => {};
  return (
    <div className=" min-h-screen grid bg-white lg:grid-cols-2 lg:col-rows-1">
      <div className="hidden lg:flex items-center after:top-0 after:bottom-0  ">
        <img
          className="h-full w-full"
          src="/assets/login.svg"
          alt="Branding&Lifestyle"
        />
      </div>
      <div className="flex  flex-col justify-center items-center px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-[134px]">
        <div className="mx-auto w-full ">
          <div>
            <h2 className="mt-6 text-xl font-semibold tracking-tight text-dark900">
              Welcome Back!
            </h2>
            <p className="mt-2 text-[15px] font-medium text-gray800">
              We’re happy to see you again. To use your account, login first
            </p>
          </div>
          <div className="mt-14">
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
                  <Form className="" action="#" method="POST">
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
                          placeholder="Enter your email"
                          className="block bg-white text-[#090415] w-full h-[48px] appearance-none rounded border border-slate-300 px-3 py-2 placeholder-gray-400 placeholder:italic focus:border-slate-300 focus:outline-none focus:ring-slate-300 sm:text-[15px] font-medium"
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
                    <div className="mt-5">
                      <label
                        htmlFor="password"
                        className="block text-[13px] font-medium text-gray-700"
                      >
                        Password
                      </label>
                      <div className="mt-1 relative">
                        <Field
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          className="block bg-white text-[#090415] w-full h-[48px] appearance-none rounded border border-slate-300 px-3 pr-10 py-2 placeholder-gray-400 placeholder:italic focus:border-slate-300 focus:outline-none focus:ring-slate-300 sm:text-[15px] font-medium"
                        />
                        <div style={{ color: "red" }}>
                          <ErrorMessage
                            name="password"
                            component="span"
                            className="error text-[13px] font-medium leanding-[20px] text-red500"
                          />
                        </div>

                        <button
                          className="absolute right-0  top-0 h-[48px]  px-3 py-2"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          <img
                            className=""
                            src={
                              showPassword
                                ? "/assets/icons/eye.svg"
                                : "/assets/icons/view-off.svg"
                            }
                          />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center mt-[18px] justify-between">
                      <div className="flex items-center">
                        <input
                          id="remember-me"
                          name="remember-me"
                          type="checkbox"
                          className="h-4 bg-white w-4  rounded-[2.8px] accent-violet600 border-gray-300 text-orange focus:ring-0"
                        />
                        <label
                          htmlFor="remember-me"
                          className="ml-2 block font-medium text-sm text-gray800"
                        >
                          Remember me
                        </label>
                      </div>
                      <div>
                        <Link
                          href="/admin/forgotpassword"
                          className="font-medium text-violet600 hover:text-indigo-500"
                        >
                          Forgot Password?
                        </Link>
                      </div>
                    </div>
                    <div className="mt-12">
                      <button
                        type="submit"
                        className="flex w-full justify-center rounded border border-transparent bg-orange py-3 px-4 text-[15px] font-semibold text-white shadow-sm  focus:outline-none focus:ring-0 "
                      >
                        Login
                      </button>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
          <div className="mt-8 text-center">
            <span className="text-[15px] font-medium text-gray800">
              Don’t have an account?
              <Link
                href="/admin/register"
                className="text-[15px] font-medium text-violet600"
              >
                {" "}
                Create Account
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
