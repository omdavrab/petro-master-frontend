import URL from "@/URL";
import Pagination from "@/components/Pagination/Pagination";
import ItemsDetails from "@/components/admin/ItemModal/ItemsDetails";
import { CloseLoader, OpenLoader } from "@/redux/action/loader";
import { HandleDeleteMenu, HandleGetMenu, HandleMenuId } from "@/redux/action/menu";
import React, { useEffect, useRef, useState } from "react";
import { AiFillEyeInvisible } from "react-icons/ai";
import { MdOutlineAddBox } from "react-icons/md";
import { TbEdit, TbTrash } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import DeletePopup from "@/components/admin/DeletePopup";
import { toast } from "react-toastify";
import Link from "next/link";

const MenuList = () => {
  const dispatch = useDispatch();
  const cancelButtonRef = useRef(null);
  const GetMenu = useSelector((state) => state.GetMenu?.menuData);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [menuData, setMenuData] = useState({});
  const [menuList, setMenuList] = useState([]);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [handleDeleteMenu, setHandleDeleteMenu] = useState(false);
  const menuId = useSelector((state) => state.GetMenu.menuData.data)
  const fetchMenus = async () => {
    await dispatch(HandleGetMenu(page));
  };

  useEffect(() => {
    fetchMenus();
  }, [page]);

  // DELETE MENU
  const HandleDelete = async (id) => {
    dispatch(OpenLoader(true));
    dispatch(HandleDeleteMenu(id)).then(async (result) => {
      if (result.payload.status === 200) {
        toast(result?.payload?.data.message, {
          hideProgressBar: true,
          autoClose: 3000,
          type: "success",
        });
        await dispatch(HandleGetMenu(page));
        dispatch(CloseLoader(false));
      } else {
        dispatch(CloseLoader(false));
        toast(result?.payload?.data.message, {
          hideProgressBar: true,
          autoClose: 3000,
          type: "error",
        });
      }
    });
  };

  useEffect(() => {
    setMenuList(GetMenu);
  }, [GetMenu]);

  return (
    <>
      <div className="px-6 sm:px-10">
        <h4 className="text-[24px] dark:text-white font-medium text-gray-900">Menu List</h4>
        <div className="grid mt-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2  xl:grid-cols-3 2xl:grid-cols-4 gap-10 md:gap-8 lg:gap-10">
          {menuList?.data?.length > 0 &&
            menuList?.data?.map((item, index) => {
              return (
                <div key={index} className="mt-[100px] flex">
                  <div className="bg-white relative p-5 lg:p-[1.7rem] w-full flex flex-col items-center flex-1 rounded-sm shadow-sm">
                    <img
                      src={`${URL}/image/${item.image}`}
                      className="absolute w-[160px] h-[160px] rounded top-[-50%]"
                    />
                    <div className="h-[25px]"></div>
                    <h2 className="text-[18px] mt-5 mb-1 text-center font-medium">
                      {item.name}
                    </h2>
                    <span className="text-gray-700 block text-center">
                      {item.catrgories}
                    </span>
                    <div className="flex gap-3 md:gap-2 lg:gap-4 mt-4 w-full justify-evenly">
                      <div className="flex flex-col items-center">
                        <button
                          onClick={() => {
                            setOpen(true);
                            setMenuData(item);
                          }}
                          className="w-[30px] h-[30px] rounded-full trnasition duration-300 ease-in flex items-center justify-center hover:bg-[#01b075] hover:text-white bg-[#e9f5ea] text-[#01b075] "
                        >
                          <AiFillEyeInvisible />
                        </button>
                        <span className="text-sm mt-1 text-gray-600">View</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <Link href={{ pathname: "/admin/addnewmenu", query: { id: item._id } }}>
                          <button className="w-[30px] h-[30px] rounded-full trnasition duration-300 ease-in flex items-center justify-center hover:bg-[#e66430] hover:text-white bg-[#ffe1d5] text-[#e66430] ">
                            <TbEdit />
                          </button>
                        </Link>
                        <span className="text-sm mt-1 text-gray-600">Edit</span>
                      </div>
                      <div
                        className="flex flex-col items-center"
                        onClick={() => {
                          HandleDelete(item?._id);
                        }}
                      >
                        <button
                          // onClick={() => setDeleteOpen(true)}
                          className="w-[30px] h-[30px] rounded-full trnasition duration-300 ease-in flex items-center justify-center hover:bg-[#4c95dd] bg-[#cde3f9] hover:text-white text-[#4c95dd] "
                        >
                          <TbTrash />
                        </button>
                        <span className="text-sm mt-1 text-gray-600">
                          Delete
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        {menuList?.data?.length > 0 &&
          <Pagination
            className="pagination-bar"
            currentPage={menuList.current ? menuList.current : 1}
            totalCount={menuList.results ? menuList.results : 10}
            pageSize={8}
            onPageChange={(pages) => setPage(pages)}
          />
        }
      </div>
      <ItemsDetails
        setOpen={setOpen}
        open={open}
        cancelButtonRef={cancelButtonRef}
        menuData={menuData}
      />
      <DeletePopup
        title="Delete Item"
        dis="Are you sure you want to Delte Item?"
        deletebuttonTitle="Delete Item"
        open={deleteOpen}
        cancelButtonRef={cancelButtonRef}
        setOpen={setDeleteOpen}
        setHandleDeleteMenu={setHandleDeleteMenu}
      />
    </>
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
export default MenuList;
