import Link from "next/link";
import React, { useEffect, useState } from "react";
import OtpInput from "react-otp-input";

export default function Verification() {
  const [OTP, setOTP] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [seconds, setSeconds] = useState(60);

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
  return (
    <div className=" min-h-screen grid bg-white lg:grid-cols-2 lg:col-rows-1">
      <div className="hidden lg:flex items-center after:top-0 after:bottom-0 after:opacity-60 after:left-0 after:right-0">
        <img className="h-full w-full" src="/assets/login.svg" alt="Branding" />
      </div>
      <div className="flex  flex-col justify-center items-center px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-[134px]">
        <div className="mx-auto w-full ">
          <div>
            <h2 className="mt-6 text-xl font-semibold tracking-tight text-dark900 text-center">
              Verification Code
            </h2>
            <p className="mt-4 text-[15px] font-medium text-gray800">
              We’ve sent the verification code to the email{" "}
              <span className="font-semibold">patrickkennedy@gmail.com</span>{" "}
              provided.
            </p>
          </div>
          <div className="mt-[60px]">
            <form className="" action="#" method="POST">
              <div>
                <div className="mt-1 flex justify-center space-x-[33px]">
                  <OtpInput
                    isInputNum
                    containerStyle="flex justify-center space-x-[33px]"
                    value={OTP}
                    inputStyle="h-[50px_!important] text-center w-[50px_!important] appearance-none rounded-lg bg-violet200 border px-3 py-2 focus:border-violet600 focus:outline-none focus:ring-slate-300 sm:text-[25px] font-medium text-gray800"
                    onChange={handleChange}
                    numInputs={4}
                    separator={<span></span>}
                    renderInput={(index, key) => (
                      <input
                        key={key}
                        type="text"
                        maxLength="1"
                        placeholder="0"
                        value={OTP[index]}
                        onChange={(e) =>
                          handleChange(
                            OTP.substr(0, index) +
                              e.target.value +
                              OTP.substr(index + 1)
                          )
                        }
                        className="h-[50px_!important] text-center w-[50px_!important] appearance-none rounded-lg bg-violet200 border px-3 py-2 focus:border-violet600 focus:outline-none focus:ring-slate-300 sm:text-[25px] font-medium text-gray800"
                      />
                    )}
                  />
                </div>
              </div>
              <div className="text-center mt-12">
                <span className="text-medium text-[15px] text-gray800 leanding-[22px]">
                  Do not receive the code?{" "}
                  <button
                    onClick={() => {
                      setIsActive(true);
                    }}
                    type="button"
                    className="font-semibold text-violet600 cursor-pointer"
                  >
                    Send again
                  </button>
                </span>
              </div>
              {isActive && (
                <div className="mt-[60px] text-center">
                  <p className="text-[13px] font-semibold text-pink600">
                    00:{seconds} secs
                  </p>
                </div>
              )}
              <div className="mt-[60px]">
                <Link href="/admin/resetpassword">
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded border border-transparent bg-orange py-3 px-4 text-[15px] font-semibold text-white shadow-sm  focus:outline-none focus:ring-0 "
                  >
                    Verify
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
