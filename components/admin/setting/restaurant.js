import React, { useEffect, useState } from "react";
import SettingTab from "@/components/admin/SettingTab";
import { HiOutlineUpload } from "react-icons/hi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import dynamic from "next/dynamic";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { useDispatch, useSelector } from "react-redux";
import API from "@/URL";
import { CloseLoader, OpenLoader } from "@/redux/action/loader";
const TimePicker = dynamic(() => import("react-time-picker"), {
  ssr: false,
});

export default function Restaurant({ userData }) {
  console.log("🚀 ~ Restaurant ~ userData:", userData);
  const dispatch = useDispatch();
  const Restaurant = useSelector((state) => state?.Restaurant?.restaurantData);

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
  };

  useEffect(() => {
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
          <h4 className="text-[20px] font-medium dark:text-gray-300  text-gray-900">
            Petro Master
          </h4>
          <div className="flex flex-col-reverse md:grid gap-10 md:grid-cols-3">
            <div className="md:col-span-2">
              <div>
                <h4 className="text-[20px] dark:text-gray-300 font-medium mt-6 mb-5 text-gray-900">
                  Petro Information
                </h4>
                <div className="grid sm:grid-cols-3 mb-5">
                  <div className="flex items-center">
                    <span className="text-gray-700 dark:text-gray-400 font-meidum">
                      GST Number
                    </span>
                  </div>
                  <div className="sm:col-span-2">
                    <span
                      id="Restaurant Name"
                      className="block w-full py-[10px] px-6 text-[#6e6e6e] dark:text-gray-300 dark:bg-[#20304c] rounded-md border border-[#f0f1f5] focus:border-orange transition duration-300 focus:outline-none focus:ring-0 shadow-none rounded-md bg-white"
                    >
                      {userData?.gstnumber}
                    </span>
                  </div>
                </div>
                <div className="grid sm:grid-cols-3 mb-5">
                  <div className="flex items-center">
                    <span
                      id="address"
                      className="text-gray-700 dark:text-gray-400 font-meidum"
                    >
                      TIN Number
                    </span>
                  </div>
                  <div className="sm:col-span-2">
                    <span
                      name="address"
                      className="block w-full py-[10px] px-6 text-[#6e6e6e] dark:text-gray-300 dark:bg-[#20304c] rounded-md border border-[#f0f1f5] focus:border-orange transition duration-300 focus:outline-none focus:ring-0 shadow-none rounded-md bg-white"
                    >
                      {userData?.tinnumber}
                    </span>
                  </div>
                </div>
                <div className="grid sm:grid-cols-3 mb-5">
                  <div className="flex items-center">
                    <span className="text-gray-700 dark:text-gray-400 font-medium">
                    Udhyam Number
                    </span>
                  </div>
                  <div className="sm:col-span-2">
                  <span
                      name="address"
                      className="block w-full py-[10px] px-6 text-[#6e6e6e] dark:text-gray-300 dark:bg-[#20304c] rounded-md border border-[#f0f1f5] focus:border-orange transition duration-300 focus:outline-none focus:ring-0 shadow-none rounded-md bg-white"
                    >
                      {userData?.udhyamnumber}
                    </span>
                  </div>
                </div>
                <div className="grid sm:grid-cols-3 mb-5">
                  <div className="flex items-center">
                    <span className="text-gray-700 dark:text-gray-400 font-medium">
                    Vat Number
                    </span>
                  </div>
                  <div className="sm:col-span-2">
                  <span
                      name="address"
                      className="block w-full py-[10px] px-6 text-[#6e6e6e] dark:text-gray-300 dark:bg-[#20304c] rounded-md border border-[#f0f1f5] focus:border-orange transition duration-300 focus:outline-none focus:ring-0 shadow-none rounded-md bg-white"
                    >
                      {userData?.vatnumber}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
        
      </form>
    </div>
  );
}
