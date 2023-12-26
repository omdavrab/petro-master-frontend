import API from "@/URL";
import {
  HandleBannerCreate,
  HandleDeleteBanner,
  HandleGetBanner,
} from "@/redux/action/banner";
import { CloseLoader, OpenLoader } from "@/redux/action/loader";
import React, { useEffect, useState } from "react";
import { VscClose } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
const Homepage = () => {
  const dispatch = useDispatch();
  const Banner = useSelector((state) => state.Banner.bannerlist);
  const [inputFields, setInputFields] = useState([]);
  const [inputImageFields, setInputImageFields] = useState([]);
  const [removeBannerID, setRemoveBannerID] = useState([]);

  const addInputField = () => {
    setInputFields([...inputFields, { image: null }]);
  };
  const handleImageChange = (index, event) => {
    const values = [...inputFields];
    const val = [...inputImageFields];
    val[index] = event.target.files[0];
    values[index].image = event.target.files[0];
    setInputFields(values);
    setInputImageFields(val);
  };

  const removeInputField = (index, id) => {
    let removeid = [];
    removeid.push(...removeBannerID, id);
    const values = [...inputFields];
    const val = [...inputImageFields];
    values.splice(index, 1);
    val.splice(index, 1);
    setInputFields(values);
    setRemoveBannerID(removeid);
    setInputImageFields(val);
  };

  const clearImage = (index) => {
    const values = [...inputFields];
    values[index].image = null;
    setInputFields(values);
  };

  const handlebanner = (event) => {
    event.preventDefault();
    dispatch(OpenLoader(true));
    // Filter out null values from inputImageFields array
    const filteredInputImageFields = inputImageFields.filter(
      (image) => image !== undefined
    );
    if (filteredInputImageFields.length > 0) {
      const formData = new FormData();
      filteredInputImageFields.forEach((image) => {
        formData.append("image", image);
      });
      dispatch(HandleBannerCreate(formData))
        .then((result) => {
          if (result.payload.status === 200) {
            toast(result?.payload?.data.message, {
              hideProgressBar: true,
              autoClose: 3000,
              type: "success",
            });
            //   setInputFields([{ image: null }]);
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
    }
    if (removeBannerID.length > 0) {
      dispatch(HandleDeleteBanner(removeBannerID))
        .then((result) => {
          if (result.payload.status === 200) {
            toast(result?.payload?.data.message, {
              hideProgressBar: true,
              autoClose: 3000,
              type: "success",
            });
            //   setInputFields([{ image: null }]);
            dispatch(HandleGetBanner());
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
    }
    dispatch(CloseLoader(false));
  };

  useEffect(() => {
    dispatch(HandleGetBanner());
  }, []);

  useEffect(() => {
    setInputFields(Banner);
  }, [Banner]);
  return (
    <div className="px-6 sm:px-10">
      <h4 className="text-[24px] dark:text-white font-medium text-gray-900">
        Home Page Settings
      </h4>
      <div className="bg-white dark:bg-[#0c1a32] mt-8 rounded-md shadow-sm align-middle  max-w-5xl">
        <div className="border-b py-4 px-5 dark:border-gray-600 ">
          <h2 className="text-[20px] dark:text-white/[85%] text-medium text-gray-800">
            Slider
          </h2>
        </div>
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="flex">
            <div className="text-[#0c5460] mb-4 bg-[#d1ecf1] text-xs leading-[1.5] rounded border border-[#bee5eb] p-[.75rem_1.25rem]">
              We have limited banner height to maintain UI. We had to crop from
              both left & right side in view for different devices to make it
              responsive. Before designing banner keep these points in mind.
            </div>
          </div>
          <form onSubmit={handlebanner}>
            <label className="text-xs mb-2 block">Photos</label>
            <div>
              {inputFields.map((data, index) => {
                console.log(
                  "🚀 ~ file: index.js:90 ~ {inputFields.map ~ data:",
                  data.image
                );
                const { image } = data;
                const imageName = image ? image.name : "";
                return (
                  <div key={index} className="">
                    <div className="flex gap-4 mt-2 items-center">
                      <div className="flex ">
                        <input
                          type="file"
                          id={`image_${index}`}
                          className="hidden"
                          onChange={(e) => handleImageChange(index, e)}
                          accept="image/*"
                        />
                        <label
                          htmlFor={`image_${index}`}
                          className="flex dark:bg-[#20304c] bg-[#f7f8fa] text-[14px] border dark:border-[#20304c] border-[#dfdfe6] cursor-pointer rounded-l-[6px]  py-[8.5px] px-[12.6px]  items-center  text-xs md:text-[16px]  leading-6 text-[#74788d]"
                        >
                          Browse
                        </label>
                        <div className="sm:min-w-[300px] max-w-[300px] truncate dark:border-[#20304c]  border border-l-0 text-[#898b92] text-[14px] flex items-center px-5 border-[#dfdfe6] rounded-r-[6px] w-full">
                          <span className=" truncate text-ellipsis">
                            {imageName || data.image || "Choose file"}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeInputField(index, data._id)}
                        type="button"
                        className="rounded-full w-[35px] font-normal h-[35px] text-center hover:bg-[#ef486a] transition duration-300 hover:text-[#fff] text-[#ef486a] bg-[#ef486a26] "
                      >
                        <VscClose className="mx-auto" />
                      </button>
                    </div>
                    {data._id ? (
                      <div className="h-[80px] border rounded mt-3 mb-6 relative w-[160px] shadow-lg  shadow-dark15  flex justify-center items-center bg-white p-1">
                        <img
                          src={`${API}/image/${data.image}`}
                          alt="image"
                          className="w-full h-full"
                        />
                        {/* <button
                                                        onClick={() => clearImage(index)}
                                                        type='button'
                                                        className='rounded-full absolute -right-[10px] -top-[10px] w-[25px] font-normal h-[25px] text-center  text-orange bg-[#eaeaea] '
                                                    >
                                                        <VscClose className='mx-auto' />
                                                    </button> */}
                      </div>
                    ) : (
                      data.image && (
                        <div className="h-[80px] border rounded mt-3 mb-6 relative w-[160px] shadow-lg  shadow-dark15  flex justify-center items-center bg-white p-1">
                          <img
                            src={URL?.createObjectURL(data.image)}
                            alt="image"
                            className="w-full h-full"
                          />
                          <button
                            onClick={() => clearImage(index)}
                            type="button"
                            className="rounded-full absolute -right-[10px] -top-[10px] w-[25px] font-normal h-[25px] text-center  text-orange bg-[#eaeaea] "
                          >
                            <VscClose className="mx-auto" />
                          </button>
                        </div>
                      )
                    )}
                  </div>
                );
              })}
            </div>
            <button
              onClick={addInputField}
              type="button"
              className="px-4 mt-5 py-2 text-black text-[13px] hover:text-white hover:bg-[#8f97ab] transition duration-300 rounded dark:text-white dark:bg-[#63789d] bg-gray-200"
            >
              Add New
            </button>
            <div className="text-end">
              <button
                type="submit"
                className="rounded bg-orange py-[9px]  hover:bg-[#e56f0e] transition duration-300 text-white text-[14px] px-[19px]"
              >
                Update
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
export default Homepage;
