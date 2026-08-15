import React from "react";

// Eyeglasses images
import EyeglassAviator from "/images/shape/Aviator.webp";
import EyeglassCateyede from "/images/shape/Cateyede.webp";
import EyeglassClubmaster from "/images/shape/Clubmaster.webp";
import EyeglassGeometric from "/images/shape/Geometric.webp";
import EyeglassRectangle from "/images/shape/Rectangle.webp";
import EyeglassRound from "/images/shape/Round.webp";
import EyeglassSquare from "/images/shape/square.webp";

// Sunglasses images
import SunAviator from "/images/shape/Aviator-sun.webp";
import SunCateyede from "/images/shape/cat-eye-sun.webp";
import SunClubmaster from "/images/shape/Clubmaster-sun.webp";
import SunGeometric from "/images/shape/Geometric-sun.webp";
import SunRectangle from "/images/shape/Rectangle-sun.webp";
import SunRound from "/images/shape/Round-sun.webp";
import SunSquare from "/images/shape/square-sun.webp";

// Reusable horizontal scroll row
const ShapeRow = ({ title, icon, shapes }) => (
  <div className="mb-12 last:mb-0">
    {/* Section Header */}
    <div className="flex items-center gap-3 mb-5">
      <span className="text-2xl">{icon}</span>
      <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">
        {title}
      </h3>
      <span className="hidden sm:block h-0.5 flex-1 bg-gradient-to-r from-[#e79237]/30 to-transparent"></span>
    </div>

    {/* Scrollable Container */}
    <div className="relative">
      {/* Gradient fades on mobile edges */}
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none sm:hidden"></div>
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none sm:hidden"></div>

      <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory scrollbar-hide">
        {shapes.map((shape) => (
          <div
            key={shape.id}
            className="flex-shrink-0 w-32 sm:w-40 md:w-48 lg:w-56 snap-start group cursor-pointer"
          >
            <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border border-gray-100/80 hover:border-[#e79237]/30">
              <div className="aspect-square w-full flex items-center justify-center">
                <img
                  src={shape.img}
                  alt={shape.alt}
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Shape = () => {
  // Eyeglasses shapes
  const eyeglassShapes = [
    { id: 1, img: EyeglassAviator, alt: "Aviator" },
    { id: 2, img: EyeglassCateyede, alt: "Cat Eye" },
    { id: 3, img: EyeglassClubmaster, alt: "Clubmaster" },
    { id: 4, img: EyeglassGeometric, alt: "Geometric" },
    { id: 5, img: EyeglassRectangle, alt: "Rectangle" },
    { id: 6, img: EyeglassRound, alt: "Round" },
    { id: 7, img: EyeglassSquare, alt: "Square" },
  ];

  // Sunglasses shapes
  const sunglassShapes = [
    { id: 8, img: SunAviator, alt: "Aviator" },
    { id: 9, img: SunCateyede, alt: "Cat Eye" },
    { id: 10, img: SunClubmaster, alt: "Clubmaster" },
    { id: 11, img: SunGeometric, alt: "Geometric" },
    { id: 12, img: SunRectangle, alt: "Rectangle" },
    { id: 13, img: SunRound, alt: "Round" },
    { id: 14, img: SunSquare, alt: "Square" },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Main Heading */}
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 tracking-tight">
          Get the Perfect Shape –{" "}
          <span className="text-[#e79237]">Eyeglasses &amp; Sunglasses</span>
        </h2>
        <p className="text-sm text-gray-500 mt-2 hidden sm:block">
          Scroll horizontally to explore all shapes
        </p>
      </div>

      {/* Eyeglasses Row */}
      <ShapeRow title="Eyeglasses" icon="👓" shapes={eyeglassShapes} />

      {/* Sunglasses Row */}
      <ShapeRow title="Sunglasses" icon="🕶️" shapes={sunglassShapes} />

      {/* Mobile swipe hint (visible only on small screens) */}
      <div className="flex justify-center gap-1 mt-4 sm:hidden">
        <span className="text-[10px] text-gray-400 animate-pulse">
          ← Swipe →
        </span>
      </div>
    </section>
  );
};

export default Shape;
