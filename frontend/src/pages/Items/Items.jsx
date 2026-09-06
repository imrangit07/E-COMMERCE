import React, { useState } from "react";
import { useParams } from "react-router-dom";

// ─── Dummy product data ──────────────────────────────────
const dummyProducts = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  price: (Math.random() * 80 + 20).toFixed(2),
  image: `https://picsum.photos/seed/${i + 1}/300/300`,
  gender: ["Men", "Women", "Unisex"][i % 3],
  age: ["Adult", "Kids", "Teens"][i % 3],
  frameSize: ["Small", "Medium", "Large"][i % 3],
  shapeStyle: ["Round", "Square", "Cat Eye", "Aviator"][i % 4],
  brand: ["Ray-Ban", "Oakley", "Prada", "Gucci"][i % 4],
}));

// ─── Filter sections configuration ──────────────────────
const filterSections = [
  {
    id: "price",
    label: "Price",
    type: "range",
    min: 0,
    max: 100,
    step: 5,
  },
  {
    id: "gender",
    label: "Gender",
    type: "checkbox",
    options: ["Men", "Women", "Unisex"],
  },
  {
    id: "age",
    label: "Age",
    type: "checkbox",
    options: ["Adult", "Kids", "Teens"],
  },
  {
    id: "frameSize",
    label: "Frame Size",
    type: "checkbox",
    options: ["Small", "Medium", "Large"],
  },
  {
    id: "shapeStyle",
    label: "Shape & Style",
    type: "checkbox",
    options: ["Round", "Square", "Cat Eye", "Aviator", "Wayfarer"],
  },
  {
    id: "brand",
    label: "Brand",
    type: "checkbox",
    options: ["Ray-Ban", "Oakley", "Prada", "Gucci", "Dior", "Tom Ford"],
  },
];

const Items = () => {
  const { slug } = useParams();

  // ─── State ──────────────────────────────────────────────
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("recommended");
  const [tryIn3D, setTryIn3D] = useState(false);

  const initialFilters = {
    price: [0, 100],
    gender: [],
    age: [],
    frameSize: [],
    shapeStyle: [],
    brand: [],
  };
  const [filters, setFilters] = useState(initialFilters);

  // ─── Handlers ───────────────────────────────────────────
  const handleCheckboxChange = (sectionId, value) => {
    setFilters((prev) => {
      const current = prev[sectionId] || [];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [sectionId]: updated };
    });
  };

  const handlePriceChange = (newRange) => {
    setFilters((prev) => ({ ...prev, price: newRange }));
  };

  const handleApply = () => {
    setShowFilters(false);
    // In a real app, trigger API call with filters
  };

  const handleClearAll = () => {
    setFilters(initialFilters);
  };

  // ─── Filtering logic ────────────────────────────────────
  const filteredProducts = dummyProducts.filter((product) => {
    const price = parseFloat(product.price);
    if (price < filters.price[0] || price > filters.price[1]) return false;
    if (filters.gender.length > 0 && !filters.gender.includes(product.gender))
      return false;
    if (filters.age.length > 0 && !filters.age.includes(product.age))
      return false;
    if (filters.frameSize.length > 0 && !filters.frameSize.includes(product.frameSize))
      return false;
    if (filters.shapeStyle.length > 0 && !filters.shapeStyle.includes(product.shapeStyle))
      return false;
    if (filters.brand.length > 0 && !filters.brand.includes(product.brand))
      return false;
    return true;
  });

  // ─── Sorting ────────────────────────────────────────────
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return parseFloat(a.price) - parseFloat(b.price);
    if (sortBy === "price-high") return parseFloat(b.price) - parseFloat(a.price);
    return 0;
  });

  // ─── Render ─────────────────────────────────────────────
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      {/* ─── Header Bar: Title + Mobile Toggle ─── */}
      <div className="flex items-center justify-between mb-4">
        {/* <h1 className="text-2xl sm:text-3xl font-bold capitalize text-gray-800">
          {slug ? slug.replace("-", " ") : "All Products"}
        </h1> */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filters
        </button>
      </div>

      {/* ─── Main Content ─── */}
      <div className="flex flex-col md:flex-row gap-6 h-[calc(100vh-12rem)]">
        {/* ─── Filters Sidebar ─── */}
        <aside
          className={`
            md:w-1/4 md:block flex-shrink-0
            ${showFilters ? "block" : "hidden"}
            transition-all duration-300
          `}
        >
          {/* Fixed Filter Panel – no sticky, it's inside a flex container that takes full height */}
          <div className="h-full flex flex-col bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
            {/* Fixed Header */}
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

            {/* Scrollable Filter Options */}
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

            {/* Fixed Apply Button */}
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

        {/* ─── Product Grid (scrollable) ─── */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Sorting & Try in 3D Bar – fixed at top of product area */}
          <div className="flex flex-wrap items-center gap-4  bg-white p-3 rounded-lg shadow-sm border border-gray-100 flex-shrink-0">
            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-sm font-medium text-gray-600">
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
                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#e79237]"></div>
                <span className="ml-2 text-sm text-gray-600">Try in 3D</span>
              </label>
            </div>
          </div>

          {/* Scrollable product grid */}
          <div className="flex-1 overflow-y-auto custom-scroll min-h-screen pt-2">
            {sortedProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products match your filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 pb-4">
                {sortedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100 overflow-hidden group"
                  >
                    <div className="aspect-square overflow-hidden bg-gray-50">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="text-sm font-medium text-gray-800 truncate">
                        {product.name}
                      </h3>
                      <p className="text-[#e79237] font-semibold mt-1">
                        ${product.price}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {product.brand} • {product.gender}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* ─── Custom scrollbar styles ─── */}
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

// ─── Subcomponent: FilterSection ──────────────────────────
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
          <span className="text-sm font-medium text-gray-700">{section.label}</span>
          <svg
            className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {isOpen && (
          <div className="mt-2 px-1">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
              <span>${min}</span>
              <span>${max}</span>
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

  // Checkbox type
  return (
    <div className="border-b border-gray-100 pb-3 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left"
      >
        <span className="text-sm font-medium text-gray-700">{section.label}</span>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="mt-2 space-y-1.5">
          {section.options.map((option) => (
            <label key={option} className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={(selected || []).includes(option)}
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