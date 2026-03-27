/**
 * TrustBadge – displays an AI-computed trust score with an appropriate colour ring.
 * Props:
 *   score   {number}  0–100
 *   size    {'sm'|'md'|'lg'}
 */
export default function TrustBadge({ score, size = 'md' }) {
  const tier =
    score >= 80 ? { label: 'Highly Trusted', color: 'trust-green' } :
    score >= 50 ? { label: 'Moderately Trusted', color: 'trust-gold' } :
                  { label: 'Low Trust', color: 'trust-red' };

  const sizeClasses = {
    sm: 'w-10 h-10 text-xs',
    md: 'w-14 h-14 text-sm',
    lg: 'w-20 h-20 text-lg',
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={`${sizeClasses[size]} rounded-full border-4 border-${tier.color} flex items-center justify-center font-bold text-${tier.color} bg-${tier.color}/5`}
        aria-label={`Trust score: ${score}`}
        role="img"
      >
        {score}
      </div>
      <span className={`text-[10px] font-semibold text-${tier.color} uppercase tracking-wide`}>{tier.label}</span>
    </div>
  );
}
