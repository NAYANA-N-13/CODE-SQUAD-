import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function TrustScore({ score, size = 'md', variant = 'circle', className = '' }) {
  // Compute color themes based on absolute score bracket
  const getColorClasses = (s) => {
    if (s >= 80) {
      return {
        text: 'text-green-600 dark:text-green-400',
        bg: 'bg-green-50/90 dark:bg-green-900/40',
        border: 'border-green-200 dark:border-green-800/50',
        stroke: 'stroke-green-500',
        trail: 'stroke-green-100 dark:stroke-green-900/40',
      };
    }
    if (s >= 50) {
      return {
        text: 'text-yellow-600 dark:text-yellow-400',
        bg: 'bg-yellow-50/90 dark:bg-yellow-900/40',
        border: 'border-yellow-200 dark:border-yellow-800/50',
        stroke: 'stroke-yellow-500',
        trail: 'stroke-yellow-100 dark:stroke-yellow-900/40',
      };
    }
    return {
      text: 'text-red-600 dark:text-red-400',
      bg: 'bg-red-50/90 dark:bg-red-900/40',
      border: 'border-red-200 dark:border-red-800/50',
      stroke: 'stroke-red-500',
      trail: 'stroke-red-100 dark:stroke-red-900/40',
    };
  };

  const colors = getColorClasses(score);

  // Variant: Badge (Used mainly on product cards overlay)
  if (variant === 'badge') {
    return (
      <div className={`backdrop-blur-md px-2.5 py-1 rounded-full shadow-sm text-xs font-bold flex items-center gap-1.5 border tracking-wide ${colors.bg} ${colors.text} ${colors.border} ${className}`}>
        <ShieldCheck className="w-3.5 h-3.5" />
        {score} Trust
      </div>
    );
  }

  // Variant: Circle Progress Bar (Used on detail screens)
  const sizeMetrics = {
    sm: { container: 'w-12 h-12', text: 'text-base' },
    md: { container: 'w-20 h-20', text: 'text-2xl' },
    lg: { container: 'w-32 h-32', text: 'text-5xl' },
  };

  const sm = sizeMetrics[size] || sizeMetrics.md;
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className={`relative flex items-center justify-center ${sm.container} ${className}`}>
      <svg className="w-full h-full -rotate-90 transform drop-shadow-sm" viewBox="0 0 100 100">
        {/* Trail */}
        <circle 
          cx="50" cy="50" r={radius} fill="none" 
          className={colors.trail} 
          strokeWidth="8" 
        />
        {/* Progress Arc */}
        <circle 
          cx="50" cy="50" r={radius} fill="none" 
          className={colors.stroke} 
          strokeWidth="8" 
          strokeLinecap="round" 
          strokeDasharray={circumference} 
          strokeDashoffset={offset} 
          style={{ transition: 'stroke-dashoffset 1s ease-out' }}
        />
      </svg>
      <span className={`absolute font-black ${colors.text} ${sm.text}`}>
        {score}
      </span>
    </div>
  );
}
