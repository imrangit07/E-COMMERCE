import React from "react";
import mainImg from "/hero-main.webp";
import womanImg from "/woman-sunglasses.webp";
import glassesImg from "/glasses.webp";

const Hero = () => {
  return (
    <section className="flex flex-col gap-5 bg-white px-4 py-2.5 md:flex-row md:px-10">
      {/* ---------- LEFT SIDE (Main Image) ---------- */}
      <div className="relative flex-[2]">
        <img
          src={mainImg}
          alt="Main Glasses"
          className="h-auto w-full rounded-lg"
        />

        {/* Text Overlay on Main Image */}
        <div className="absolute left-5 top-1/2 max-w-[300px] -translate-y-1/2 text-gray-900">
          <p className="text-sm tracking-[2px] text-gray-700 md:text-xl">
            GREAT ACCESSORIES
          </p>
          <h1 className="my-2.5 text-2xl font-bold leading-tight md:text-6xl w-2xl">
            Forest Eyes <br /> Glasses
          </h1>
          <p className="my-5 text-base md:text-lg">
            Sale up to <span className="font-bold text-red-600">30% off</span>
          </p>
          <button className="mt-2.5 cursor-pointer rounded-full bg-gray-900 px-5 py-2 text-sm text-white transition hover:bg-gray-700 md:py-2.5">
            Shop All Glasses
          </button>
        </div>
      </div>

      {/* ---------- RIGHT SIDE (Two Boxes) ---------- */}
      <div className="flex flex-1 flex-row gap-1 md:flex-col md:gap-5">
        {/* Box 1: Woman Sunglasses */}
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={womanImg}
            alt="Woman Sunglasses"
            className="h-auto w-full rounded-lg"
          />
          <div className="absolute right-[2%] top-[15%] text-black">
            <p className="text-sm tracking-[2px] text-gray-700 md:text-sm">
              WOMAN SUNGLASSES
            </p>
            <h2 className="my-2.5 text-base font-bold md:text-2xl">GARAMOND</h2>
            <span className="cursor-pointer font-bold no-underline hover:underline">
              SHOP NOW
            </span>
          </div>
        </div>

        {/* Box 2: How to Order */}
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={glassesImg}
            alt="How to Order Eyeglasses"
            className="h-auto w-full rounded-lg"
          />
          <div className="absolute right-[4%] top-[15%] text-black">
            <p className="text-sm tracking-[2px] text-gray-700 md:text-xl">
              FLAT 30% OFF
            </p>
            <h2 className="my-2.5 text-base font-bold leading-tight md:text-2xl">
              HOW TO ORDER <br /> EYEGLASSES
            </h2>
            <span className="cursor-pointer font-bold no-underline hover:underline">
              SHOP NOW
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
