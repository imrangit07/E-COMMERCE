import React from "react";
import headerLogo from "/main-logo/Logo.webp";
import {
  Heart,
  ShoppingBag,
  User,
  Mail,
  Phone,
  MapPin,
  Send,
} from "lucide-react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1: Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img
                src={headerLogo}
                alt="Opticart Logo"
                className="h-10 w-auto"
              />
              <span className="text-2xl font-bold tracking-tight text-[#e79237]">
                pticart
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              Your trusted online eyewear store. Stylish, affordable, and
              delivered with care.
            </p>
            <div className="flex space-x-4 pt-2">
              <a
                href="#"
                className="text-gray-400 hover:text-[#e79237] transition-colors"
              >
                <FaFacebookF size={18} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#e79237] transition-colors"
              >
                <FaInstagram size={18} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#e79237] transition-colors"
              >
                <FaTwitter size={18} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#e79237] transition-colors"
              >
                <FaYoutube size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links (same as header nav) */}
          <div>
            <h4 className="text-white font-semibold text-base mb-4 relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-[-6px] after:w-8 after:h-0.5 after:bg-[#e79237]">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="hover:text-[#e79237] transition-colors">
                  Eyeglasses
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#e79237] transition-colors">
                  Sunglasses
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#e79237] transition-colors">
                  Contacts
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#e79237] transition-colors">
                  Special Power
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#e79237] transition-colors">
                  Stores
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Support */}
          <div>
            <h4 className="text-white font-semibold text-base mb-4 relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-[-6px] after:w-8 after:h-0.5 after:bg-[#e79237]">
              Support
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <Mail size={16} className="text-[#e79237] mt-0.5" />
                <span>support@opticart.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={16} className="text-[#e79237] mt-0.5" />
                <span>+91 221-675-90XX</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-[#e79237] mt-0.5" />
                <span>123 MP Nagar, Bhopal</span>
              </li>
              <li>
                <a href="#" className="hover:text-[#e79237] transition-colors">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#e79237] transition-colors">
                  Return Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#e79237] transition-colors">
                  Shipping Info
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter & Payment */}
          <div>
            <h4 className="text-white font-semibold text-base mb-4 relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-[-6px] after:w-8 after:h-0.5 after:bg-[#e79237]">
              Newsletter
            </h4>
            <p className="text-sm mb-3">
              Subscribe to get special offers and updates.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 rounded-full bg-gray-800 border border-gray-700 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#e79237] focus:border-transparent"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#e79237] hover:bg-orange-600 text-white rounded-full transition-colors flex items-center justify-center gap-1 text-sm font-medium"
              >
                Subscribe <Send size={14} />
              </button>
            </form>
            <div className="mt-6">
              <p className="text-xs text-gray-500 mb-2">We accept</p>
              <div className="flex gap-3 text-2xl text-gray-400">
                {/* Payment icons (using simple placeholders – you can add actual icons) */}
                <span className="bg-gray-700 px-2 py-1 rounded text-xs font-mono text-white">
                  Visa
                </span>
                <span className="bg-gray-700 px-2 py-1 rounded text-xs font-mono text-white">
                  MC
                </span>
                <span className="bg-gray-700 px-2 py-1 rounded text-xs font-mono text-white">
                  AMEX
                </span>
                <span className="bg-gray-700 px-2 py-1 rounded text-xs font-mono text-white">
                  PayPal
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} Opticart. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#e79237] transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-[#e79237] transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-[#e79237] transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
