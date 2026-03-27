import { ShieldCheck, Star } from 'lucide-react';
import { useCart } from '@context/CartContext';

/**
 * ProductCard – reusable card for grid/list displays.
 * @param {{ product: object }} props
 */
export default function ProductCard({ product }) {
  const { addItem } = useCart();

  const trustColor =
    product.trustScore >= 80 ? 'text-trust-green' :
    product.trustScore >= 50 ? 'text-trust-gold'  : 'text-trust-red';

  return (
    <article className="card group overflow-hidden hover:-translate-y-1 transition-transform duration-300 flex flex-col">
      {/* Image */}
      <div className="relative overflow-hidden aspect-square bg-gray-100 dark:bg-gray-700">
        <img
          src={product.imageUrl ?? '/placeholder.png'}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.trustScore && (
          <div className="absolute top-2 right-2 glass rounded-xl px-2 py-1 flex items-center gap-1">
            <ShieldCheck className={`w-3 h-3 ${trustColor}`} />
            <span className={`text-xs font-bold ${trustColor}`}>{product.trustScore}</span>
          </div>
        )}
        {product.badge && (
          <span className="absolute top-2 left-2 badge bg-primary-600 text-white">{product.badge}</span>
        )}
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1 gap-2">
        <p className="text-xs text-gray-400 uppercase tracking-wide">{product.category}</p>
        <h2 className="font-semibold text-sm text-gray-900 dark:text-gray-100 line-clamp-2 leading-snug">{product.name}</h2>

        {/* Rating */}
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-3 h-3 ${i < Math.round(product.rating) ? 'text-trust-gold fill-trust-gold' : 'text-gray-300'}`}
            />
          ))}
          <span className="text-xs text-gray-400 ml-1">({product.reviewCount ?? 0})</span>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between mt-auto pt-2">
          <span className="font-bold text-gray-900 dark:text-white text-base">₹{product.price?.toLocaleString()}</span>
          <button
            onClick={() => addItem(product)}
            className="btn-primary text-xs px-3 py-1.5"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}
