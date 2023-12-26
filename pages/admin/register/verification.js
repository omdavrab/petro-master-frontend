import { HandleVerifyOTP } from "@/redux/action/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../components/admin/Loader";
import { CloseLoader, OpenLoader } from "@/redux/action/loader";
import { toast } from "react-toastify";

const Verification = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [OTP, setOTP] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [seconds, setSeconds] = useState(60);
  const SignUPUser = useSelector((state) => state.SignUp.user);

  const handleChange = (OTP) => {
    setOTP(OTP);
  };

  useEffect(() => {
    let timer = null;
    if (isActive) {
      timer = setInterval(() => {
        if (seconds !== 0) {
          setSeconds((seconds) => seconds - 1);
        } else if (seconds === 0) {
          setIsActive(false);
          setSeconds(60);
        }
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    };
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      otp: OTP,
      email: SignUPUser?.user?.email,
    };
    dispatch(OpenLoader(true));
    await dispatch(HandleVerifyOTP(data))
      .then((result) => {
        if (result?.payload?.status === 200) {
          toast(result?.payload?.data.message, {
            hideProgressBar: true,
            autoClose: 3000,
            type: "success",
          });
          router.push("/admin/restaurant-detail");
          dispatch(CloseLoader(false));
        } else {
          dispatch(CloseLoader(false));
          toast(result?.payload?.response?.data.message, {
            hideProgressBar: true,
            autoClose: 3000,
            type: "error",
          });
        }
        // if (result?.payload?.response?.status !== 200) {
        //   console.log("IF")
        //   dispatch(OpenLoader(true));
        //   setTimeout(() => {
        //     dispatch(CloseLoader(false));
        //   }, 1000);
        //   toast(result?.payload?.response?.data.message, {
        //     hideProgressBar: true,
        //     autoClose: 3000,
        //     type: "error",
        //   });
        // } else {
        //   console.log("ELSE")
        //   toast(result?.payload?.data.message, {
        //     hideProgressBar: true,
        //     autoClose: 3000,
        //     type: "success",
        //   });
        //   router.push("/admin/restaurant-detail");
        //   dispatch(OpenLoader(true));
        //   setTimeout(() => {
        //     dispatch(CloseLoader(false));
        //   }, 2000);
        // }
      })
      .catch((err) => {
        console.log(err, "SignUP ERROR");
      });
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f1f1f1]">
      <div className="mx-auto w-full bg-white shadow-box max-w-lg  p-5 md:px-[56px] md:py-10">
        <div className="flex  flex-col justify-center items-center lg:flex-none">
          <div className="mx-auto w-full ">
            <Image
              src="/assets/icons/Email campaign-amico.png"
              className="w-full mx-auto max-w-[70%]"
              height={500}
              width={500}
              alt="Email campaign-amico"
            />

            <div>
              <h2 className="text-black/[70%] text-xl font-semibold tracking-tight text-center">
                OTP Verification
              </h2>
              <p className="mt-4 text-center text-[15px] font-medium text-black/[70%]">
                We’ve sent the verification code to the email{" "}
                <span className="font-semibold">
                  {SignUPUser && SignUPUser?.user?.email}
                </span>{" "}
                provided.
              </p>
            </div>
            <div className="mt-5">
              <form
                className=""
                action="#"
                method="POST"
                onSubmit={handleSubmit}
              >
                <div>
                  <div className="mt-1 flex justify-center space-x-[33px]">
                    <OTPInput
                      isInputNum
                      containerStyle=" flex justify-center space-x-[20px]"
                      value={OTP}
                      inputStyle="h-[50px_!important] text-center w-[50px_!important] appearance-none rounded-lg bg-orange/[2%] border  px-3 py-2 focus:border-orange focus:outline-none focus:ring-slate-300 sm:text-[25px] font-medium text-dark700"
                      onChange={handleChange}
                      numInputs={4}
                      renderInput={(props) => <input {...props} />}
                      renderSeparator={<span>-</span>}
                    />
                  </div>
                </div>
                <div className="text-center mt-[30px]">
                  <span className="text-medium text-[15px] text-black/[70%] leanding-[22px]">
                    Do not receive the code?{" "}
                    <button
                      onClick={() => {
                        setIsActive(true);
                      }}
                      type="button"
                      className="font-semibold outline-none text-orange cursor-pointer"
                    >
                      Send again
                    </button>
                  </span>
                </div>
                {isActive && (
                  <div className="mt-[20px] text-center">
                    <p className="text-[13px] font-semibold text-dark700">
                      00:{seconds} secs
                    </p>
                  </div>
                )}
                <div className="mt-[20px]">
                  <button
                    type="submit"
                    className="flex w-full outline-none hover:bg-darkolivegreen transition justify-center rounded border border-transparent bg-orange py-3 px-4 text-[15px] font-semibold text-white shadow-sm  focus:outline-none focus:ring-0 "
                  >
                    Verify
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verification;
