import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AiFillCamera } from "react-icons/ai";
import { HiOutlineUpload } from "react-icons/hi";

export default function Profile({userData}) {
  const [profilePicture, setProfilePicture] = useState();
  const [UserData, serUserData] = useState({});
  useEffect(() => {
    serUserData(userData);
  }, [userData]);

  return (
    <div>
      <div className="mt-7 flex-1">
        <h4 className="text-[20px] font-medium dark:text-gray-300 text-gray-900">Profile</h4>
        <div className="flex flex-col-reverse md:grid gap-10 md:grid-cols-3">
          <div className="md:col-span-2">
            <div>
              <h4 className="text-[20px] dark:text-gray-300 font-medium mt-6 mb-5 text-gray-900">
                Account Information
              </h4>
              <div className="grid sm:grid-cols-3 mb-5">
                <div className="flex items-center">
                  <span className="text-gray-700 dark:text-gray-400  font-meidum">First Name</span>
                </div>
                <div className="sm:col-span-2">
                  <input
                    id="First Name"
                    className="block w-full text-[14px] py-1.5 px-6 text-[#6e6e6e] rounded-md border border-[#f0f1f5] focus:border-orange transition duration-300 focus:outline-none focus:ring-0  shadow-none rounded-md bg-white dark:text-gray-300 dark:bg-[#20304c] "
                    defaultValue={UserData?.name}
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-3 mb-5">
                <div className="flex items-center">
                  <span id="lastname" className="text-gray-700  dark:text-gray-400  font-meidum">
                    Last Name
                  </span>
                </div>
                <div className="sm:col-span-2">
                  <input
                    id="Last Name"
                    defaultValue={UserData?.name}
                    className="block w-full text-[14px] py-1.5 px-6 text-[#6e6e6e] rounded-md border border-[#f0f1f5] focus:border-orange transition duration-300 focus:outline-none focus:ring-0  shadow-none rounded-md bg-white dark:text-gray-300 dark:bg-[#20304c] "
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-3 mb-5">
                <div className="flex items-center">
                  <span className="text-gray-700 dark:text-gray-400 font-meidum">
                    Email Address
                  </span>
                </div>
                <div className="sm:col-span-2 flex relative">
                  <input
                    className="block  w-full text-[14px] py-1.5 px-6 text-[#6e6e6e] rounded-md border border-[#f0f1f5] focus:border-orange transition duration-300 focus:outline-none focus:ring-0  shadow-none rounded-md bg-white dark:text-gray-300 dark:bg-[#20304c]"
                    defaultValue={UserData?.email}
                  />
                  <button className="absolute top-[0px] right-0 border border-[#f0f1f5]  px-6 py-[4.5px] bg-orange text-white rounded-r-md">
                      Verify
                  </button>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-[20px] dark:text-gray-300 font-medium mt-6 mb-5 text-gray-900">
                Change Password
              </h4>
              <div className="grid sm:grid-cols-3 mb-5">
                <div className="flex items-center">
                  <span className="text-gray-700 dark:text-gray-400 font-meidum">
                    Current Password
                  </span>
                </div>
                <div className="sm:col-span-2">
                  <input
                    type="password"
                    className="block w-full text-[14px] py-1.5 px-6 text-[#6e6e6e] rounded-md border border-[#f0f1f5] focus:border-orange transition duration-300 focus:outline-none focus:ring-0 shadow-none rounded-md bg-white dark:text-gray-300 dark:bg-[#20304c]"
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-3 mb-5">
                <div className="flex items-center">
                  <span className="text-gray-700 dark:text-gray-400 font-meidum">
                    New Password
                  </span>
                </div>
                <div className="sm:col-span-2">
                  <input
                    type="password"
                    className="block  w-full text-[14px] py-1.5 px-6 text-[#6e6e6e] rounded-md border border-[#f0f1f5] focus:border-orange transition duration-300 focus:outline-none focus:ring-0 shadow-none rounded-md bg-white dark:text-gray-300 dark:bg-[#20304c]"
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-3 mb-5">
                <div className="flex items-center">
                  <span htmlFor="pwd" className="text-gray-700 dark:text-gray-400 font-meidum">
                    Confirm Password
                  </span>
                </div>
                <div className="sm:col-span-2 ">
                  <input
                    type="password"
                    id="pwd"
                    name="pwd"
                    className="block w-full text-[14px] py-1.5 px-6 text-[#6e6e6e] rounded-md border border-[#f0f1f5] focus:border-orange transition duration-300 focus:outline-none focus:ring-0 shadow-none rounded-md bg-white dark:text-gray-300 dark:bg-[#20304c]"
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-[20px] font-medium mt-6 mb-5 text-gray-900">
              Profile Picture
            </h4>
            <div>
              <div className="mt-8">
                {!profilePicture ? (
                  <div className="h-[120px] w-[120px]  bg-upload-img flex justify-center items-center">
                    <AiFillCamera className="text-[30px]" />
                  </div>
                ) : (
                  <div className="h-[120px] w-[120px] shadow-lg  shadow-dark15  flex justify-center items-center bg-white p-1">
                    <img
                      src={URL.createObjectURL(profilePicture)}
                      alt="image"
                      className="w-full h-full"
                    />
                  </div>
                )}

                <div className="flex">
                  <input
                    type="file"
                    id="image"
                    className="hidden"
                    onChange={(e) => setProfilePicture(e.target.files[0])}
                    accept="image/*"
                  />
                  <label
                    htmlFor="image"
                    className="flex dark:bg-[#63789d] dark:text-gray-200 bg-gray-100 cursor-pointer rounded-[6px] mt-7 py-[8.5px] px-[12.6px]  items-center font-bold text-[14px] md:text-[16px]  leading-6 text-gray500"
                  >
                    <HiOutlineUpload className="text-[24px] mr-2" />
                    Upload
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full mt-12 flex gap-4">
        <button className="rounded outline-none shadow-sm bg-green-700 hover:bg-green-800 trnasition duration-200  ease-in text-white px-6 py-2">
          Save
        </button>
        <button className="outline-none trnasition duration-200 hover:text-red-600 ease-in">
          Cancel
        </button>
      </div>
    </div>
  );
}
