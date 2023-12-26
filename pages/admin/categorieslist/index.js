import URL from "@/URL";
import {
  HandleDeleteFoodCategory,
  HandleGetFoodCategory,
  HandleStoreData,
} from "@/redux/action/foodCategory";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { GrClose } from "react-icons/gr";
import { IoClose } from "react-icons/io5";
import { TbEdit, TbTrash } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import DeletePopup from "@/components/admin/DeletePopup";
import { CloseLoader, OpenLoader } from "@/redux/action/loader";
import { useRouter } from "next/router";

const CategoriesList = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const [deleteCategory, setDeleteCategory] = useState();
  const [category, setCategory] = useState([]);
  const FoodCategory = useSelector(
    (state) => state.FoodCategory.getFoodCategory
  );
  useEffect(() => {
    dispatch(HandleGetFoodCategory());
  }, []);

  useEffect(() => {
    setCategory(FoodCategory);
  }, [FoodCategory]);

  // DELETE MENU
  const HandleDelete = async (id) => {
    dispatch(OpenLoader(true));
    dispatch(HandleDeleteFoodCategory(id)).then(async (result) => {
      if (result.payload.status === 200) {
        toast(result?.payload?.data.message, {
          hideProgressBar: true,
          autoClose: 3000,
          type: "success",
        });
        await dispatch(HandleGetFoodCategory());
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

  return (
    <>
      <div className="px-6 sm:px-10">
        <h4 className="text-[24px] dark:text-white font-medium text-gray-900">
          Menu Categories
        </h4>
        <div className="inline-block bg-white min-w-full mt-8 rounded-md shadow-sm align-middle p-4 sm:p-6 lg:p-8 min-h-[77vh]">
          <div className="grid mt-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2  xl:grid-cols-3 2xl:grid-cols-4 gap-10 md:gap-8 lg:gap-10">
            {category.length > 0 &&
              category.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="bg-white dark:bg-[#0c1a32]  relative border w-full flex flex-col items-center flex-1 rounded-sm shadow-sm"
                  >
                    {/* <div
                    className={`${deleteCategory === index ? "block" : "hidden"
                      } transition duration-300  bg-black/[90%] absolute inset-0 `}
                  >
                    <div className="relative w-full h-full p-3">
                      <button
                        onClick={() => setDeleteCategory()}
                        className="absolute top-2.5 right-2.5 "
                      >
                        <IoClose className="text-white text-[20px]" />
                      </button>
                      <div className="w-full flex flex-col items-center justify-center h-full">
                        <h3 className="text-semibold text-2xl text-center text-white">
                          Are you sure to want Catagort delete?
                        </h3>
                        <div className="flex gap-3 mt-5">
                          <button
                            onClick={() => setDeleteCategory()}
                            className=" px-4 py-1.5 text-center text-[12px] bg-sky-500 hover:bg-sky-600 transition duration-200 text-white rounded"
                          >
                            Yes
                          </button>
                          <button
                            onClick={() => setDeleteCategory()}
                            className="px-4 py-1.5 text-center text-[12px] bg-red-400 hover:bg-red-600 transition duration-200 text-white rounded "
                          >
                            No
                          </button>
                        </div>
                      </div>
                    </div>
                  </div> */}

                    <div className="w-full">
                      {/* <Image
                    src={`${URL}/image/${item.image}`}
                    width={180}
                    height={180}
                    className="w-full h-[180px] object-cover"
                  /> */}
                      <img
                        alt="image"
                        width={180}
                        height={180}
                        className="w-full h-[180px] object-cover"
                        src={`${URL}/image/${item.image}`}
                      />
                    </div>
                    <div className="p-5 w-full  lg:p-[1.7rem]">
                      <h2 className="text-[18px] mb-1 text-center font-medium">
                        {item.name}
                      </h2>
                      <div className="flex gap-3 md:gap-2 lg:gap-4 mt-4 w-full justify-center">
                        <div className="flex flex-col items-center">
                          <button
                            type="button"
                            className="w-[30px] h-[30px] rounded-full trnasition duration-300 ease-in flex items-center justify-center hover:bg-[#e66430] hover:text-white bg-[#ffe1d5] text-[#e66430] "
                            onClick={() => {
                              router.push({ pathname: "/admin/addcategories", query: { id: item._id } });

                              dispatch(HandleStoreData(item))
                            }}
                          >
                            <TbEdit />
                          </button>
                          <span className="text-sm mt-1 text-gray-600">
                            Edit
                          </span>
                        </div>
                        <div
                          className="flex flex-col items-center"
                          onClick={() =>
                            HandleDelete(item?._id)
                          }
                        >
                          <button
                            type="button"
                            // onClick={() => setOpen(true)}
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
        </div>
      </div>
      <DeletePopup
        title="Delete Category"
        dis="Are you sure you want to Delte Category?"
        deletebuttonTitle="Delete Category"
        open={open}
        cancelButtonRef={cancelButtonRef}
        setOpen={setOpen}
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
export default CategoriesList;
