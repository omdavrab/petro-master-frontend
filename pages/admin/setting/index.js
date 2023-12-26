import React, { useEffect, useState } from "react";
import SettingTab from "@/components/admin/SettingTab";
import { HiOutlineUpload } from "react-icons/hi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import dynamic from "next/dynamic";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { useDispatch, useSelector } from "react-redux";
import { HandleRestaurantData } from "@/redux/action/restaurant";
import API from "@/URL";
import Profile from "@/components/admin/setting/profile";
import Restaurant from "@/components/admin/setting/restaurant";
const TimePicker = dynamic(() => import("react-time-picker"), {
  ssr: false,
});

const Setting = () => {
  const dispatch = useDispatch();
  const [selectedtab, setSelectedTab] = useState(1);
  useEffect(() => {
    dispatch(HandleRestaurantData());
  }, []);
  return (
    <div className="px-6 sm:px-10">
      <h4 className="text-[24px] dark:text-white font-medium text-gray-900">Setting</h4>
      <div className="flex dark:bg-[#0c1a32]  flex-col bg-white min-w-full mt-8 rounded-md shadow-sm align-middle p-4 sm:p-6 lg:p-8 min-h-[77vh]">
        <div>
          <SettingTab
            selectedtab={selectedtab}
            setSelectedTab={setSelectedTab}
          />
        </div>
        {selectedtab === 1 ? <Profile /> : <Restaurant />}
      </div>
    </div>
  );
};
export async function getServerSideProps(ctx) {
  const myCookie = ctx.req?.cookies || "";

  if (!myCookie.authorization) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
export default Setting;
