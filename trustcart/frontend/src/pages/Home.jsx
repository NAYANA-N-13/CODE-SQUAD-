import { Link } from 'react-router-dom';
import { ShieldCheck, Zap, Star } from 'lucide-react';
import TrustScore from '@components/TrustScore';

const MOCK_PRODUCTS = [
  { id: '1', name: 'Acoustic Noise Cancelling Headphones', price: 299.99, rating: 4.8, reviews: 124, trustScore: 98, seller: 'AudioTech Pro', category: 'Electronics', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80' },
  { id: '2', name: 'Minimalist Smartwatch Series X', price: 199.50, rating: 4.5, reviews: 89, trustScore: 72, seller: 'GadgetHub', category: 'Wearables', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80' },
  { id: '3', name: 'Mechanical Keyboard RGB Custom', price: 149.00, rating: 4.9, reviews: 342, trustScore: 85, seller: 'KeyMasters', category: 'Computers', image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80' },
  { id: '4', name: 'Ultra-slim 4K Portable Monitor', price: 329.00, rating: 4.2, reviews: 56, trustScore: 42, seller: 'TechOrbit', category: 'Displays', image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80' },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Hero Section */}
      <section className="relative px-4 py-24 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-white dark:from-gray-800 dark:to-gray-900 -z-10 rounded-3xl mt-8 mx-4 sm:mx-8"></div>
        <div className="text-center max-w-3xl mx-auto space-y-8">
          <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-6xl text-balance">
            Shop with <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Absolute Confidence</span>
          </h1>
          <p className="text-xl text-gray-500 dark:text-gray-400">
            TrustCart evaluates sellers in real-time. Only top-rated items from verified sellers reach our front page.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/products" className="px-8 py-3 text-base font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 dark:shadow-none transition-all">
              Start Shopping
            </Link>
            <Link to="/ai-recommend" className="px-8 py-3 text-base font-medium rounded-full text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 transition-all">
              Try AI Recommendations
            </Link>
          </div>
        </div>

        {/* Feature points */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center dark:bg-green-900/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">AI Fraud Detection</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Every review is algorithmically vetted against fake patterns.</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center dark:bg-blue-900/30">
              <Star className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Seller Trust Scores</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Transparent 0-100 badges indicating seller reliability and delivery success.</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center dark:bg-purple-900/30">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Instant Protection</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Escrow payments held until you verify receipt of the item.</p>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Trending on TrustCart</h2>
          <Link to="/products" className="text-indigo-600 hover:text-indigo-500 font-medium text-sm">View all →</Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_PRODUCTS.map((product) => (
            <Link key={product.id} to={`/products/${product.id}`} className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
              
              {/* Trust Badge overlay */}
              <TrustScore 
                score={product.trustScore} 
                variant="badge" 
                className="absolute top-3 right-3 z-10"
              />

              {/* Product Image */}
              <div className="w-full h-48 bg-gray-100 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Product Info */}
              <div className="p-5 space-y-3">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white truncate" title={product.name}>
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    by <span className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline">{product.seller}</span>
                  </p>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-yellow-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-bold text-gray-700 dark:text-gray-300">{product.rating}</span>
                  <span className="text-gray-400">({product.reviews})</span>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-xl font-bold text-gray-900 dark:text-white">
                    ${product.price.toFixed(2)}
                  </span>
                  <button className="px-3 py-1.5 bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white text-sm font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                    Add
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
