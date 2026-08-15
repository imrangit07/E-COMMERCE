import React from "react";
import mainImg from "/hero-main.webp";
import womanImg from "/woman-sunglasses.webp";
import glassesImg from "/glasses.webp";
import TopCategories from "./TopCategories";
import Banner from "/banner";
import Shape from "./Shape";
import banner from "/banner/FLR1IN.webp";
import banner1 from "/banner/ban-buy1-get1.webp";
import dobanner from "/banner/do-more-be-more.webp";
import Hero from "./Hero";

const Home = () => {
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
