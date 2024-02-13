import React, { useEffect, useState } from "react";
import SettingTab from "@/components/admin/SettingTab";
import dynamic from "next/dynamic";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { useDispatch, useSelector } from "react-redux";
import Profile from "@/components/admin/setting/profile";
import Restaurant from "@/components/admin/setting/restaurant";

const Setting = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.LogIn?.user?.user);
  const [selectedtab, setSelectedTab] = useState(1);

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
        {selectedtab === 1 ? <Profile userData={userData}/> : <Restaurant userData={userData}/>}
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
