import React from "react";

const MegaMenu = ({ activeNav, navData, onClose }) => {
  if (!activeNav || !navData[activeNav]) return null;

  const data = navData[activeNav];

  if (data.type === "eyeglasses") {
    const { categories } = data; // categories is the array you exported
    return (
      <div
        className="fixed left-0 top-full w-screen bg-white shadow-xl border-t border-gray-100 z-20"
        onMouseEnter={() => {}}
        onMouseLeave={onClose}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((cat, idx) => (
              <div key={idx}>
                {/* Category image */}
                {cat.image && (
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-24 object-cover rounded-lg mb-4"
                  />
                )}
                {/* <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-4">
                  {cat.title}
                </h3> */}
                <div className="space-y-4">
                  {cat.brands.map((brand, i) => (
                    <div
                      key={i}
                      className="group cursor-pointer flex items-start gap-3"
                    >
                      {/* Brand thumbnail */}
                      {brand.image && (
                        <img
                          src={brand.image}
                          alt={brand.name}
                          className="w-12 h-12 object-contain rounded-md border border-gray-100 flex-shrink-0"
                        />
                      )}
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-gray-800 group-hover:text-[#e79237] transition-colors">
                            {brand.name}
                          </span>
                          <span className="text-xs font-medium text-[#e79237] bg-orange-50 px-2 py-0.5 rounded-full">
                            {brand.price}
                          </span>
                        </div>
                        {brand.sub && (
                          <p className="text-xs text-gray-500 mt-0.5">
                            {brand.sub}
                          </p>
                        )}
                        <div className="h-px bg-gray-100 mt-2 group-hover:bg-[#e79237]/30 transition-colors"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-4 border-t border-gray-100 text-center">
            <a
              href="#"
              className="text-sm font-medium text-[#e79237] hover:underline"
            >
              View all Eyeglasses →
            </a>
          </div>
        </div>
      </div>
    );
  }

  // MegaMenu.jsx – stores case only
  if (data.type === "stores") {
    const imageSrc = data.categories;
    return (
      <div
        className="absolute left-0  w-auto bg-white shadow-xl border-t border-gray-100 z-20"
        onMouseEnter={() => {}}
        onMouseLeave={onClose}
      >
        <a href="/stores" className="block px-4 sm:px-6 lg:px-8">
          <img
            src={imageSrc}
            alt="Stores"
            className="w-full h-auto rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          />
        </a>
      </div>
    );
  }

  return null;
};

export default MegaMenu;
