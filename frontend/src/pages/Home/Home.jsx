import React from "react";
import mainImg from "/hero-main.webp";
import womanImg from "/woman-sunglasses.webp";
import glassesImg from "/glasses.webp";
import TopCategories from "./TopCategories";
import Banner from "./Banner";
import Shape from "./Shape";
import banner from "/banner/FLR1IN.webp";
import banner1 from "/banner/ban-buy1-get1.webp";
import dobanner from "/banner/DoMore.webp";
import Hero from "./Hero";
import { BACKEND_URL } from "../../config/config";

const Home = () => {
  console.log(BACKEND_URL);
  
  return (
    <>
      <div>
        <Hero />
      </div>
      <div>
        <TopCategories />
      </div>
      <div>
        <Banner banner={banner} />
      </div>
      <div>
        <Shape />
      </div>
      <div>
        <Banner banner={banner1} />
      </div>
      <div>
        <Banner banner={dobanner} />
      </div>
    </>
  );
};

export default Home;
