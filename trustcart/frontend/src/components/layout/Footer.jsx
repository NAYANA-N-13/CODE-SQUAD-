import { Link } from 'react-router-dom';
import { Sparkles, Github, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <Link to="/" className="flex items-center gap-2 font-display font-bold text-lg mb-3">
            <Sparkles className="text-primary-500 w-4 h-4" />
            <span className="text-gradient">TrustCart</span>
          </Link>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            AI-powered shopping you can trust. Verified products, honest reviews.
          </p>
          <div className="flex gap-3 mt-4">
            {[Github, Twitter, Instagram].map((Icon, i) => (
              <a key={i} href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Shop */}
        <div>
          <h3 className="font-semibold text-sm text-gray-800 dark:text-gray-200 mb-3">Shop</h3>
          <ul className="space-y-2">
            {['All Products', 'AI Recommendations', 'Deals', 'New Arrivals'].map((l) => (
              <li key={l}><a href="#" className="text-sm text-gray-500 hover:text-primary-600 dark:hover:text-primary-400">{l}</a></li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="font-semibold text-sm text-gray-800 dark:text-gray-200 mb-3">Support</h3>
          <ul className="space-y-2">
            {['Help Center', 'Returns', 'Order Tracking', 'Contact Us'].map((l) => (
              <li key={l}><a href="#" className="text-sm text-gray-500 hover:text-primary-600 dark:hover:text-primary-400">{l}</a></li>
            ))}
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="font-semibold text-sm text-gray-800 dark:text-gray-200 mb-3">Legal</h3>
          <ul className="space-y-2">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((l) => (
              <li key={l}><a href="#" className="text-sm text-gray-500 hover:text-primary-600 dark:hover:text-primary-400">{l}</a></li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-100 dark:border-gray-800 py-4 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} TrustCart. All rights reserved.
      </div>
    </footer>
  );
}
