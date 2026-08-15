import React, { useState, useEffect } from "react";
import { Heart, ShoppingBag, User, Menu, X, Search } from "lucide-react";
import headerLogo from "/main-logo/Logo.webp";
import MegaMenu from "./MegaMenu";
import { eyeglasses,sunglasses,contacts,specialPower } from "../data/SubCategories.js";
import store from "/subcategory/store.webp"

// ----- NAV DATA -----
const navData = {
  Eyeglasses: {
    type: "eyeglasses",
    categories: eyeglasses, 
  },
 Sunglasses: {
    type: "eyeglasses",   
    categories: sunglasses, 
  },
  Contacts: {
    type: "eyeglasses",   
    categories: contacts,   
  },
   "Special Power": {
    type: "eyeglasses",        
    categories: specialPower,   
  },
   Stores: {
    type: "stores",   
    categories: store,      
  },
};

const Header = () => {
  // ... (same state and useEffect as before)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState(null);
  const [hoverTimeout, setHoverTimeout] = useState(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.touchAction = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [isMenuOpen]);

  const handleMouseEnter = (navKey) => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    setActiveNav(navKey);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setActiveNav(null);
    }, 150);
    setHoverTimeout(timeout);
  };

  const handleDropdownEnter = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
  };

  const handleDropdownLeave = () => {
    setActiveNav(null);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 shadow-sm backdrop-blur-md">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <img src={headerLogo} alt="Opticart Logo" className="h-8 w-auto object-contain" />
            <span className="text-xl font-bold tracking-tight text-[#e79237]">pticart</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-600">
            {Object.keys(navData).map((key) => (
              <div
                key={key}
                className="relative"
                onMouseEnter={() => handleMouseEnter(key)}
                onMouseLeave={handleMouseLeave}
              >
                <span className="hover:text-[#e79237] transition-colors cursor-pointer">
                  {key}
                </span>
              </div>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden sm:flex flex-1 max-w-md items-center rounded-full border border-gray-200 bg-gray-50 px-4 py-1.5 transition-all focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200">
            <Search size={18} className="text-gray-400 mr-2 flex-shrink-0" />
            <input type="text" placeholder="Search for glasses..." className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400" />
          </div>

          {/* Icons */}
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            <button className="hidden sm:inline-flex p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600 hover:text-red-500">
              <Heart size={20} />
            </button>
            <button className="hidden sm:inline-flex p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600 relative">
              <ShoppingBag size={20} />
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#e79237] text-[10px] font-bold text-white">0</span>
            </button>
            <button className="hidden md:inline-flex p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600">
              <User size={20} />
            </button>
            <button onClick={toggleMenu} className="lg:hidden inline-flex p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-700" aria-label="Toggle menu">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mega Menu */}
      {activeNav && (
        <div className="relative w-full" onMouseEnter={handleDropdownEnter} onMouseLeave={handleDropdownLeave}>
          <MegaMenu activeNav={activeNav} navData={navData} onClose={handleDropdownLeave} />
        </div>
      )}

      {/* Mobile Slide‑in (unchanged) */}
      <div className={`fixed inset-0 z-[100] bg-white transform transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "translate-x-full"} flex flex-col h-screen w-full overflow-y-auto`}>
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <img src={headerLogo} alt="Opticart Logo" className="h-8 w-auto object-contain" />
            <span className="text-xl font-bold tracking-tight text-[#e79237]">pticart</span>
          </div>
          <button onClick={toggleMenu} className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-700">
            <X size={24} />
          </button>
        </div>
        <div className="flex-1 px-6 pb-8 flex flex-col gap-6 overflow-y-auto">
          <div className="flex items-center rounded-full border border-gray-200 bg-gray-50 px-4 py-2 focus-within:border-[#e79237] focus-within:ring-2 focus-within:ring-[#e79237]/30">
            <Search size={20} className="text-gray-400 mr-3" />
            <input type="text" placeholder="Search for glasses..." className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400" />
          </div>
          <nav className="flex flex-col gap-3 text-base font-medium text-gray-700">
            <span className="py-2 border-b border-gray-100 hover:text-[#e79237] transition-colors cursor-pointer">Eyeglasses</span>
            <span className="py-2 border-b border-gray-100 hover:text-[#e79237] transition-colors cursor-pointer">Sunglasses</span>
            <span className="py-2 border-b border-gray-100 hover:text-[#e79237] transition-colors cursor-pointer">Contacts</span>
            <span className="py-2 border-b border-gray-100 hover:text-[#e79237] transition-colors cursor-pointer">Special Power</span>
            <span className="py-2 border-b border-gray-100 hover:text-[#e79237] transition-colors cursor-pointer">Stores</span>
          </nav>
          <div className="flex flex-col gap-3 pt-4 border-t border-gray-200">
            <button className="flex items-center gap-3 py-2 text-sm text-gray-600 hover:text-red-500 transition-colors">
              <Heart size={22} /> Wishlist
            </button>
            <button className="flex items-center gap-3 py-2 text-sm text-gray-600 hover:text-[#e79237] transition-colors relative">
              <ShoppingBag size={22} /> Cart <span className="text-xs font-bold bg-[#e79237] text-white rounded-full px-2 py-0.5">0</span>
            </button>
            <button className="flex items-center gap-3 py-2 text-sm text-gray-600 hover:text-green-600 transition-colors">
              <User size={22} /> Account
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;