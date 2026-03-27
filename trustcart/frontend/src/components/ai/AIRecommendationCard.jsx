/**
 * AIRecommendationCard – wraps a recommended product with AI reasoning.
 */
export default function AIRecommendationCard({ product, reason }) {
  return (
    <div className="card p-4 flex gap-4 hover:shadow-glow transition-shadow duration-300">
      <img
        src={product.imageUrl ?? '/placeholder.png'}
        alt={product.name}
        className="w-20 h-20 object-cover rounded-xl shrink-0"
      />
      <div className="flex flex-col gap-1 flex-1 min-w-0">
        <p className="text-xs font-semibold text-primary-500 uppercase tracking-wide">AI Recommended</p>
        <h3 className="font-semibold text-gray-900 dark:text-white text-sm truncate">{product.name}</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{reason}</p>
        <p className="font-bold text-gray-900 dark:text-white mt-auto">₹{product.price?.toLocaleString()}</p>
      </div>
    </div>
  );
}
