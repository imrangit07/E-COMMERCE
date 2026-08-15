import React from "react";

const Banner = ({ banner }) => {
  return (
    <div className="w-full">
      <div className="w-full h-48 sm:h-64 md:h-80 lg:h-96 overflow-hidden">
        <img
          src={banner}
          alt="Banner"
          className="w-full h-full object-cover object-center"
        />
      </div>
    </div>
  );
};

export default Banner;
