import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import useMediaQuery from "@/hooks/useMedaQuery";
const AdminLayout = ({ children }) => {
  const isDesktop = useMediaQuery("(min-width: 1023px)");

  const [openSidebar, setOpenSidebar] = useState(true);
  return (
    <>
      <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
      <div
        className={`${
          isDesktop && openSidebar ? "pl-20" : "lg:pl-72"
        } transition ease-in duration-300`}
      >
        <Header openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
        <main
          className={`${
            openSidebar ? "" : ""
          } py-10 bg-gray-50 min-h-[calc(100vh_-_64px)] dark:bg-[#20304c] `}
        >
          {children}
        </main>
      </div>
    </>
  );
};

export default AdminLayout;
