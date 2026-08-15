import React from "react";
import eye from "/images/top/eyeglasses.webp";
import kid from "/images/top/kidsGlasses.webp";
import sun from "/images/top/sunglasses.webp";
import lenses from "/images/top/contactLenses.webp";
import sale from "/images/top/sale.webp";
import power from "/images/top/specialPower.webp";

const TopCategories = () => {
  const categories = [
    { id: 1, img: eye, name: "Eye Glasses" },
    { id: 2, img: sun, name: "Sunglasses" },
    { id: 3, img: lenses, name: "Contact Lenses" },
    { id: 4, img: power, name: "Special Power" },
    { id: 5, img: kid, name: "Kids Glasses" },
    { id: 6, img: sale, name: "Sale" },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Heading */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8 sm:mb-10 tracking-tight">
        Top Categories
      </h2>

      {/* Responsive Grid - Images Only */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5 md:gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="group flex items-center justify-center bg-white rounded-2xl p-4 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100/80 hover:border-[#e79237]/30 cursor-pointer"
          >
            <img
              src={category.img}
              alt={category.name}
              className="w-full h-auto max-h-28 sm:max-h-32 md:max-h-36 object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopCategories;
