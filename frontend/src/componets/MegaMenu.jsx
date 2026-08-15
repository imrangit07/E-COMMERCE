import React from "react";

const MegaMenu = ({ activeNav, navData, onClose }) => {
  if (!activeNav || !navData[activeNav]) return null;

  const { subcategories, image, description } = navData[activeNav];

  return (
    <div
      className="absolute left-0 top-full w-screen bg-white shadow-xl border-t border-gray-100 z-20"
      onMouseEnter={() => {
        // cancel any pending close timer (handled by parent)
      }}
      onMouseLeave={onClose}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Subcategories column */}
          <div className="md:col-span-3">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {activeNav}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {subcategories.map((sub, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="text-sm text-gray-600 hover:text-[#e79237] hover:bg-orange-50 rounded-md px-3 py-2 transition-colors"
                >
                  {sub}
                </a>
              ))}
            </div>
          </div>

          {/* Feature image / promo */}
          {image && (
            <div className="hidden md:block">
              <img
                src={image}
                alt={activeNav}
                className="w-full h-48 object-cover rounded-xl"
              />
              {description && (
                <p className="text-sm text-gray-500 mt-2">{description}</p>
              )}
              <a
                href="#"
                className="inline-block mt-3 text-sm font-medium text-[#e79237] hover:underline"
              >
                View all {activeNav} →
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;