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
                    <div key={i} className="group cursor-pointer">
                      {brand.image ? (
                        <img
                          src={brand.image}
                          alt={brand.name || "Brand"}
                          className="w-full h-full object-contain rounded-md flex-shrink-0"
                        />
                      ) : brand.reading ? (
                        <div className="flex flex-wrap gap-2">
                          {brand.reading.map((power, pIdx) => {
                            if (power === "view all") {
                              return (
                                <a
                                  key={pIdx}
                                  href="#"
                                  className="px-5 py-3 bg-gray-100 text-gray-800 text-sm rounded-2xl hover:bg-gray-200 transition"
                                >
                                  View all <span>→</span>
                                </a>
                              );
                            }
                            return (
                              <span
                                key={pIdx}
                                className="px-5 py-3 bg-gray-100 text-gray-800 text-sm rounded-2xl hover:bg-gray-200 transition"
                              >
                                +{power}
                              </span>
                            );
                          })}
                        </div>
                      ) : null}
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
