import React, { useEffect, useMemo, useState } from "react";
import SettingTab from "@/components/admin/SettingTab";
import { HiOutlineUpload } from "react-icons/hi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import dynamic from "next/dynamic";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { useDispatch, useSelector } from "react-redux";
import {
  HandleEditRestaurantData,
  HandleRestaurantData,
} from "@/redux/action/restaurant";
import API from "@/URL";
import { CloseLoader, OpenLoader } from "@/redux/action/loader";

import Profile from "@/components/admin/setting/profile";
import Loader from "../Loader";
import { toast } from "react-toastify";
const TimePicker = dynamic(() => import("react-time-picker"), {
  ssr: false,
});

export default function Restaurant() {
  const dispatch = useDispatch();
  const Restaurant = useSelector((state) => state.Restaurant?.restaurantData);

  const [image, setImage] = useState();
  const [editRestaurant, setEditRestaurant] = useState();

  const [time, setTime] = useState({
    openTime:
      Restaurant?.openTime === "undefined" ? "00:00" : Restaurant?.openTime,
    closeTime:
      Restaurant?.closeTime === "undefined" ? "00:00" : Restaurant?.closeTime,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(OpenLoader(true));
    const formData = new FormData();
    formData.append("name", editRestaurant.name);
    formData.append("address", editRestaurant.address);
    formData.append("city", editRestaurant.city);
    formData.append("postalcode", editRestaurant.postalcode);
    formData.append("phoneNo", editRestaurant.phoneNo);
    formData.append("openTime", time?.openTime);
    formData.append("closeTime", time?.closeTime);
    formData.append("image", image);

    await dispatch(HandleEditRestaurantData(formData))
      .then((result) => {
        if (result.payload.status === 200) {
          toast(result?.payload?.data.message, {
            hideProgressBar: true,
            autoClose: 3000,
            type: "success",
          });
          dispatch(HandleRestaurantData());
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
        console.log(err);
      });
  };

  useMemo(() => {
    setEditRestaurant({
      name: Restaurant?.name,
      address: Restaurant?.address,
      city: Restaurant?.city,
      postalcode: Restaurant?.postalcode,
      phoneNo: Restaurant?.phoneNo,
    });
  }, [Restaurant]);

  const handleEditRestaurant = (e) => {
    setEditRestaurant({ ...editRestaurant, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <form
        action="#"
        method="EDIT"
        className="space-y-6"
        onSubmit={handleSubmit}
      >
        <div className="mt-7 flex-1">
          <h4 className="text-[20px] font-medium dark:text-gray-300  text-gray-900">Restaurant</h4>
          <div className="flex flex-col-reverse md:grid gap-10 md:grid-cols-3">
            <div className="md:col-span-2">
              <div>
                <h4 className="text-[20px] dark:text-gray-300 font-medium mt-6 mb-5 text-gray-900">
                  Restaurant Information
                </h4>
                <div className="grid sm:grid-cols-3 mb-5">
                  <div className="flex items-center">
                    <span className="text-gray-700 dark:text-gray-400 font-meidum">
                      Restaurant Name
                    </span>
                  </div>
                  <div className="sm:col-span-2">
                    <input
                      id="Restaurant Name"
                      name="name"
                      className="block w-full px-6 text-[#6e6e6e] dark:text-gray-300 dark:bg-[#20304c] rounded-md border border-[#f0f1f5] focus:border-orange transition duration-300 focus:outline-none focus:ring-0 shadow-none rounded-md bg-white"
                      value={editRestaurant?.name}
                      type="text"
                      onChange={(e) => handleEditRestaurant(e)}
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-3 mb-5">
                  <div className="flex items-center">
                    <span id="address" className="text-gray-700 dark:text-gray-400 font-meidum">
                      Address
                    </span>
                  </div>
                  <div className="sm:col-span-2">
                    <input
                      name="address"
                      type="text"
                      onChange={(e) => handleEditRestaurant(e)}
                      className="block w-full px-6 text-[#6e6e6e] dark:text-gray-300 dark:bg-[#20304c] rounded-md border border-[#f0f1f5] focus:border-orange transition duration-300 focus:outline-none focus:ring-0 shadow-none rounded-md bg-white"
                      value={editRestaurant?.address}
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-3 mb-5">
                  <div className="flex items-center">
                    <span className="text-gray-700 dark:text-gray-400 font-medium">
                      Phone Number
                    </span>
                  </div>
                  <div className="sm:col-span-2">
                    <input
                      id="Phone Number"
                      type="number"
                      name="phoneNo"
                      onChange={(e) => handleEditRestaurant(e)}
                      className="block w-full px-6 text-[#6e6e6e] dark:text-gray-300 dark:bg-[#20304c] rounded-md border border-[#f0f1f5] focus:border-orange transition duration-300 focus:outline-none focus:ring-0 shadow-none rounded-md bg-white"
                      value={editRestaurant?.phoneNo}
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 md:gap-5">
                  <div className="grid sm:grid-cols-3 mb-5">
                    <div className="flex items-center">
                      <span className="text-gray-700 dark:text-gray-400 font-meidum">City</span>
                    </div>
                    <div className="sm:col-span-2">
                      <input
                        name="city"
                        id="city"
                        className="block w-full px-6 text-[#6e6e6e] dark:text-gray-300 dark:bg-[#20304c] rounded-md border border-[#f0f1f5] focus:border-orange transition duration-300 focus:outline-none h-full focus:ring-0 shadow-none rounded-md bg-white"
                        value={editRestaurant?.city}
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-3 mb-5">
                    <div className="flex items-center">
                      <span className="text-gray-700 dark:text-gray-400 font-meidum">
                        Postal code
                      </span>
                    </div>
                    <div className="sm:col-span-2">
                      <input
                        id="postalcode"
                        name="postalcode"
                        onChange={(e) => handleEditRestaurant(e)}
                        type="number"
                        className="block w-full px-6 text-[#6e6e6e] dark:text-gray-300 dark:bg-[#20304c] rounded-md border border-[#f0f1f5] focus:border-orange transition duration-300 focus:outline-none focus:ring-0 shadow-none rounded-md bg-white"
                        value={editRestaurant?.postalcode}
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-3 mb-5">
                    <div className="flex items-center">
                      <span className="text-gray-700 dark:text-gray-400 font-meidum">
                        Open Time
                      </span>
                    </div>
                    <div className="sm:col-span-2">
                      <div>
                        <TimePicker
                          onChange={(e) => setTime({ ...time, openTime: e })}
                          value={time?.openTime}
                          hourPlaceholder="00"
                          minutePlaceholder="00"
                          clearIcon={
                            <FontAwesomeIcon
                              icon={faXmark}
                              className="hover:text-orange trnasition duration-200"
                            />
                          }
                          disableClock={true}
                          className="text-[#6e6e6e] dark:text-gray-300 dark:bg-[#20304c] px-2 py-1.5 w-full rounded-md border border-[#f0f1f5] focus:border-orange transition duration-300 focus:outline-none focus:ring-0  shadow-none rounded-md bg-white"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-3 mb-5">
                    <div className="flex items-center">
                      <span className="text-gray-700 dark:text-gray-400 font-meidum">
                        Close Time
                      </span>
                    </div>
                    <div className="sm:col-span-2">
                      <div>
                        <TimePicker
                          onChange={(e) => setTime({ ...time, closeTime: e })}
                          value={time?.closeTime}
                          hourPlaceholder="00"
                          minutePlaceholder="00"
                          clearIcon={
                            <FontAwesomeIcon
                              icon={faXmark}
                              className="hover:text-orange trnasition duration-200"
                            />
                          }
                          disableClock={true}
                          className="text-[#6e6e6e] dark:text-gray-300 dark:bg-[#20304c] px-2 py-1.5 w-full rounded-md border border-[#f0f1f5] focus:border-orange transition duration-300 focus:outline-none focus:ring-0  shadow-none rounded-md bg-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-[20px] font-medium mt-6 mb-5 text-gray-900">
                Restaurant Logo
              </h4>
              <div>
                <div className="mt-8">
                  {!image ? (
                    // <div className="h-[80px] w-[160px]  bg-upload-img flex justify-center items-center">
                    //   <AiFillCamera className="text-[30px]" />
                    // </div>
                    <div className="h-[80px] w-[160px] shadow-lg  shadow-dark15  flex justify-center items-center bg-white p-1">
                      <img
                        src={`${API}/image/${Restaurant.logo}`}
                        alt="image"
                        className="w-full h-full"
                      />
                    </div>
                  ) : (
                    <div className="h-[80px] w-[160px] shadow-lg  shadow-dark15  flex justify-center items-center bg-white p-1">
                      <img
                        src={URL.createObjectURL(image)}
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
                      onChange={(e) => setImage(e.target.files[0])}
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
          <button
            type="submit"
            className="rounded outline-none shadow-sm bg-green-700 hover:bg-green-800 trnasition duration-200  ease-in text-white px-6 py-2"
          >
            Save
          </button>
          <button
            type="button"
            className="outline-none trnasition duration-200 hover:text-red-600 ease-in"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
