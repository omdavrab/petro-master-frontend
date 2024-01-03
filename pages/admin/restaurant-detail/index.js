import React, { useState } from "react";
import { AiFillCamera } from "react-icons/ai";
import { HiOutlineUpload } from "react-icons/hi";
import dynamic from "next/dynamic";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { CloseLoader, OpenLoader } from "@/redux/action/loader";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
const TimePicker = dynamic(() => import("react-time-picker"), {
  ssr: false,
});

const RestaurantDetail = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [image, setImage] = useState();
  const [time, setTime] = useState({
    startTime: "10:00",
    closeTime: "9:00",
  });
  const [restaurantData, setRestaurantData] = useState({});
  const SignupToken = useSelector((state) => state.SignUp.user.token);

  const HandleRestaurantData = (e) => {
    setRestaurantData({ ...restaurantData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(OpenLoader(true));
    const formData = new FormData();
    formData.append("name", restaurantData.name);
    formData.append("address", restaurantData.address);
    formData.append("city", restaurantData.city);
    formData.append("postalcode", restaurantData.postalcode);
    formData.append("phoneNo", restaurantData.phoneNo);
    formData.append("openTime", time.startTime);
    formData.append("closeTime", time.closeTime);
    formData.append("image", image);

    
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f1f1f1]">
      <div className="mx-auto w-full bg-white shadow-box max-w-lg  p-5 md:px-[56px] md:py-10">
        <h2 className=" text-lg font-sans text-left text-black/[70%] font-bold leading-9 tracking-tight ">
          Restaurant Details
        </h2>
        <div className="mt-6">
          <div>
            <form
              action="#"
              method="POST"
              className="space-y-6"
              onSubmit={handleSubmit}
            >
              <div className="mt-8">
                {!image ? (
                  <div className="h-[80px] w-[148px]  bg-upload-img mx-auto flex justify-center items-center">
                    <AiFillCamera className="text-[30px]" />
                  </div>
                ) : (
                  <div className="h-[80px] w-[148px]  shadow-dark15 mx-auto flex justify-center items-center bg-white p-1">
                    <img
                      src={URL.createObjectURL(image)}
                      alt="image"
                      className="w-full h-full"
                      required
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
                    className="flex bg-gray50 rounded-[6px] mt-7 mx-auto py-[8.5px] px-[12.6px]  items-center font-bold text-[14px] md:text-[16px]  leading-6 text-gray500"
                  >
                    <HiOutlineUpload className="text-[24px] mr-2" />
                    Upload Logo
                  </label>
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block font-bold text-[14px] md:text-[16px]  leading-6 text-gray500"
                >
                  Restaurant Name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter Restaurant Name"
                    required
                    onChange={(e) => HandleRestaurantData(e)}
                    className="block w-full text-[14px] px-6 text-[#6e6e6e] rounded-md border border-[#f0f1f5] focus:border-orange transition duration-300 focus:outline-none focus:ring-0  shadow-none rounded-md bg-white "
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block font-bold text-[14px] md:text-[16px]  leading-6 text-gray500"
                >
                  Address
                </label>
                <div className="mt-2">
                  <input
                    id="address"
                    name="address"
                    type="text"
                    placeholder="Enter Address"
                    required
                    onChange={(e) => HandleRestaurantData(e)}
                    className="block w-full text-[14px] px-6 text-[#6e6e6e] rounded-md border border-[#f0f1f5] focus:border-orange transition duration-300 focus:outline-none focus:ring-0  shadow-none rounded-md bg-white "
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block font-bold text-[14px] md:text-[16px]  leading-6 text-gray500"
                >
                  Phone Number
                </label>
                <div className="mt-2">
                  <input
                    id="phoneNo"
                    name="phoneNo"
                    type="number"
                    placeholder="Enter Number"
                    required
                    onChange={(e) => HandleRestaurantData(e)}
                    className="block w-full text-[14px] px-6 text-[#6e6e6e] rounded-md border border-[#f0f1f5] focus:border-orange transition duration-300 focus:outline-none focus:ring-0  shadow-none rounded-md bg-white "
                  />
                </div>
              </div>
              <div className="grid gap-4 grid-cols-2">
                <div>
                  <label
                    htmlFor="email"
                    className="block font-bold text-[14px] md:text-[16px]  leading-6 text-gray500"
                  >
                    City
                  </label>
                  <div className="mt-2">
                    <input
                      id="city"
                      name="city"
                      type="text"
                      placeholder="City"
                      required
                      onChange={(e) => HandleRestaurantData(e)}
                      className="block w-full text-[14px] px-6 text-[#6e6e6e] rounded-md border border-[#f0f1f5] focus:border-orange transition duration-300 focus:outline-none focus:ring-0  shadow-none rounded-md bg-white "
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block font-bold text-[14px] md:text-[16px]  leading-6 text-gray500"
                  >
                    Postal code
                  </label>
                  <div className="mt-2">
                    <input
                      id="postal code"
                      name="postalcode"
                      type="number"
                      placeholder="Enter Address"
                      required
                      onChange={(e) => HandleRestaurantData(e)}
                      className="block w-full text-[14px] px-6 text-[#6e6e6e] rounded-md border border-[#f0f1f5] focus:border-orange transition duration-300 focus:outline-none focus:ring-0  shadow-none rounded-md bg-white "
                    />
                  </div>
                </div>
              </div>
              <div className="grid gap-3 grid-cols-2">
                <div>
                  <label
                    htmlFor="email"
                    className="block font-bold text-[14px] md:text-[16px]  leading-6 text-gray500"
                  >
                    Open Time
                  </label>
                  <TimePicker
                    onChange={(e) => setTime({ ...time, startTime: e })}
                    value={time.startTime}
                    hourPlaceholder="00"
                    minutePlaceholder="00"
                    clearIcon={
                      <FontAwesomeIcon
                        icon={faXmark}
                        className="hover:text-orange trnasition duration-200"
                      />
                    }
                    disableClock={true}
                    className="text-[#6e6e6e] px-2 py-1.5 w-full rounded-md border border-[#f0f1f5] focus:border-orange transition duration-300 focus:outline-none focus:ring-0  shadow-none rounded-md bg-white"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block font-bold text-[14px] md:text-[16px]  leading-6 text-gray500"
                  >
                    Close Time
                  </label>
                  <TimePicker
                    onChange={(e) => setTime({ ...time, closeTime: e })}
                    value={time.closeTime}
                    hourPlaceholder="00"
                    minutePlaceholder="00"
                    clearIcon={
                      <FontAwesomeIcon
                        icon={faXmark}
                        className="hover:text-orange trnasition duration-200"
                      />
                    }
                    disableClock={true}
                    className="text-[#6e6e6e] px-2 py-1.5 w-full rounded-md border border-[#f0f1f5] focus:border-orange transition duration-300 focus:outline-none focus:ring-0  shadow-none rounded-md bg-white"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-orange px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-darkolivegreen focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-darkolivegreen"
                >
                  Finish
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;
