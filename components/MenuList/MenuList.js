import URL from "@/URL";
import { HandleGetBanner } from "@/redux/action/banner";
import {
  HandleGetFoodCategory,
  HandleGetFoodCategoryByRestaurant,
  HandleGetMenuByCategory,
} from "@/redux/action/foodCategory";
import { CloseLoader, OpenLoader } from "@/redux/action/loader";
import { HandleTrendingItem } from "@/redux/action/restaurant";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const name = [
  {
    name: "Drink",
    image: "/assets/images/drink.jpg",
    href: "/drink",
  },
  {
    name: "Combo Items",
    image: "/assets/images/Combo Items.jpg",
    href: "/drink",
  },
  {
    name: "Appetizers",
    image: "/assets/images/Appetizers.jpg",
    href: "/drink",
  },
  {
    name: "Breakfast",
    image: "/assets/images/Breakfast2.jpg",
    href: "/drink",
  },
  {
    name: "Dinner",
    image: "/assets/images/denner.jpg",
    href: "/drink",
  },
  {
    name: "Flamingos KID",
    image: "/assets/images/FlamingosKID.jpg",
    href: "/drink",
  },
  {
    name: "Omelettes",
    image: "/assets/images/Omelettes.jpg",
    href: "/drink",
  },
  {
    name: "Seafood",
    image: "/assets/images/Seafood.jpg",
    href: "/drink",
  },
  {
    name: "Sopas",
    image: "/assets/images/Sopas.jpg",
    href: "/drink",
  },
  {
    name: "Desserts",
    image: "/assets/images/Desserts2.jpg",
    href: "/drink",
  },
  {
    name: "Sides",
    image: "/assets/images/Sides.jpg",
    href: "/drink",
  },
];
const MenuList = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { table_id, restaurant_id } = router.query;
  const [category, setCategory] = useState([]);
  const FoodCategory = useSelector(
    (state) => state.GetFoodCategoryByRestaurant.categoryByRestaurant
  );
  // const Banner = useSelector((state) => state.Banner.bannerlist)
  // console.log("🚀 ~ file: MenuList.js:82 ~ MenuList ~ Banner:", Banner)

  useEffect(() => {
    if (restaurant_id) {
      dispatch(HandleGetFoodCategoryByRestaurant(restaurant_id));
      // dispatch(HandleGetBanner(restaurant_id))
      // dispatch(HandleTrendingItem(restaurant_id));
    }
  }, [restaurant_id]);

  useEffect(() => {
    setCategory(FoodCategory);
  }, [FoodCategory]);
  return (
    <div>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1">
        {category.length > 0 &&
          category.map((items, index) => {
            return (
              // <Link href={items.href}>
              // <div onClick={() => { router.push({ pathname: `${items.name}`, query: { id: items._id } }) }} key={index} className='px-5 cursor-pointer md:group py-5 hover:border-slate-300 transition duratio-300 border border-transparent '>

              <div
                onClick={async () => {
                  dispatch(OpenLoader(true));
                  await dispatch(HandleGetMenuByCategory(items._id));
                  router.push({
                    pathname: `/${table_id}/${restaurant_id}/${items.name}`,
                    query: { id: items._id },
                  });
                  dispatch(CloseLoader(false));
                }}
                key={index}
                className="px-5 cursor-pointer md:group py-5 hover:border-slate-300 transition duratio-300 border border-transparent "
              >
                <div className="h-[160px] relative overflow-hidden">
                  <div className="absolute opacity-100  group-hover:opacity-100 inset-0 bg-black/[0.5] flex items-center justify-center transition duratio-300 ">
                    <div className="relative group text transition duratio-300 ">
                      <span className="absolute w-0 grouptext-hover:w-full h-[1px]  transition duratio-300 bg-white bottom-0 "></span>
                      <h2 className="text-white font-bold text-[24px]">
                        {items.name}
                      </h2>
                    </div>
                  </div>
                  <img
                    alt=""
                    src={`${URL}/image/${items.image}`}
                    width={1000}
                    height={1000}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              // </Link>
            );
          })}
      </div>
    </div>
  );
};

export default MenuList;
