import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetByCatAndShapeQuery } from "../../services/ItemServices";
import { Filter, ChevronDown, Star, Heart } from "lucide-react";

import SkeletonCard from "../../componets/SkeletonCard";

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
    options: ["RECTANGLE", "ROUND", "SQUARE", "CAT EYE", "AVIATOR", "WAYFARER"],
  },
  {
    id: "frameType",
    label: "Frame Type",
    type: "checkbox",
    options: ["FULL RIM", "HALF RIM", "RIMLESS"],
  },
  {
    id: "brand",
    label: "Brand",
    type: "checkbox",
    options: ["OPTICART", "VISIONPRO", "RAY-BAN", "OAKLEY", "PRADA", "GUCCI"],
  },
];

const categoryMap = {
  eyeglasses: "EYEGLASSES",
  sunglasses: "SUNGLASSES",
  contacts: "CONTACT LENSES",
  "special-power": "SPECIAL POWER",
  "kids-glasses": "KIDS",
  sale: "SALE",
};

const initialFilters = {
  price: [0, 5000],
  gender: [],
  frameShape: [],
  frameType: [],
  brand: [],
};

const Items = () => {
  const { slug } = useParams();

  const category = categoryMap[slug];

  const [showFilters, setShowFilters] = useState(false);

  const [sortBy, setSortBy] = useState("recommended");

  const [tryIn3D, setTryIn3D] = useState(false);

  const [pendingFilters, setPendingFilters] = useState({
    ...initialFilters,
    price: [...initialFilters.price],
  });

  const [appliedFilters, setAppliedFilters] = useState({
    ...initialFilters,
    price: [...initialFilters.price],
  });

  const apiFrameShape =
    appliedFilters.frameShape.length === 1
      ? appliedFilters.frameShape[0]
      : undefined;

  const { data, isLoading, isError, error } = useGetByCatAndShapeQuery(
    {
      category,
      frameShape: apiFrameShape,
    },
    {
      skip: !category,
    },
  );

  const products = data?.products || [];

  const handleCheckboxChange = (sectionId, value) => {
    setPendingFilters((prev) => {
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

  const handlePriceChange = (newRange) => {
    setPendingFilters((prev) => ({
      ...prev,
      price: newRange,
    }));
  };

  const handleApply = () => {
    setAppliedFilters({
      price: [...pendingFilters.price],
      gender: [...pendingFilters.gender],
      frameShape: [...pendingFilters.frameShape],
      frameType: [...pendingFilters.frameType],
      brand: [...pendingFilters.brand],
    });

    setShowFilters(false);
  };

  const handleClearAll = () => {
    const clearedFilters = {
      price: [0, 5000],
      gender: [],
      frameShape: [],
      frameType: [],
      brand: [],
    };

    setPendingFilters(clearedFilters);
    setAppliedFilters(clearedFilters);
  };

  const filteredProducts = products.filter((product) => {
    const price = Number(product.sellingPrice || 0);

    if (price < appliedFilters.price[0] || price > appliedFilters.price[1]) {
      return false;
    }

    if (
      appliedFilters.gender.length > 0 &&
      !appliedFilters.gender.includes(product.gender)
    ) {
      return false;
    }

    if (
      appliedFilters.frameShape.length > 1 &&
      !appliedFilters.frameShape.includes(product.frameShape)
    ) {
      return false;
    }

    if (
      appliedFilters.frameType.length > 0 &&
      !appliedFilters.frameType.includes(product.frameType)
    ) {
      return false;
    }

    if (
      appliedFilters.brand.length > 0 &&
      !appliedFilters.brand.includes(product.brand)
    ) {
      return false;
    }

    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") {
      return Number(a.sellingPrice || 0) - Number(b.sellingPrice || 0);
    }

    if (sortBy === "price-high") {
      return Number(b.sellingPrice || 0) - Number(a.sellingPrice || 0);
    }

    if (sortBy === "rating") {
      return Number(b.rating || 0) - Number(a.rating || 0);
    }

    return 0;
  });

  if (!category) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <p className="text-gray-500 text-lg">Invalid category.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="max-w-[90vw] mx-auto min-h-[calc(100vh-64px)]">
        <div className="flex flex-col md:flex-row gap-6 h-[calc(100vh-5.2rem)]">
          {/* Sidebar skeleton */}
          <aside className="hidden md:block md:w-1/4 flex-shrink-0 h-full">
            <div className="h-full flex flex-col bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
              <div className="px-5 pt-4 pb-2 border-b border-gray-100">
                <div className="h-4 w-20 rounded-sm bg-gray-200 relative overflow-hidden">
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/70 to-transparent" />
                </div>
              </div>
              <div className="flex-1 px-5 py-4 space-y-5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="relative overflow-hidden">
                    <div className="h-4 w-full rounded-sm bg-gray-200" />
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/70 to-transparent" />
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Card grid skeleton */}
          <main className="flex-1 min-w-0 flex flex-col overflow-hidden">
            {/* Sort bar skeleton */}
            <div className="flex items-center gap-4 bg-white p-3 rounded-lg shadow-sm border border-gray-100 flex-shrink-0">
              <div className="relative h-8 w-64 rounded-md bg-gray-200 overflow-hidden">
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/70 to-transparent" />
              </div>
              <div className="ml-auto relative h-5 w-24 rounded-full bg-gray-200 overflow-hidden">
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/70 to-transparent" />
              </div>
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto custom-scroll pt-4 pb-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            </div>
          </main>
        </div>

        <style>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
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
      `}</style>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center">
        <p className="text-red-500 text-lg">Failed to load products.</p>

        <p className="text-gray-500 text-sm mt-2">
          {error?.data?.message || "Something went wrong"}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-[90vw] mx-auto min-h-[calc(100vh-64px)]">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
        >
          <Filter className="w-5 h-5" />
          Filters
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6 h-[calc(100vh-5.2rem)]">
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

            <div className="flex-1 overflow-y-auto px-5 py-3 space-y-4 custom-scroll">
              {filterSections.map((section) => (
                <FilterSection
                  key={section.id}
                  section={section}
                  selected={pendingFilters[section.id] || []}
                  onCheckboxChange={handleCheckboxChange}
                  onPriceChange={handlePriceChange}
                />
              ))}
            </div>

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

        <main className="flex-1 min-w-0 flex flex-col overflow-hidden">
          <div className="flex flex-wrap items-center gap-4 bg-white p-3 rounded-lg shadow-sm border border-gray-100 flex-shrink-0">
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
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-[#e79237] focus:border-[#e79237]"
              >
                <option value="recommended">Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>

            <div className="flex items-center gap-2 ml-auto">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={tryIn3D}
                  onChange={() => setTryIn3D(!tryIn3D)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#e79237]" />
                <span className="ml-2 text-sm text-gray-600">Try in 3D</span>
              </label>
            </div>
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto custom-scroll pt-4 pb-6">
            {/* Wider Cards Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {sortedProducts.map((product) => (
                <div
                  key={product._id}
                  className="group relative flex flex-col bg-white rounded-2xl border border-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] hover:border-[#e79237]/30 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                >
                  {/* ---------- IMAGE AREA (WIDER & SHORTER) ---------- */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-white">
                    <img
                      src={product.thumbnail || product.images?.[0]}
                      alt={product.productName}
                      className="w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Rating Badge */}
                    <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-2.5 py-1.5 rounded-full shadow-sm ring-1 ring-black/5">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span className="text-xs font-bold text-gray-800 leading-none">
                        {product.rating || 0}
                      </span>
                      <span className="text-[10px] text-gray-500 leading-none">
                        ({product.reviewCount || 0})
                      </span>
                    </div>

                    {/* Wishlist Button */}
                    <button
                      type="button"
                      aria-label="Add to wishlist"
                      className="absolute top-3 right-3 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-md shadow-sm ring-1 ring-black/5 text-gray-500 hover:text-rose-500 hover:bg-white hover:scale-110 active:scale-95 transition-all duration-200"
                    >
                      <Heart className="w-5 h-5" strokeWidth={2} />
                    </button>

                    {/* Discount Badge */}
                    {product.discount > 0 && (
                      <div className="absolute bottom-3 left-3 z-20">
                        <span className="bg-rose-500 text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1.5 rounded-md shadow-md shadow-rose-500/20">
                          {product.discount}% OFF
                        </span>
                      </div>
                    )}

                    {/* Quick View Overlay */}
                    <div className="absolute inset-x-0 bottom-0 z-20 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                      <button
                        type="button"
                        className="w-full bg-[#e79237] text-white text-xs font-semibold py-2.5 rounded-xl shadow-lg shadow-[#e79237]/40 hover:bg-[#d67d2e] active:scale-[0.98] transition-all duration-200"
                      >
                        View Details
                      </button>
                    </div>
                  </div>

                  {/* ---------- CONTENT AREA ---------- */}
                  <div className="p-4 md:p-5 bg-white">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400">
                        {product.brand}
                      </span>

                      {product.frameShape && (
                        <span className="text-[10px] font-medium text-gray-400 uppercase">
                          {product.frameShape}
                        </span>
                      )}
                    </div>

                    <h3 className="text-[15px] font-semibold text-gray-900 leading-[1.35] line-clamp-2 min-h-[40px] group-hover:text-[#e79237] transition-colors duration-200">
                      {product.productName}
                    </h3>

                    <div className="flex items-end justify-between mt-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[21px] font-bold text-gray-900 tracking-tight">
                            ₹{product.sellingPrice}
                          </span>

                          {product.mrp &&
                            product.mrp > product.sellingPrice && (
                              <span className="text-xs text-gray-400 line-through">
                                ₹{product.mrp}
                              </span>
                            )}
                        </div>

                        {product.discount > 0 && (
                          <p className="text-[10px] font-semibold text-green-600 mt-0.5">
                            Save {product.discount}%
                          </p>
                        )}
                      </div>

                      {product.gender && (
                        <span className="text-[10px] font-medium text-gray-500">
                          {product.gender}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 mt-4 text-[10px] text-gray-400">
                      {product.frameType && (
                        <>
                          <span>{product.frameType}</span>
                          <span className="w-1 h-1 rounded-full bg-gray-300" />
                        </>
                      )}

                      {product.frameShape && (
                        <>
                          <span>{product.frameShape}</span>
                          <span className="w-1 h-1 rounded-full bg-gray-300" />
                        </>
                      )}

                      {product.lensType && <span>{product.lensType}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

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

const FilterSection = ({
  section,
  selected,
  onCheckboxChange,
  onPriceChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  if (section.type === "range") {
    const [min, max] = selected || [section.min, section.max];

    return (
      <div className="border-b border-gray-100 pb-3 last:border-b-0">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full text-left"
        >
          <span className="text-sm font-medium text-gray-700">
            {section.label}
          </span>
          <ChevronDown
            className={`w-4 h-4 text-gray-400 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <div className="mt-2 px-1">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
              <span>₹{min}</span>
              <span>₹{max}</span>
            </div>

            <input
              type="range"
              min={section.min}
              max={section.max}
              step={section.step}
              value={max}
              onChange={(e) =>
                onPriceChange([min, parseInt(e.target.value, 10)])
              }
              className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#e79237]"
            />

            <div className="flex gap-2 mt-2">
              <input
                type="number"
                value={min}
                onChange={(e) =>
                  onPriceChange([parseInt(e.target.value, 10) || 0, max])
                }
                className="w-1/2 border border-gray-300 rounded-md px-2 py-1 text-sm focus:ring-[#e79237] focus:border-[#e79237]"
                placeholder="Min"
              />
              <input
                type="number"
                value={max}
                onChange={(e) =>
                  onPriceChange([min, parseInt(e.target.value, 10) || 0])
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

  return (
    <div className="border-b border-gray-100 pb-3 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left"
      >
        <span className="text-sm font-medium text-gray-700">
          {section.label}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
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
                checked={selected.includes(option)}
                onChange={() => onCheckboxChange(section.id, option)}
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
