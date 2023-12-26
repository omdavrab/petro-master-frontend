import React, { useEffect, useState } from "react";
import { AiFillCamera } from "react-icons/ai";
import { HiOutlineUpload } from "react-icons/hi";
import { RiImageEditFill } from "react-icons/ri";
import { CgTrash } from "react-icons/cg";
import {
  HandleEditFoodCategory,
  HandleFoodCategory,
  HandleStoreData,
} from "@/redux/action/foodCategory";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import API from "@/URL";
import { useRouter } from "next/router";
import { CloseLoader, OpenLoader } from "@/redux/action/loader";

const AddCategories = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [image, setImage] = useState();
  const [categoryImage, setCategoryImage] = useState();
  const [categoryData, setCategoryData] = useState({});
  const EditData = useSelector((state) => state.FoodCategory.storeData);
  const { id } = router.query;

  useEffect(() => {
    if (id && EditData) {
      setCategoryData({ name: EditData.name });
      setCategoryImage(EditData.image);
    } else {
      setCategoryData({ name: "" });
      setCategoryImage();
    }
  }, [id, router]);
  const handleCategories = (e) => {
    setCategoryData({ ...categoryData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(OpenLoader(true));
    const formData = new FormData();
    formData.append("name", categoryData.name);
    formData.append("image", image);
    await dispatch(
      id
        ? HandleEditFoodCategory({ formData, id: id })
        : HandleFoodCategory(formData)
    )
      .then((result) => {
        if (result.payload.status === 200) {
          toast(result?.payload?.data.message, {
            hideProgressBar: true,
            autoClose: 3000,
            type: "success",
          });
          dispatch(CloseLoader(false));
        } else {
          dispatch(CloseLoader(false));
          toast(result?.payload?.data.message, {
            hideProgressBar: true,
            autoClose: 3000,
            type: "error",
          });
        }
        console.log("Empty form");
      })
      .catch((err) => {
        console.log(err, "SignUP ERROR");
      });
  };
  return (
    <div className="px-6 sm:px-10">
      <h4 className="text-[24px] dark:text-white font-medium text-gray-900">
        Add Categories
      </h4>
      <div className="bg-white dark:bg-[#0c1a32] grid mt-8 rounded-md shadow-sm align-middle p-4 sm:p-6 lg:p-8 min-h-[77vh]">
        <form
          action="#"
          method="POST"
          className="space-y-6 h-full flex flex-col"
          onSubmit={handleSubmit}
        >
          <div className="flex-1">
            <div className="sm:grid gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="menuname"
                  className="block font-bold text-[14px] md:text-[16px]  leading-6 text-gray500"
                >
                  Categories Name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={categoryData?.name}
                    onChange={(e) => handleCategories(e)}
                    className="block w-full px-6 text-[#6e6e6e] max-w-[500px] dark:text-gray-300 dark:bg-[#20304c] rounded-md border border-[#f0f1f5] focus:border-orange transition duration-300 focus:outline-none focus:ring-0  shadow-none rounded-md bg-white"
                  />
                </div>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="block font-bold text-[14px] md:text-[16px]  leading-6 text-gray500">
                Uploaded Image
              </h3>
              <div className="mt-8">
                {image ? (
                  <div className="h-[250px] w-[250px] shadow-dark15  flex  items-center bg-white p-1">
                    <img
                      src={URL.createObjectURL(image)}
                      alt="image"
                      className="w-full h-full"
                    />
                  </div>
                ) : categoryImage ? (
                  <div className="h-[250px] w-[250px] shadow-dark15  flex  items-center bg-white p-1">
                    <img
                      src={`${API}/image/${categoryImage}`}
                      alt="image"
                      className="w-full h-full"
                    />
                  </div>
                ) : (
                  <div className="sm:h-[250px] w-[200px] h-[200px] sm:w-[250px]  bg-upload-img  flex justify-center items-center">
                    <AiFillCamera className="text-[56px] text-gray500" />
                  </div>
                )}
                <div className="sm:flex items-center mt-7 gap-2">
                  <div className="flex">
                    <input
                      alt="image"
                      type="file"
                      id="image"
                      className="hidden"
                      onChange={(e) => setImage(e.target.files[0])}
                      accept="image/*"
                    />
                    <label
                      htmlFor="image"
                      className="flex bg-orange hover:bg-darkolivegreen cursor-pointer trnasition ease-in duration-300  rounded-[6px]  py-[8.5px] px-[12.6px]  items-center font-bold text-[14px] md:text-[16px]  leading-6 text-white"
                    >
                      <HiOutlineUpload className="text-[24px] mr-2" />
                      Upload Logo
                    </label>
                  </div>
                  <div className="flex gap-2 mt-3 sm:mt-0">
                    <button
                      type="button"
                      className="px-3 flex gap-1.5 items-center py-2 rounded-md bg-[#01b075] hover:bg-[#017d53] trnasition ease-in duration-300 text-white"
                    >
                      <RiImageEditFill /> Edit
                    </button>
                    <button
                      type="button"
                      className="px-3 flex gap-1.5 items-center py-2 rounded-md bg-[#e66430] hover:bg-[#cb4b18] trnasition ease-in duration-300 text-white"
                    >
                      <CgTrash /> Delete
                    </button>
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

export default AddCategories;
