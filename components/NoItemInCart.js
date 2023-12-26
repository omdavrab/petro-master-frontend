import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

const NoItemInCart = () => {
  const router = useRouter();
  return (
    <div className="max-w-[400px] h-full flex flex-col justify-center  mx-auto w-full">
      <div>
        <div className="flex-none h-full md:max-w-auto mx-auto ">
          <Image
            width={300}
            height={300}
            src="/assets/icons/cart.png"
            className="mx-auto"
            alt="cart"
          />
        </div>
      </div>
      <div>
        <h3 className="text-gray-400 text-center my-6 text-[18px] font-semibold">
          NO ORDER FOUND
        </h3>
      </div>
      <div className="flex items-center mt-14 justify-center">
        <button
          className="text-white  px-6 font-medium py-1.5 bg-orange rounded shadow-lg"
          onClick={() => router.back()}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default NoItemInCart;
