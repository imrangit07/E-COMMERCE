import React from "react";

const Banner = ({ banner }) => {
  return (
    <div className="w-full">
      <div className="w-full aspect-[16/5] sm:aspect-[16/4] md:aspect-[16/3.5] lg:aspect-[16/3] overflow-hidden">
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
