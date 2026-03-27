import React from 'react';

/**
 * Base pulsing block for constructing skeletons
 */
export const SkeletonBlock = ({ className }) => (
  <div className={`animate-pulse bg-gray-200 dark:bg-gray-800/80 rounded-xl ${className}`} />
);

/**
 * High-fidelity loading skeleton matching the ProductDetail layout exactly.
 * Prevents CLS (Cumulative Layout Shift) and avoids blank screens during fetch.
 */
export function ProductSkeleton() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-8 transition-opacity duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb tracking */}
        <div className="flex items-center gap-3 mb-8">
          <SkeletonBlock className="w-12 h-4" />
          <span className="text-gray-300 dark:text-gray-700">/</span>
          <SkeletonBlock className="w-20 h-4" />
          <span className="text-gray-300 dark:text-gray-700">/</span>
          <SkeletonBlock className="w-32 h-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT: Product Info */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <SkeletonBlock className="w-full aspect-square !rounded-2xl border border-gray-100 dark:border-gray-800" />
            <div>
              <SkeletonBlock className="w-3/4 h-10 mb-4" />
              <SkeletonBlock className="w-1/4 h-12 mb-6" />
              <SkeletonBlock className="w-full h-14 !rounded-xl" />
            </div>
          </div>

          {/* RIGHT: Trust Mechanics */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Seller Info Card */}
            <div className="rounded-2xl border p-6 bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-800/50 shadow-sm">
               <div className="flex justify-between items-start mb-6">
                 <div className="space-y-4">
                   <SkeletonBlock className="w-16 h-3" />
                   <SkeletonBlock className="w-40 h-7" />
                   <SkeletonBlock className="w-32 h-4" />
                 </div>
                 <div className="flex flex-col items-center gap-2">
                   <SkeletonBlock className="w-14 h-14 !rounded-full" />
                   <SkeletonBlock className="w-20 h-2" />
                 </div>
               </div>
               <SkeletonBlock className="w-full h-11 !rounded-lg" />
            </div>

            {/* Risk Indicators */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-800/50 p-6 shadow-sm space-y-4">
              <SkeletonBlock className="w-36 h-6" />
              <div className="flex flex-wrap gap-2.5 mt-2">
                <SkeletonBlock className="w-28 h-8 !rounded-full" />
                <SkeletonBlock className="w-40 h-8 !rounded-full" />
                <SkeletonBlock className="w-32 h-8 !rounded-full" />
              </div>
            </div>

            {/* AI Explanation */}
            <SkeletonBlock className="w-full h-48 !rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800" />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * High-fidelity loading skeleton matching the detailed SellerProfile Dashboard exactly.
 */
export function SellerSkeleton() {
  return (
    <div className="bg-gray-50 dark:bg-[#0a0a0e] min-h-screen py-8 pb-20 transition-opacity duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* 1. Header Row */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 md:p-8 border border-gray-100 dark:border-gray-800/50 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6 w-full lg:w-auto">
             <SkeletonBlock className="w-20 h-20 md:w-24 md:h-24 !rounded-2xl shrink-0" />
             <div className="space-y-4 w-full">
               <SkeletonBlock className="w-56 md:w-80 h-8 md:h-10" />
               <div className="flex gap-4 mt-2">
                 <SkeletonBlock className="w-28 h-4" />
                 <SkeletonBlock className="w-32 h-4" />
               </div>
             </div>
          </div>
          <div className="flex flex-col items-center bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-6 min-w-[200px] w-full lg:w-auto">
             <SkeletonBlock className="w-28 h-3 mb-4" />
             <SkeletonBlock className="w-20 h-20 !rounded-full" />
             <SkeletonBlock className="w-24 h-8 !rounded-full mt-4" />
          </div>
        </div>

        {/* 2. Primary Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-800/50 p-6 flex flex-col gap-4 h-72">
             <SkeletonBlock className="w-48 h-6 mb-2" />
             <SkeletonBlock className="w-full h-12" />
             <SkeletonBlock className="w-full h-12" />
             <SkeletonBlock className="w-full h-12" />
          </div>
          <SkeletonBlock className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-800/50 p-6 h-72 lg:col-span-2" />
        </div>

        {/* 3. Secondary Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-800/50 p-6 flex flex-col gap-3 h-72">
              <SkeletonBlock className="w-40 h-6 mb-4" />
              <SkeletonBlock className="w-full h-12" />
              <SkeletonBlock className="w-full h-12" />
          </div>
          <SkeletonBlock className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-800/50 p-6 h-72 lg:col-span-2" />
        </div>
        
        {/* 4. Storefront Display block */}
        <div className="mt-12 pt-12 border-t border-gray-200 dark:border-gray-800/50">
           <SkeletonBlock className="w-48 h-8 mb-6" />
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
             <SkeletonBlock className="w-full h-64 !rounded-2xl" />
             <SkeletonBlock className="w-full h-64 !rounded-2xl hidden sm:block" />
             <SkeletonBlock className="w-full h-64 !rounded-2xl hidden lg:block" />
             <SkeletonBlock className="w-full h-64 !rounded-2xl hidden lg:block" />
           </div>
        </div>

      </div>
    </div>
  );
}
