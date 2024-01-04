import React from "react";
import { useSelector } from "react-redux";

const Loader = () => {
  const HandleLoader = useSelector((state) => state.HandleLoader.status);

  return (
    HandleLoader && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="spinner"></div>
      </div>
    )
  );
};

export default Loader;
