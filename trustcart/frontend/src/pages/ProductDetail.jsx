import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShieldCheck, Star, Truck, AlertTriangle, MessageSquare, ShoppingCart, Sparkles, User, HelpCircle, Loader2, XOctagon } from 'lucide-react';
import TrustScore from '@components/TrustScore';
import RiskBadge from '@components/RiskBadge';
import ErrorState from '@components/ErrorState';
import { ProductSkeleton } from '@components/Skeletons';
import { getProductById, vouchSeller } from '../services/api';
import { generateRiskFlags } from '../utils/trustHelpers';
import { useSeller } from '../hooks/useSeller';

export default function ProductDetail() {
  const { id } = useParams();
  
  const [product, setProduct] = useState(null);
  const [productLoading, setProductLoading] = useState(true);
  const [productError, setProductError] = useState(null);

  // Rating State
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isRatingSubmitted, setIsRatingSubmitted] = useState(false);
  const [vouchStatus, setVouchStatus] = useState(null);
  const [reportStatus, setReportStatus] = useState(null);

  // Fetch only the product, we let the Super-Hook handle gathering the seller
  useEffect(() => {
    let isMounted = true;
    
    const fetchProduct = async () => {
      setProductLoading(true);
      setProductError(null);
      try {
        const productData = await getProductById(id);
        if (!productData) throw new Error("Product data is missing or not found on the server.");
        if (isMounted) setProduct(productData);
      } catch (err) {
        if (isMounted) setProductError(err.message || "Failed to load product details from the server.");
      } finally {
        if (isMounted) setProductLoading(false);
      }
    };

    fetchProduct();
    return () => { isMounted = false; };
  }, [id]);

  // Pass control to the Global Cache layer
  const sellerId = product?.seller_id || product?.seller?.id || null;
  const { seller, aiTrust, loading: sellerLoading, error: sellerError, retry: retrySeller } = useSeller(sellerId);

  const handleVouch = async (amount) => {
    setVouchStatus('pending');
    try {
      await vouchSeller(sellerId, `vouch-${Date.now()}`, amount);
      setVouchStatus(`Vouched with ${amount} points. Refresh to see updated trust score.`);
    } catch (err) {
      setVouchStatus(`Vouch failed: ${err.message || 'unknown error'}`);
    }
  };

  const handleReport = () => {
    // For this demo flow we keep reports as local state-only; backend extension is possible.
    setReportStatus('Seller reported. Trust score may adjust after moderation review.');
  };

  const isLoading = productLoading || (!productError && sellerLoading);
  const activeError = productError || sellerError;

  if (isLoading) {
    return <ProductSkeleton />;
  }

  if (activeError) {
    return <ErrorState message={activeError} onRetry={productError ? () => window.location.reload() : retrySeller} />;
  }

  // Safely destruct our remote payloads with fallbacks if backend model lacks properties
  const productPrice = product?.price || 0;
  const sellerName = seller?.name || seller?.username || 'System Merchant';
  const trustScore = seller?.trust_score ?? aiTrust?.score ?? 0;
  const trustTier = aiTrust?.tier ?? (trustScore >= 80 ? 'Highly Trusted' : trustScore >= 60 ? 'Trusted' : trustScore >= 40 ? 'Moderate' : 'Low Trust');
  const riskMetrics = aiTrust?.metrics || {
    account_age_days: seller?.account_age_days ?? 0,
    delivery_success_rate: seller?.delivery_success_rate ?? 100,
  };
  const riskFlags = generateRiskFlags(riskMetrics, aiTrust?.aiStats);
  const explanation = aiTrust?.explanation ?? (seller?.trust_score != null ? `Seller trust score is currently ${seller.trust_score}` : 'AI explanation unavailable at this time.');

  const getVerdict = (score) => {
    if (score >= 80) return { text: "Safe to Buy", color: "bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-900/50 dark:border-emerald-800/50 dark:text-emerald-400", icon: <ShieldCheck className="w-8 h-8" /> };
    if (score >= 50) return { text: "Proceed with Caution", color: "bg-yellow-50 text-yellow-800 border-yellow-200 dark:bg-yellow-900/50 dark:border-yellow-800/50 dark:text-yellow-400", icon: <AlertTriangle className="w-8 h-8" /> };
    return { text: "Avoid Seller", color: "bg-red-50 text-red-800 border-red-200 dark:bg-red-900/50 dark:border-red-800/50 dark:text-red-400", icon: <XOctagon className="w-8 h-8" /> };
  };

  const verdict = getVerdict(trustScore);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <nav className="flex text-sm text-gray-500 mb-8 space-x-2">
          <Link to="/" className="hover:text-indigo-600">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-indigo-600">{product.category || 'Catalog'}</Link>
          <span>/</span>
          <span className="text-gray-900 dark:text-gray-300 truncate w-32 md:w-auto">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT: Section 1 - Product Info */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="w-full aspect-square bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm flex items-center justify-center">
              {product.image_url ? (
                <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-400 font-bold uppercase tracking-widest text-xl">{product.category || 'NO IMAGE'}</span>
              )}
            </div>
            
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
                {product.name}
              </h1>
              <p className="text-4xl font-black text-gray-900 dark:text-white mb-6">
                ${productPrice.toFixed(2)}
              </p>

              {/* Interactive User Rating Block */}
              <div className="mb-8 p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm">
                <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-widest mb-4">Rate this Product</h3>
                
                {isRatingSubmitted ? (
                  <div className="flex items-center gap-3 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded-xl border border-emerald-100 dark:border-emerald-800/30">
                    <ShieldCheck className="w-5 h-5 flex-shrink-0" />
                    <span className="font-bold text-sm">Rating Saved! Thank you for authenticating this seller.</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => { setUserRating(star); setIsRatingSubmitted(true); }}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 hover:scale-125 transition-transform focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-full"
                      >
                        <Star 
                          className={`w-9 h-9 ${
                            (hoverRating || userRating) >= star 
                              ? 'fill-yellow-400 text-yellow-400 drop-shadow-md' 
                              : 'text-gray-300 dark:text-gray-600'
                          } transition-colors duration-200`} 
                        />
                      </button>
                    ))}
                    <span className="ml-4 text-sm font-bold text-gray-400 uppercase tracking-widest">
                      {hoverRating ? `Rate ${hoverRating} Star${hoverRating > 1 ? 's' : ''}` : "Click to Rate"}
                    </span>
                  </div>
                )}
              </div>
              
              <button className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-indigo-200 dark:shadow-none transition-all active:scale-[0.98]">
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
            </div>
          </div>

          {/* RIGHT: Trust Mechanics */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Section 2: Seller Info Card */}
            <div className="rounded-2xl border p-6 shadow-sm bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 relative overflow-hidden">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider opacity-80 mb-1">Sold By</h3>
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5 text-gray-400" />
                    <Link to={`/seller/${seller?.id || seller?.seller_id || seller?.sellerId || sellerId}`} className="text-xl font-bold text-gray-900 dark:text-white hover:text-indigo-600 transition-colors">
                      {sellerName}
                    </Link>
                  </div>
                  {seller.is_verified ? (
                    <span className="flex items-center gap-1 text-sm font-medium mt-1 text-green-600">
                      <ShieldCheck className="w-4 h-4" /> TrustCart Verified
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-sm font-medium mt-1 text-gray-500">
                      <HelpCircle className="w-4 h-4" /> Not Verified
                    </span>
                  )}
                </div>
                
                <div className="flex flex-col items-center">
                  <TrustScore score={trustScore} size="sm" />
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500 mt-2">Trust Score</span>
                </div>
              </div>
              
              <div className="w-full bg-gray-50 dark:bg-gray-900 rounded-lg py-2 px-4 text-center border border-gray-100 dark:border-gray-700">
                <span className="font-bold text-lg text-gray-700 dark:text-gray-300">{trustTier}</span>
              </div>

              {trustScore < 40 && (
                <div className="mt-3 p-3 rounded-xl bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-200">
                  <strong>Safety Warning:</strong> This seller has a low trust rating. Avoid upfront payments and report suspicious behavior.
                </div>
              )}

              <div className="mt-4 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleVouch(10)}
                  className="py-2 px-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-all"
                >
                  Vouch (+10)
                </button>
                <button
                  type="button"
                  onClick={() => handleVouch(-10)}
                  className="py-2 px-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-semibold transition-all"
                >
                  Report (-10)
                </button>
              </div>

              {vouchStatus && (
                <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">{vouchStatus}</p>
              )}
              {reportStatus && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400 font-medium">{reportStatus}</p>
              )}
            </div>

            {/* Section 3: Risk Indicators */}
            {riskFlags && riskFlags.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  Risk Indicators
                </h3>
                <div className="flex flex-wrap gap-2.5 mt-2">
                  {riskFlags.map((flag, idx) => (
                    <RiskBadge key={idx} text={flag} />
                  ))}
                </div>
              </div>
            )}

            {/* Section 4: AI Explanation Box */}
            <div className="bg-indigo-600 dark:bg-indigo-900/50 border border-indigo-700 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 blur-[50px] opacity-40 rounded-full pointer-events-none" />
               <h3 className="text-sm font-bold tracking-widest text-indigo-200 mb-3 flex items-center gap-2 uppercase">
                 <Sparkles className="w-4 h-4 text-indigo-300" />
                 AI Analysis
               </h3>
               <p className="text-sm md:text-base leading-relaxed font-medium">
                 {explanation}
               </p>
            </div>

            {/* Section 5: TrustCart Final Decision Box */}
            <div className={`mt-2 rounded-2xl border p-5 flex items-center gap-5 shadow-sm transition-colors ${verdict.color}`}>
               <div className="bg-white/60 dark:bg-black/20 p-3 rounded-xl shadow-inner">
                 {verdict.icon}
               </div>
               <div>
                  <div className="text-xs font-black uppercase tracking-widest mb-1 opacity-70">TrustCart Verdict</div>
                  <div className="text-xl sm:text-2xl font-black">{verdict.text}</div>
               </div>
            </div>

          </div>
        </div>
        
      </div>
    </div>
  );
}
