import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetItemsQuery } from "../../services/ItemServices";
import { BACKEND_URL } from "../../config/config";

// ======================================================
// FILTER SECTIONS
// ======================================================

const filterSections = [
  {
    id: "price",
    label: "Price",
    type: "range",
    min: 0,
    max: 5000,
    step: 100,
  },

  {
    id: "gender",
    label: "Gender",
    type: "checkbox",
    options: ["MEN", "WOMEN", "UNISEX"],
  },

  {
    id: "frameShape",
    label: "Frame Shape",
    type: "checkbox",
    options: [
      "RECTANGLE",
      "ROUND",
      "SQUARE",
      "CAT EYE",
      "AVIATOR",
      "WAYFARER",
    ],
  },

  {
    id: "frameType",
    label: "Frame Type",
    type: "checkbox",
    options: [
      "FULL RIM",
      "HALF RIM",
      "RIMLESS",
    ],
  },

  {
    id: "brand",
    label: "Brand",
    type: "checkbox",
    options: [
      "OPTICART",
      "VISIONPRO",
      "RAY-BAN",
      "OAKLEY",
      "PRADA",
      "GUCCI",
    ],
  },
];


// ======================================================
// ITEMS COMPONENT
// ======================================================

const Items = () => {
  const { slug } = useParams();

  console.log("BACKEND URL:", BACKEND_URL);

  // ====================================================
  // API
  // ====================================================

  const {
    data,
    isLoading,
    isError,
    error,
  } = useGetItemsQuery();

  // ====================================================
  // STATE
  // ====================================================

  const [showFilters, setShowFilters] = useState(false);

  const [sortBy, setSortBy] = useState("recommended");

  const [tryIn3D, setTryIn3D] = useState(false);

  const initialFilters = {
    price: [0, 5000],
    gender: [],
    frameShape: [],
    frameType: [],
    brand: [],
  };

  const [filters, setFilters] = useState(initialFilters);

  // ====================================================
  // LOADING
  // ====================================================

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <p className="text-gray-500 text-lg">
          Loading products...
        </p>
      </div>
    );
  }

  // ====================================================
  // ERROR
  // ====================================================

  if (isError) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center">
        <p className="text-red-500 text-lg">
          Failed to load products.
        </p>

        <p className="text-gray-500 text-sm mt-2">
          {error?.data?.message || "Something went wrong"}
        </p>
      </div>
    );
  }

  // ====================================================
  // API PRODUCTS
  // ====================================================

  const products = data?.products || [];

  console.log("Products:", products);

  // ====================================================
  // CHECKBOX FILTER
  // ====================================================

  const handleCheckboxChange = (sectionId, value) => {
    setFilters((prev) => {
      const current = prev[sectionId] || [];

      const updated = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value];

      return {
        ...prev,
        [sectionId]: updated,
      };
    });
  };

  // ====================================================
  // PRICE FILTER
  // ====================================================

  const handlePriceChange = (newRange) => {
    setFilters((prev) => ({
      ...prev,
      price: newRange,
    }));
  };

  // ====================================================
  // APPLY FILTER
  // ====================================================

  const handleApply = () => {
    setShowFilters(false);
  };

  // ====================================================
  // CLEAR ALL FILTERS
  // ====================================================

  const handleClearAll = () => {
    setFilters({
      ...initialFilters,
      price: [...initialFilters.price],
    });
  };

  // ====================================================
  // FILTER PRODUCTS
  // ====================================================

  const filteredProducts = products.filter((product) => {
    // -----------------------------------------------
    // PRICE
    // -----------------------------------------------

    const price = Number(product.sellingPrice || 0);

    if (
      price < filters.price[0] ||
      price > filters.price[1]
    ) {
      return false;
    }

    // -----------------------------------------------
    // GENDER
    // -----------------------------------------------

    if (
      filters.gender.length > 0 &&
      !filters.gender.includes(product.gender)
    ) {
      return false;
    }

    // -----------------------------------------------
    // FRAME SHAPE
    // -----------------------------------------------

    if (
      filters.frameShape.length > 0 &&
      !filters.frameShape.includes(product.frameShape)
    ) {
      return false;
    }

    // -----------------------------------------------
    // FRAME TYPE
    // -----------------------------------------------

    if (
      filters.frameType.length > 0 &&
      !filters.frameType.includes(product.frameType)
    ) {
      return false;
    }

    // -----------------------------------------------
    // BRAND
    // -----------------------------------------------

    if (
      filters.brand.length > 0 &&
      !filters.brand.includes(product.brand)
    ) {
      return false;
    }

    return true;
  });

  // ====================================================
  // SORT PRODUCTS
  // ====================================================

  const sortedProducts = [...filteredProducts].sort(
    (a, b) => {
      if (sortBy === "price-low") {
        return (
          Number(a.sellingPrice || 0) -
          Number(b.sellingPrice || 0)
        );
      }

      if (sortBy === "price-high") {
        return (
          Number(b.sellingPrice || 0) -
          Number(a.sellingPrice || 0)
        );
      }

      return 0;
    }
  );

  // ====================================================
  // RENDER
  // ====================================================

  return (
    <div className="max-w-[90vw] mx-auto min-h-[calc(100vh-64px)]">

      {/* ==================================================
          MOBILE FILTER BUTTON
      ================================================== */}

      <div className="flex items-center justify-between mb-4">

        <button
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 00-.293.707l-6.414 6.414a1 1 0 00-.293.707l-1.0 1V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>

          Filters
        </button>

      </div>


      {/* ==================================================
          MAIN CONTENT
      ================================================== */}

      <div className="flex flex-col md:flex-row gap-6 h-[calc(100vh-5.2rem)]">


        {/* ==================================================
            FILTER SIDEBAR
        ================================================== */}

        <aside
          className={`
            md:w-1/4
            flex-shrink-0
            ${showFilters ? "block" : "hidden md:block"}
            h-full
            transition-all duration-300
          `}
        >

          <div className="h-full flex flex-col bg-white rounded-xl shadow border border-gray-100 overflow-hidden">

            {/* HEADER */}

            <div className="flex items-center justify-between px-5 pt-4 pb-2 border-b border-gray-100 bg-white flex-shrink-0">

              <h2 className="font-semibold text-gray-700 uppercase text-sm tracking-wider">
                Filters
              </h2>

              <button
                onClick={handleClearAll}
                className="text-xs text-[#e79237] hover:underline"
              >
                Clear All
              </button>

            </div>


            {/* FILTER OPTIONS */}

            <div className="flex-1 overflow-y-auto px-5 py-3 space-y-4 custom-scroll">

              {filterSections.map((section) => (
                <FilterSection
                  key={section.id}
                  section={section}
                  selected={filters[section.id] || []}
                  onCheckboxChange={handleCheckboxChange}
                  onPriceChange={handlePriceChange}
                />
              ))}

            </div>


            {/* APPLY BUTTON */}

            <div className="px-5 py-3 border-t border-gray-100 bg-white flex-shrink-0">

              <button
                onClick={handleApply}
                className="w-full bg-[#e79237] hover:bg-[#d67d2e] text-white font-medium py-2.5 rounded-lg transition"
              >
                Apply
              </button>

            </div>

          </div>

        </aside>


        {/* ==================================================
            PRODUCT AREA
        ================================================== */}

        <main className="flex-1 min-w-0 flex flex-col overflow-hidden">


          {/* ==================================================
              SORTING BAR
          ================================================== */}

          <div className="flex flex-wrap items-center gap-4 bg-white p-3 rounded-lg shadow-sm border border-gray-100 flex-shrink-0">

            {/* SORT */}

            <div className="flex items-center gap-2">

              <label
                htmlFor="sort"
                className="text-sm font-medium text-gray-600"
              >
                Sort By
              </label>

              <select
                id="sort"
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value)
                }
                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-[#e79237] focus:border-[#e79237]"
              >

                <option value="recommended">
                  Recommended
                </option>

                <option value="price-low">
                  Price: Low to High
                </option>

                <option value="price-high">
                  Price: High to Low
                </option>

              </select>

            </div>


            {/* TRY IN 3D */}

            <div className="flex items-center gap-2 ml-auto">

              <label className="relative inline-flex items-center cursor-pointer">

                <input
                  type="checkbox"
                  checked={tryIn3D}
                  onChange={() =>
                    setTryIn3D(!tryIn3D)
                  }
                  className="sr-only peer"
                />

                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#e79237]" />

                <span className="ml-2 text-sm text-gray-600">
                  Try in 3D
                </span>

              </label>

            </div>

          </div>


          {/* ==================================================
              PRODUCT SCROLL AREA
          ================================================== */}

          <div className="flex-1 min-h-0 overflow-y-auto custom-scroll pt-2">

            {sortedProducts.length === 0 ? (

              <div className="text-center py-12">

                <p className="text-gray-500 text-lg">
                  No products match your filters.
                </p>

              </div>

            ) : (

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 pb-4">

                {sortedProducts.map((product) => (

                  <div
                    key={product._id}
                    className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100 overflow-hidden group"
                  >

                    {/* PRODUCT IMAGE */}

                    <div className="aspect-square overflow-hidden bg-gray-50">

                      <img
                        src={
                          product.thumbnail ||
                          product.images?.[0]
                        }
                        alt={product.productName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />

                    </div>


                    {/* PRODUCT DETAILS */}

                    <div className="p-3">

                      {/* PRODUCT NAME */}

                      <h3 className="text-sm font-medium text-gray-800 truncate">
                        {product.productName}
                      </h3>


                      {/* BRAND */}

                      <p className="text-xs text-gray-400 mt-1">
                        {product.brand}
                      </p>


                      {/* PRICE */}

                      <div className="flex items-center gap-2 mt-1">

                        <p className="text-[#e79237] font-semibold">
                          ₹{product.sellingPrice}
                        </p>

                        {product.mrp &&
                          product.mrp >
                            product.sellingPrice && (
                            <p className="text-xs text-gray-400 line-through">
                              ₹{product.mrp}
                            </p>
                          )}

                      </div>


                      {/* DISCOUNT */}

                      {product.discount > 0 && (
                        <p className="text-xs text-green-600 mt-1">
                          {product.discount}% OFF
                        </p>
                      )}


                      {/* GENDER + FRAME */}

                      <p className="text-xs text-gray-400 mt-1">
                        {product.gender} •{" "}
                        {product.frameShape}
                      </p>


                      {/* RATING */}

                      <div className="flex items-center gap-1 mt-2">

                        <span className="text-yellow-500">
                          ★
                        </span>

                        <span className="text-xs text-gray-500">
                          {product.rating || 0}
                        </span>

                        <span className="text-xs text-gray-400">
                          ({product.reviewCount || 0})
                        </span>

                      </div>

                    </div>

                  </div>

                ))}

              </div>

            )}

          </div>

        </main>

      </div>


      {/* ==================================================
          CUSTOM SCROLLBAR
      ================================================== */}

      <style>{`

        .custom-scroll::-webkit-scrollbar {
          width: 4px;
        }

        .custom-scroll::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }

        .custom-scroll::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 10px;
        }

        .custom-scroll::-webkit-scrollbar-thumb:hover {
          background: #b0b8c4;
        }

      `}</style>

    </div>
  );
};


// ======================================================
// FILTER SECTION COMPONENT
// ======================================================

const FilterSection = ({
  section,
  selected,
  onCheckboxChange,
  onPriceChange,
}) => {

  const [isOpen, setIsOpen] = useState(false);

  // ====================================================
  // PRICE RANGE
  // ====================================================

  if (section.type === "range") {

    const [min, max] = selected || [
      section.min,
      section.max,
    ];

    return (
      <div className="border-b border-gray-100 pb-3 last:border-b-0">

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full text-left"
        >

          <span className="text-sm font-medium text-gray-700">
            {section.label}
          </span>

          <svg
            className={`w-4 h-4 text-gray-400 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >

            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />

          </svg>

        </button>


        {isOpen && (

          <div className="mt-2 px-1">

            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">

              <span>
                ₹{min}
              </span>

              <span>
                ₹{max}
              </span>

            </div>


            {/* RANGE */}

            <input
              type="range"
              min={section.min}
              max={section.max}
              step={section.step}
              value={max}
              onChange={(e) =>
                onPriceChange([
                  min,
                  parseInt(e.target.value, 10),
                ])
              }
              className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#e79237]"
            />


            {/* MIN / MAX INPUT */}

            <div className="flex gap-2 mt-2">

              <input
                type="number"
                value={min}
                onChange={(e) =>
                  onPriceChange([
                    parseInt(e.target.value, 10) || 0,
                    max,
                  ])
                }
                className="w-1/2 border border-gray-300 rounded-md px-2 py-1 text-sm focus:ring-[#e79237] focus:border-[#e79237]"
                placeholder="Min"
              />

              <input
                type="number"
                value={max}
                onChange={(e) =>
                  onPriceChange([
                    min,
                    parseInt(e.target.value, 10) || 0,
                  ])
                }
                className="w-1/2 border border-gray-300 rounded-md px-2 py-1 text-sm focus:ring-[#e79237] focus:border-[#e79237]"
                placeholder="Max"
              />

            </div>

          </div>

        )}

      </div>
    );
  }


  // ====================================================
  // CHECKBOX
  // ====================================================

  return (

    <div className="border-b border-gray-100 pb-3 last:border-b-0">

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left"
      >

        <span className="text-sm font-medium text-gray-700">
          {section.label}
        </span>

        <svg
          className={`w-4 h-4 text-gray-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >

          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />

        </svg>

      </button>


      {isOpen && (

        <div className="mt-2 space-y-1.5">

          {section.options.map((option) => (

            <label
              key={option}
              className="flex items-center gap-2 text-sm text-gray-700"
            >

              <input
                type="checkbox"
                checked={(selected || []).includes(option)}
                onChange={() =>
                  onCheckboxChange(
                    section.id,
                    option
                  )
                }
                className="rounded border-gray-300 text-[#e79237] focus:ring-[#e79237]"
              />

              {option}

            </label>

          ))}

        </div>

      )}

    </div>

  );
};

export default Items;