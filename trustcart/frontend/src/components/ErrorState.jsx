import { AlertTriangle, RefreshCw, Home, SearchX } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Global Error State UI Component
 * Gracefully handles 404s, Network Drops, and Invalid Parameters.
 */
export default function ErrorState({ title, message, onRetry }) {
  // Infer if this is an ID missing/404 vs a server downtime based on error string
  const isNotFound = message?.toLowerCase().includes("not found") || message?.toLowerCase().includes("invalid") || message?.toLowerCase().includes("missing");
  
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 text-center">
       <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl border border-gray-200 dark:border-gray-700 max-w-md w-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none">
          
          <div className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-inner ${isNotFound ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-500' : 'bg-red-50 dark:bg-red-900/20 text-red-500'}`}>
             {isNotFound ? <SearchX className="w-10 h-10" /> : <AlertTriangle className="w-10 h-10" />}
          </div>
          
          <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2">
            {title || (isNotFound ? "Record Not Found" : "Connection Failed")}
          </h2>
          
          <p className="text-gray-600 dark:text-gray-400 font-medium mb-8 leading-relaxed px-2">
            {message || "Server Down: We encountered an unexpected error while communicating with the TrustCart network."}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            {/* Provide a slick Retry Button ONLY if it's a network glitch, not if the ID physically doesn't exist */}
            {onRetry && !isNotFound && (
              <button 
                onClick={onRetry} 
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold shadow-md shadow-indigo-200 dark:shadow-none transition-all active:scale-95"
              >
                <RefreshCw className="w-4 h-4" /> Try Request Again
              </button>
            )}
            
            <Link 
              to="/" 
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-700/50 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white px-6 py-3 rounded-xl font-bold transition-all active:scale-95 border border-transparent dark:border-gray-600"
            >
              <Home className="w-4 h-4" /> Back to Safety
            </Link>
          </div>
       </div>
    </div>
  );
}
