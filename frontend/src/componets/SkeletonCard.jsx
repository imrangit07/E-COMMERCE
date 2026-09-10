import React from "react";

const SkeletonCard = () => {
  return (
    <div className="relative flex flex-col bg-white rounded-2xl border border-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] overflow-hidden">
      {/* ---------- IMAGE AREA SKELETON ---------- */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
        {/* Shimmer overlay */}
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/70 to-transparent" />

        {/* Rating badge skeleton */}
        <div className="absolute top-3 left-3 h-6 w-16 rounded-full bg-gray-200/80" />

        {/* Wishlist button skeleton */}
        <div className="absolute top-3 right-3 h-9 w-9 rounded-full bg-gray-200/80" />

        {/* Discount badge skeleton */}
        <div className="absolute bottom-3 left-3 h-6 w-20 rounded-md bg-gray-200/80" />
      </div>

      {/* ---------- CONTENT AREA SKELETON ---------- */}
      <div className="relative p-4 md:p-5 bg-white overflow-hidden">
        {/* Shimmer overlay for content */}
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/70 to-transparent" />

        {/* Brand + frame shape row */}
        <div className="flex items-center justify-between mb-2">
          <div className="h-3 w-16 rounded-sm bg-gray-200" />
          <div className="h-3 w-12 rounded-sm bg-gray-200" />
        </div>

        {/* Product name (2 lines) */}
        <div className="space-y-2 min-h-[40px]">
          <div className="h-3.5 w-full rounded-sm bg-gray-200" />
          <div className="h-3.5 w-3/4 rounded-sm bg-gray-200" />
        </div>

        {/* Price row */}
        <div className="flex items-end justify-between mt-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="h-5 w-16 rounded-sm bg-gray-200" />
              <div className="h-3 w-10 rounded-sm bg-gray-200" />
            </div>
            <div className="h-2.5 w-14 rounded-sm bg-gray-200 mt-1.5" />
          </div>
          <div className="h-2.5 w-10 rounded-sm bg-gray-200" />
        </div>

        {/* Bottom meta row */}
        <div className="flex items-center gap-2 mt-4">
          <div className="h-2.5 w-14 rounded-sm bg-gray-200" />
          <div className="w-1 h-1 rounded-full bg-gray-300" />
          <div className="h-2.5 w-16 rounded-sm bg-gray-200" />
          <div className="w-1 h-1 rounded-full bg-gray-300" />
          <div className="h-2.5 w-12 rounded-sm bg-gray-200" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;