import React, { useEffect, useMemo, useState } from "react";
import { AiFillCamera } from "react-icons/ai";
import { HiOutlineUpload } from "react-icons/hi";
import { RiImageEditFill } from "react-icons/ri";
import { CgTrash } from "react-icons/cg";
import { MdAddCircleOutline } from "react-icons/md";
import { TbTrash } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  HandleEditMenu,
  HandleGetMenuById,
  HandleMenu,
} from "@/redux/action/menu";
import { CloseLoader, OpenLoader } from "@/redux/action/loader";
import Loader from "@/components/admin/Loader";
import { HandleGetFoodCategory } from "@/redux/action/foodCategory";
import { useRouter } from "next/router";
import API from "@/URL";
// import { URL } from 'url';

const AddNewMenu = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [image, setImage] = useState();
  const [menuImage, setMenuImage] = useState();
  const [customization, setCustomization] = useState();
  const [veg, setVeg] = useState();
  const [menuData, setMenuData] = useState({});
  const [categoryData, setCategoryData] = useState([]);
  const category = useSelector((state) => state.FoodCategory.getFoodCategory);
  const MenuById = useSelector((state) => state.MenuId.menuId.result);

  const { id } = router.query;
  const handleRadioChange = (value) => {
    setPayment(value);
  };
  const [inputFields, setInputFields] = useState([
    { customizeItem: "", customizeItemPrice: "" },
  ]);

  useEffect(() => {
    if (id && MenuById) {
      setVeg(MenuById?.vegetarian);
      setMenuImage(MenuById.image);
      setCustomization(MenuById?.customizeable);
      setMenuData({
        name: MenuById?.name,
        price: MenuById?.price,
        description: MenuById?.description,
        category: MenuById?.category,
      });
    } else {
      setVeg();
      setMenuImage("");
      setInputFields([{ customizeItem: "", customizeItemPrice: "" }]);
      setCustomization(false);
      setMenuData({
        name: "",
        price: "",
        description: "",
        category: "",
      });
    }
  }, [MenuById, router]);

  const addInputField = () => {
    setInputFields([
      ...inputFields,
      {
        customizeItem: "",
        customizeItemPrice: "",
      },
    ]);
  };
  const outputList = inputFields.map((item) => item.customizeItem);

  const removeInputFields = (index) => {
    const rows = [...inputFields];
    rows.splice(index, 1);
    setInputFields(rows);
  };

  const handleChange = (index, evnt) => {
    const { name, value } = evnt.target;
    const list = [...inputFields];
    list[index][name] = value;
    setInputFields(list);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const [categoryId, categoryName] = menuData?.category?.split(","); // split value into parts
    dispatch(OpenLoader(true));
    const formData = new FormData();
    formData.append("name", menuData.name);
    formData.append("price", menuData.price);
    formData.append("description", menuData.description);
    formData.append("category", categoryName);
    formData.append("image", image);
    formData.append("vegetarian", veg);
    formData.append("customizeable", customization);
    formData.append("customizeItem", JSON.stringify(inputFields));
    formData.append("categoryId", categoryId);

    await dispatch(
      id ? HandleEditMenu({ formData, id: id }) : HandleMenu(formData)
    )
      .then((result) => {
        if (result.payload.status === 200) {
          toast(result?.payload?.data.message, {
            hideProgressBar: true,
            autoClose: 3000,
            type: "success",
          });
          setVeg("");
          setMenuImage("");
          setCustomization();
          setMenuData({});
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
        console.log(err, "SignUP ERROR");
      });
  };
  const handleData = (e) => {
    setMenuData({ ...menuData, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    dispatch(HandleGetFoodCategory());
    if (id) {
      dispatch(HandleGetMenuById(id));
    }
  }, []);

  useEffect(() => {
    setCategoryData(category);
  }, [category]);
  return (
    <div className="px-6 sm:px-10">
      <h4 className="text-[24px] dark:text-white font-medium text-gray-900">
        Add/Edit Menu
      </h4>
      <div className="bg-white dark:bg-[#0c1a32] inline-block min-w-full mt-8 rounded-md shadow-sm align-middle p-4 sm:p-6 lg:p-8">
        <div>
          <form
            action="#"
            method="POST"
            className="space-y-6"
            onSubmit={handleSubmit}
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="block font-bold text-[14px] md:text-[16px]  leading-6 text-gray500"
                >
                  Menu Name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={menuData?.name}
                    onChange={(e) => handleData(e)}
                    className="block w-full px-6 text-[#6e6e6e] dark:text-gray-300 dark:bg-[#20304c] rounded-md border border-[#f0f1f5] focus:border-orange transition duration-300 focus:outline-none focus:ring-0  shadow-none rounded-md bg-white"
                  />
                </div>
              </div>
              <div className="">
                <h3 className="block font-bold text-[14px] md:text-[16px]  leading-6 text-gray500">
                  Vegeterian
                </h3>
                <div className="flex items-center mt-3 gap-6">
                  <div className="flex items-center gap-2">
                    <input
                      onChange={(e) => setVeg(true)}
                      checked={veg}
                      // defaultChecked={MenuById?.vegetarian ? true:false}
                      id="yes"
                      name="vegeterian"
                      type="radio"
                      value="true"
                      className="dark:checked:bg-orange checked:bg-orange cursor-pointer dark:bg-[#20304c] dark:checked:hover:bg-orange checked:hover:bg-orange dark:checked:active:bg-orange checked:active:bg-orange checked:focus:bg-orange focus:bg-orange focus:outline-none focus:ring-1 focus:ring-orange"
                    />
                    <label
                      htmlFor="ingredients"
                      className="block font-bold text-[14px] md:text-[16px]  leading-6 text-gray500"
                    >
                      Yes
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      onChange={(e) => setVeg(false)}
                      checked={veg === false}
                      id="no"
                      name="vegeterian"
                      type="radio"
                      value="false"
                      className="dark:checked:bg-orange checked:bg-orange cursor-pointer dark:bg-[#20304c] dark:checked:hover:bg-orange checked:hover:bg-orange dark:checked:active:bg-orange checked:active:bg-orange checked:focus:bg-orange focus:bg-orange focus:outline-none focus:ring-1 focus:ring-orange"
                    />
                    <label
                      htmlFor="ingredients"
                      className="block font-bold text-[14px] md:text-[16px]  leading-6 text-gray500"
                    >
                      No
                    </label>
                  </div>
                </div>
              </div>
              <div>
                <label
                  htmlFor="ingredients"
                  className="block font-bold text-[14px] md:text-[16px]  leading-6 text-gray500"
                >
                  Category
                </label>
                <div className="mt-2">
                  <select
                    id="category"
                    name="category"
                    required
                    value={menuData.category}
                    className="block w-full px-6 text-[#6e6e6e] rounded-md dark:text-gray-300 border border-[#f0f1f5] dark:bg-[#20304c] focus:border-orange transition duration-300 focus:outline-none focus:ring-0  shadow-none rounded-md bg-white"
                    onChange={(e) => {
                      handleData(e);
                      // setCategoryId(e.target.value);
                    }}
                  >
                    <option name="category">Please select category</option>
                    {categoryData.length > 0 &&
                      categoryData?.map((item) => {
                        const value = `${item._id},${item.name}`;
                        return (
                          <option name="category" value={value}>
                            {item.name}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>
              <div>
                <label
                  htmlFor="price"
                  className="block font-bold text-[14px] md:text-[16px]  leading-6 text-gray500"
                >
                  Price
                </label>
                <div className="mt-2 relative rounded-md overflow-hidden">
                  <input
                    id="price"
                    name="price"
                    required
                    value={menuData?.price}
                    type="number"
                    onChange={(e) => handleData(e)}
                    className="block w-full pl-12 pr-6 text-[#6e6e6e] rounded-md dark:text-gray-300 border dark:bg-[#20304c]  border-[#f0f1f5] focus:border-orange transition duration-300 focus:outline-none focus:ring-0  shadow-none rounded-md bg-white"
                  />
                  <span className="bg-orange dark:text-gray-200 h-full flex items-center justify-center w-10 h-full absolute top-0 text-gray-600">
                    $
                  </span>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="menuname"
                  className="block font-bold text-[14px] md:text-[16px]  leading-6 text-gray500"
                >
                  Ingredients and Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    name="description"
                    required
                    value={menuData?.description}
                    onChange={(e) => handleData(e)}
                    className="block w-full px-6 text-[#6e6e6e] rounded-md border border-[#f0f1f5] focus:border-orange dark:text-gray-300 dark:bg-[#20304c] transition duration-300 focus:outline-none focus:ring-0  shadow-none rounded-md bg-white"
                  />
                </div>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="block font-bold text-[14px] md:text-[16px]  leading-6 text-gray500">
                Uploaded Image
              </h3>
              <div className="mt-8">
                {image || menuImage ? (
                  <div className="h-[250px] w-[250px] shadow-dark15  flex  items-center bg-white p-1">
                    {menuImage ? (
                      <img
                        src={`${API}/image/${menuImage}`}
                        alt="image"
                        className="w-full h-full"
                      />
                    ) : (
                      <img
                        src={URL.createObjectURL(image)}
                        alt="image"
                        className="w-full h-full"
                      />
                    )}
                  </div>
                ) : (
                  <div className="sm:h-[250px] w-[200px] h-[200px] sm:w-[250px]  bg-upload-img  flex justify-center items-center">
                    <AiFillCamera className="text-[56px] text-gray500" />
                  </div>
                )}
                <div className="sm:flex items-center mt-7 gap-2">
                  <div className="flex">
                    <input
                      type="file"
                      id="image"
                      name="image"
                      className="hidden"
                      onChange={(e) => {
                        setImage(e.target.files[0]);
                        console.log(e, "Event");
                      }}
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
            <div className="mt-6">
              <h3 className="block font-bold text-[14px] md:text-[16px]  leading-6 text-gray500">
                Item Customization
              </h3>
              <div className="flex items-center mt-3 gap-6">
                <div className="flex items-center gap-2">
                  <input
                    onChange={(e) => setCustomization(true)}
                    checked={customization}
                    name="customizeable"
                    id="yes"
                    type="radio"
                    value="true"
                    className="dark:checked:bg-orange checked:bg-orange cursor-pointer dark:bg-[#20304c] dark:checked:hover:bg-orange checked:hover:bg-orange dark:checked:active:bg-orange checked:active:bg-orange checked:focus:bg-orange focus:bg-orange focus:outline-none focus:ring-1 focus:ring-orange"
                  />
                  <label
                    htmlFor="ingredients"
                    className="block font-bold text-[14px] md:text-[16px]  leading-6 text-gray500"
                  >
                    Yes
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    onChange={(e) => setCustomization(false)}
                    checked={customization === false}
                    name="customizeable"
                    id="no"
                    type="radio"
                    value="false"
                    className="dark:checked:bg-orange checked:bg-orange cursor-pointer dark:bg-[#20304c] dark:checked:hover:bg-orange checked:hover:bg-orange dark:checked:active:bg-orange checked:active:bg-orange checked:focus:bg-orange focus:bg-orange focus:outline-none focus:ring-1 focus:ring-orange"
                  />
                  <label
                    htmlFor="ingredients"
                    className="block font-bold text-[14px] md:text-[16px]  leading-6 text-gray500"
                  >
                    No
                  </label>
                </div>
              </div>
              {customization === true ? (
                <div className="max-w-lg">
                  {inputFields.map((data, index, { length }) => {
                    const { customizeItem, emailAddress, salary } = data;
                    return (
                      <div key={index} className="mt-2 flex gap-3 sm:gap-10">
                        <div className="flex-1 flex gap-2">
                          <input
                            id="customizeItem"
                            name="customizeItem"
                            type="text"
                            // onChange={(e) => handleData(e)}
                            onChange={(evnt) => handleChange(index, evnt)}
                            defaultValue={MenuById?.customizeItem}
                            placeholder="Item Customization Name"
                            className="block w-[80%] px-6 text-[#6e6e6e] rounded-md border border-[#f0f1f5] dark:bg-[#20304c] dark:text-gray-200 focus:border-orange transition duration-300 focus:outline-none focus:ring-0  shadow-none rounded-md bg-white"
                          />
                          <input
                            id="customizeItemPrice"
                            name="customizeItemPrice"
                            type="number"
                            onChange={(evnt) => handleChange(index, evnt)}
                            // onChange={(evnt) => handleChange(index, evnt)}
                            defaultValue={MenuById?.customizeItemPrice}
                            placeholder="Price"
                            className="block w-[80px] text-center px-3 text-[#6e6e6e] rounded-md border border-[#f0f1f5] dark:bg-[#20304c] dark:text-gray-200 focus:border-orange transition duration-300 focus:outline-none focus:ring-0  shadow-none rounded-md bg-white"
                          />
                        </div>
                        <div className="flex w-[48px] items-center gap-2">
                          {inputFields.length !== 1 ? (
                            <button
                              onClick={removeInputFields}
                              className="text-[20px]  text-red-500 hover:text-red-700 trnasition ease-in duration-300 "
                            >
                              <TbTrash />
                            </button>
                          ) : (
                            ""
                          )}
                          {length - 1 === index ? (
                            <button
                              onClick={addInputField}
                              className="text-[20px] text-blue-500 hover:text-blue-700 trnasition ease-in duration-300  outline-none"
                            >
                              <MdAddCircleOutline />
                            </button>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <></>
              )}
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
export default AddNewMenu;
