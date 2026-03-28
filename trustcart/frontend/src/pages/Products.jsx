import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Loader2, Filter } from 'lucide-react';
import TrustScore from '@components/TrustScore';
import { useProducts, useCategories } from '@hooks/useProducts';

export default function Products() {
  const [limit, setLimit] = useState(12);
  const [selectedCategory, setSelectedCategory] = useState('');

  // Fetch the data from FastAPI backend via react-query
  const { data: pageData, isLoading, isFetching, isError, error } = useProducts({ 
    limit,
    category: selectedCategory || undefined
  });

  const { data: categories } = useCategories();

  // Safely extract items from backend response (handles both flat array and paginated object)
  const products = Array.isArray(pageData) ? pageData : pageData?.items || [];
  const total = pageData?.total || products.length;
  const hasMore = products.length < total;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0e] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Area */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 mt-safe">
          <div>
            <h1 className="text-4xl font-black font-display tracking-tight text-gray-900 dark:text-white">
              All Products
            </h1>
            <p className="mt-2 text-gray-500 dark:text-gray-400 font-medium">
              Discover reliable items backed by AI-verified seller ratings.
            </p>
          </div>
          
          {/* Category Filter Pills */}
          {categories && categories.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="flex items-center text-sm font-bold text-gray-400 mr-2">
                <Filter className="w-4 h-4 mr-1"/> Filter:
              </span>
              <button 
                onClick={() => { setSelectedCategory(''); setLimit(12); }}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${!selectedCategory ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-sm border border-gray-200 dark:border-gray-700'}`}
              >
                All
              </button>
              {categories.map(cat => (
                 <button 
                   key={cat}
                   onClick={() => { setSelectedCategory(cat); setLimit(12); }}
                   className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${selectedCategory === cat ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-sm border border-gray-200 dark:border-gray-700'}`}
                 >
                   {cat}
                 </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Grid Area */}
        {isError ? (
           <div className="min-h-[40vh] flex flex-col items-center justify-center bg-red-50/50 dark:bg-red-900/10 rounded-3xl border border-red-200 dark:border-red-800 border-dashed p-8 text-center max-w-2xl mx-auto">
             <div className="w-16 h-16 bg-red-100 dark:bg-red-900/40 rounded-full flex items-center justify-center mb-4">
                 <span className="text-3xl">⚠️</span>
             </div>
             <p className="text-xl text-red-600 dark:text-red-400 font-bold mb-2">Connection Error</p>
             <p className="text-gray-500 font-medium">{error?.message || "Failed to fetch products. Is the backend running?"}</p>
           </div>
        ) : isLoading && products.length === 0 ? (
          <div className="min-h-[40vh] flex flex-col items-center justify-center gap-4">
             <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
             <p className="text-gray-500 font-medium animate-pulse">Fetching verified products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="min-h-[40vh] flex flex-col items-center justify-center bg-white/50 dark:bg-gray-900/50 rounded-3xl border border-gray-200 dark:border-gray-800 border-dashed">
            <p className="text-xl text-gray-500 font-semibold mb-2">No products found here.</p>
            <button onClick={() => setSelectedCategory('')} className="text-indigo-600 font-bold hover:underline">Clear Filters</button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <Link key={product.id} to={`/products/${product.id}`} className="group relative bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700/80 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col">
                  
                  {/* Trust Badge overlay */}
                  <TrustScore 
                    score={product.trustScore || product.trust_score} 
                    variant="badge" 
                    className="absolute top-4 right-4 z-10 shadow-lg"
                  />

                  {/* Product Image */}
                  <div className="w-full aspect-[4/3] bg-gray-100 dark:bg-gray-900 overflow-hidden relative">
                    <img 
                      src={product.image_url || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80'} 
                      alt={product.name}
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Product Info */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white leading-tight mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2" title={product.name}>
                        {product.name}
                      </h3>
                      <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3">
                        {product.category}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-4 text-sm text-yellow-500 bg-yellow-50 dark:bg-yellow-500/10 w-fit px-2 py-1 rounded-md">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="font-extrabold text-gray-900 dark:text-yellow-400">{product.rating}</span>
                      <span className="text-gray-500 font-medium">({product.review_count})</span>
                    </div>

                    <div className="flex items-end justify-between border-t border-gray-100 dark:border-gray-700/50 pt-4 mt-auto">
                      <div>
                        {product.discounted_price && product.discounted_price < product.price ? (
                            <>
                              <span className="text-sm text-gray-400 line-through mr-2 font-medium">${product.price.toFixed(2)}</span>
                              <span className="text-2xl font-black tracking-tight text-gray-900 dark:text-white">
                                ${(product.discounted_price).toFixed(2)}
                              </span>
                            </>
                        ) : (
                            <span className="text-2xl font-black tracking-tight text-gray-900 dark:text-white">
                              ${(product.price || 0).toFixed(2)}
                            </span>
                        )}
                      </div>
                      <span className="px-3.5 py-2 bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-300 text-sm font-bold rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                        View
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="mt-14 flex justify-center">
                <button 
                  onClick={() => setLimit(l => l + 12)}
                  disabled={isFetching}
                  className="px-8 py-4 bg-white dark:bg-gray-800 text-indigo-600 dark:text-white border-2 border-indigo-100 dark:border-gray-700 font-bold rounded-2xl hover:border-indigo-600 dark:hover:border-indigo-500 hover:shadow-xl hover:shadow-indigo-600/10 transition-all flex items-center gap-3 active:scale-[0.98] disabled:opacity-70 disabled:cursor-wait"
                >
                  {isFetching ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Loading Database...</>
                  ) : (
                    'Load More Products'
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
