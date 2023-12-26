import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";

const ForgotPassword = () => {
  const router = useRouter();
  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().required("Email Id is required!").email(),
  });
  return (
    <div className=" min-h-screen grid bg-white lg:grid-cols-2 lg:col-rows-1">
      <div className="hidden lg:flex items-center after:top-0 after:bottom-0 after:opacity-60 after:left-0 after:right-0">
        <img
          className="h-full w-full"
          src="/assets/login.svg"
          alt="Branding&Lifestyle"
        />
      </div>
      <div className="flex  flex-col justify-center items-center px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-[134px]">
        <div className="mx-auto w-full ">
          <div>
            <h2 className="mt-6 text-xl font-semibold tracking-tight text-dark900 text-center">
              Forgot Password
            </h2>
            <p className="mt-2 text-[15px] font-medium text-gray800">
              Enter the email associated with your account and we’ll send a code
              with instruction to reset your password.
            </p>
          </div>
          <div className="mt-[60px]">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              enableReinitialize={true}
              onSubmit={(values) => {
                router.push("/admin/verification");
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
                          className="block bg-white w-full h-[48px] focus:bg-white text-[#090415] appearance-none rounded border border-slate-300 px-3 py-2 placeholder-gray-400 placeholder:italic focus:border-slate-300 focus:outline-none focus:ring-slate-300 sm:text-[15px] font-medium"
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
                    <div className="mt-[60px]">
                      <button
                        type="submit"
                        className="flex w-full justify-center rounded border border-transparent bg-orange py-3 px-4 text-[15px] font-semibold text-white shadow-sm  focus:outline-none focus:ring-0 "
                      >
                        Submit
                      </button>
                    </div>
                    <div className="flex justify-center mt-[75px]">
                      <button
                        onClick={() => router.back()}
                        className="text-violet600 flex font-medium text-[15px] leanding-[22px]"
                      >
                        <img
                          src="/assets/icons/arrow-right.svg"
                          className="mr-4"
                        />
                        Back
                      </button>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
