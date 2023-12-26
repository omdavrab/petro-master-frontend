import React, { useMemo } from "react";
import { useSelector } from "react-redux";

const Loader = () => {
  const HandleLoader = useSelector((state) => state.HandleLoader.status);

  return (
    HandleLoader && (
      <div className="fixed inset-0 h-screen z-[99999] loader"></div>
    )
  );
};

export default Loader;
