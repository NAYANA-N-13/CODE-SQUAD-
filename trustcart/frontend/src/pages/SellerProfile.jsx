import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ShieldCheck, Calendar, Box, Star, AlertTriangle, CheckCircle, HelpCircle, Loader2 } from 'lucide-react';
import TrustScore from '@components/TrustScore';
import FakeReviewChart from '@components/FakeReviewChart';
import RatingsTrendChart from '@components/RatingsTrendChart';
import RiskBadge from '@components/RiskBadge';
import { SellerSkeleton } from '@components/Skeletons';
import ErrorState from '@components/ErrorState';
import { useSeller } from '../hooks/useSeller';
import { generateRiskFlags } from '../utils/trustHelpers';

export default function SellerProfile() {
  const { id } = useParams();
  const { seller, aiTrust, loading, error, retry } = useSeller(id);

  if (loading) {
    return <SellerSkeleton />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={retry} />;
  }

  // Safe defaults
  const trustScore = aiTrust?.score ?? 0;
  const trustTier = aiTrust?.tier ?? 'Unknown';
  const metrics = aiTrust?.metrics || { ratingScore: 0, sentimentScore: 0, deliveryScore: 0, ageScore: 0 };
  const aiStats = aiTrust?.aiStats || { genuinePct: 100, suspiciousPct: 0, explanation: "No data available." };
  const riskFlags = generateRiskFlags(metrics, aiStats);
  const historicalRatings = aiTrust?.historicalRatings || [];
  const products = aiTrust?.products || [];

  // Helper for metric colors
  const getMetricTheme = (score, max) => {
    const ratio = score / max;
    if (ratio > 0.8) return 'text-green-600 bg-green-50/50 border-green-200 dark:bg-green-900/10 dark:border-green-800/30';
    if (ratio >= 0.5) return 'text-yellow-600 bg-yellow-50/50 border-yellow-200 dark:bg-yellow-900/10 dark:border-yellow-800/30';
    return 'text-red-600 bg-red-50/50 border-red-200 dark:bg-red-900/10 dark:border-red-800/30';
  };

  return (
    <div className="bg-gray-50 dark:bg-[#0a0a0e] min-h-screen py-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

        {/* 1. Header Row */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 md:p-8 border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
          {/* Subtle gradient flash */}
          <div className={`absolute -top-40 -right-40 w-96 h-96 blur-3xl rounded-full opacity-20 pointer-events-none ${trustScore >= 50 ? 'bg-indigo-500' : 'bg-red-500'}`} />
          
          <div className="flex items-center gap-6 z-10 w-full lg:w-auto">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-tr from-gray-700 to-gray-900 rounded-2xl flex items-center justify-center text-white text-3xl font-black shadow-lg shrink-0 uppercase">
              {seller.name?.charAt(0) || 'S'}
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1.5 border-b border-gray-100 dark:border-gray-700 pb-2">
                <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white">{seller.name}</h1>
                {seller.is_verified ? (
                  <span className="bg-green-100 text-green-700 p-1.5 rounded-full" title="TrustCart Verified">
                    <ShieldCheck className="w-5 h-5" />
                  </span>
                ) : (
                  <span className="bg-gray-100 text-gray-500 p-1.5 rounded-full" title="Unverified Vendor">
                    <HelpCircle className="w-5 h-5" />
                  </span>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 dark:text-gray-400 mt-2 font-medium">
                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> Joined {seller.joined || 'Recently'}</span>
                <span className="flex items-center gap-1.5"><Box className="w-4 h-4" /> {products.length} Active Listings</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center bg-white dark:bg-gray-900/50 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 min-w-[200px] z-10 w-full lg:w-auto">
            <div className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Master Trust Score</div>
            <TrustScore score={trustScore} size="lg" />
            <div className={`text-sm font-bold px-4 py-1.5 rounded-full mt-4 border ${
              trustScore >= 80 ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30' : 
              trustScore >= 50 ? 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30' : 
              'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/40 dark:text-red-400'
            }`}>
              {trustTier}
            </div>
          </div>
        </div>

        {/* 2. Primary Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Widget A: Trust Score Component Summary */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm lg:col-span-1 flex flex-col justify-between">
             <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Algorithm Components</h3>
             
             <div className="space-y-3">
               <div className={`flex items-center justify-between p-3 rounded-xl border ${getMetricTheme(metrics.ratingScore, 30)}`}>
                  <span className="text-sm font-bold opacity-80">Aggregate Rating</span>
                  <span className="font-black text-lg">{metrics.ratingScore.toFixed(1)} <span className="opacity-50 text-xs font-bold">/30</span></span>
               </div>
               <div className={`flex items-center justify-between p-3 rounded-xl border ${getMetricTheme(metrics.sentimentScore, 20)}`}>
                  <span className="text-sm font-bold opacity-80">Review Sentiment</span>
                  <span className="font-black text-lg">{metrics.sentimentScore.toFixed(1)} <span className="opacity-50 text-xs font-bold">/20</span></span>
               </div>
               <div className={`flex items-center justify-between p-3 rounded-xl border ${getMetricTheme(metrics.deliveryScore, 20)}`}>
                  <span className="text-sm font-bold opacity-80">Delivery Success</span>
                  <span className="font-black text-lg">{metrics.deliveryScore.toFixed(1)} <span className="opacity-50 text-xs font-bold">/20</span></span>
               </div>
               <div className={`flex items-center justify-between p-3 rounded-xl border ${getMetricTheme(metrics.ageScore, 20)}`}>
                  <span className="text-sm font-bold opacity-80">Account Age</span>
                  <span className="font-black text-lg">{metrics.ageScore.toFixed(1)} <span className="opacity-50 text-xs font-bold">/20</span></span>
               </div>
             </div>
          </div>

          {/* Widget B: Fake Review Analysis (Custom Recharts Component) */}
          <div className="lg:col-span-2">
            <FakeReviewChart stats={aiStats} explanation={aiStats.explanation} />
          </div>

        </div>

        {/* 3. Secondary Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           
           {/* Widget C: Risk Indicators */}
           <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm lg:col-span-1 h-full">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Active Risk Flags</h3>
              
              {riskFlags.length === 0 ? (
                 <div className="h-40 flex flex-col items-center justify-center text-emerald-600 dark:text-emerald-500 border border-emerald-100 dark:border-emerald-900/50 bg-emerald-50 dark:bg-emerald-900/10 rounded-xl">
                    <CheckCircle className="w-10 h-10 mb-2" />
                    <span className="font-bold">Clean Record</span>
                 </div>
              ) : (
                <div className="flex flex-wrap gap-2.5 mt-2">
                  {riskFlags.map((flag, i) => (
                    <RiskBadge key={i} text={flag} />
                  ))}
                </div>
              )}
           </div>

           {/* Widget D: Historical Ratings (Custom Recharts Component) */}
           <div className="lg:col-span-2">
             <RatingsTrendChart data={historicalRatings} />
           </div>

        </div>

        {/* 4. Storefront Display */}
        <div className="mt-12 pt-12 border-t border-gray-200 dark:border-gray-800">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            Current Storefront <span className="text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded-full">{products.length}</span>
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <Link key={product.id} to={`/products/${product.id}`} className="group bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="aspect-video bg-gray-100 dark:bg-gray-700 w-full overflow-hidden">
                   <img src={product.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" alt={product.name} />
                </div>
                <div className="p-4">
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 tracking-wider uppercase">{product.category}</span>
                  <h3 className="font-bold text-gray-900 dark:text-white mt-1 truncate">{product.name}</h3>
                  <div className="flex items-center justify-between mt-4">
                    <span className="font-black text-gray-900 dark:text-gray-100">${product.price.toFixed(2)}</span>
                    <div className="flex items-center gap-1 text-yellow-500 text-sm font-bold bg-yellow-50 dark:bg-yellow-900/20 px-2.5 py-1 rounded-full border border-yellow-100 dark:border-yellow-800/50">
                      <Star className="w-3.5 h-3.5 fill-current" /> {product.rating}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
