import { Switch } from "@headlessui/react";
import Link from "next/link";
import React, { useState } from "react";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const SocialLogin = () => {
  const [enabled, setEnabled] = useState(false);
  return (
    <div className="px-6 sm:px-10">
      <h4 className="text-[24px] dark:text-white font-medium text-gray-900">
        Social Media Login
      </h4>
      <div className="grid lg:grid-cols-2 mt-8 gap-8">
        <div className="bg-white dark:bg-[#0c1a32] rounded-md shadow-box ">
          <div className=" flex justify-between  border-b ">
            <h3 className=" font-medium px-[25px] py-[16px]">
              Google Login Credential
            </h3>
            <div className="px-[25px] py-[16px]">
              <div className="flex items-center justify-center">
                <Switch
                  checked={enabled}
                  onChange={setEnabled}
                  className={classNames(
                    enabled ? "bg-green-500" : "bg-gray-200", "relative inline-flex  h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none "
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={classNames(
                      enabled ? "translate-x-5  bg-green-500" : "translate-x-0",
                      "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                    )}
                  />
                </Switch>
              </div>
            </div>
          </div>
          <div className="p-[24px] ">
            <div className="grid mb-4 grid-cols-4">
              <span className="text-gray-800 text-xs">
                Client ID
              </span>
              <div className="col-span-3">
                <input placeholder="Google Client ID" className=" relative transition-all duration-300 py-2.5 px-4 w-full tracking-wide placeholder-gray-400 bg-white disabled:opacity-40 disabled:cursor-not-allowed text-[14px] text-[#6e6e6e] rounded-md border border-[#f0f1f5] focus:border-orange transition duration-300 focus:outline-none focus:ring-0 shadow-none rounded-md bg-white dark:text-gray-300 dark:bg-[#20304c]" />
              </div>
            </div>
            <div className="grid grid-cols-4">
              <span className="text-gray-800 text-xs">
                Client Secret
              </span>
              <div className="col-span-3">
                <input placeholder="Google Client Secret" className=" relative transition-all duration-300 py-2.5 px-4 w-full tracking-wide placeholder-gray-400 bg-white disabled:opacity-40 disabled:cursor-not-allowed text-[14px] text-[#6e6e6e] rounded-md border border-[#f0f1f5] focus:border-orange transition duration-300 focus:outline-none focus:ring-0 shadow-none rounded-md bg-white dark:text-gray-300 dark:bg-[#20304c]" />
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                type="submit"
                className="rounded text-md outline-none shadow-sm bg-green-700 hover:bg-green-800 trnasition duration-200  ease-in text-white px-6 py-2"
              >
                Save
              </button>
            </div>
          </div>

        </div>
        <div className="bg-white dark:bg-[#0c1a32] rounded-md shadow-box ">
          <div className=" flex justify-between  border-b ">
            <h3 className=" font-medium px-[25px] py-[16px]">
              Facebook login
            </h3>
            <div className="px-[25px] py-[16px]">
              <div className="flex items-center justify-center">
                <Switch
                  checked={enabled}
                  onChange={setEnabled}
                  className={classNames(
                    enabled ? "bg-green-500" : "bg-gray-200", "relative inline-flex  h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none "
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={classNames(
                      enabled ? "translate-x-5  bg-green-500" : "translate-x-0",
                      "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                    )}
                  />
                </Switch>
              </div>
            </div>
          </div>
          <div className="p-[24px] ">
            <div className="grid mb-4 grid-cols-4">
              <span className="text-gray-800 text-xs">
                Client ID
              </span>
              <div className="col-span-3">
                <input placeholder="Facebook Client ID" className=" relative transition-all duration-300 py-2.5 px-4 w-full tracking-wide placeholder-gray-400 bg-white disabled:opacity-40 disabled:cursor-not-allowed text-[14px] text-[#6e6e6e] rounded-md border border-[#f0f1f5] focus:border-orange transition duration-300 focus:outline-none focus:ring-0 shadow-none rounded-md bg-white dark:text-gray-300 dark:bg-[#20304c]" />
              </div>
            </div>
            <div className="grid  grid-cols-4">
              <span className="text-gray-800 text-xs">
                Client Secret
              </span>
              <div className="col-span-3">
                <input placeholder="Facebook Client Secret" className=" relative transition-all duration-300 py-2.5 px-4 w-full tracking-wide placeholder-gray-400 bg-white disabled:opacity-40 disabled:cursor-not-allowed text-[14px] text-[#6e6e6e] rounded-md border border-[#f0f1f5] focus:border-orange transition duration-300 focus:outline-none focus:ring-0 shadow-none rounded-md bg-white dark:text-gray-300 dark:bg-[#20304c]" />
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                type="submit"
                className="rounded text-md outline-none shadow-sm bg-green-700 hover:bg-green-800 trnasition duration-200  ease-in text-white px-6 py-2"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialLogin;
