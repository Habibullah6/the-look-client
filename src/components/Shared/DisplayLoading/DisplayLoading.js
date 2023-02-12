import React from "react";
import { Puff } from "react-loader-spinner";

const DisplayLoading = () => {
  return (
    <div className="flex justify-center items-center h-[600px]">
      <Puff
        height="80"
        width="80"
        radius={1}
        color="#6366f1"
        ariaLabel="puff-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default DisplayLoading;
