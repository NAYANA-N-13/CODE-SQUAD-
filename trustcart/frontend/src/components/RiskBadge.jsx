import { AlertTriangle, AlertCircle, CheckCircle } from 'lucide-react';

export default function RiskBadge({ type = 'warning', text }) {
  // Auto-infer type based on common string keywords if not explicitly overridden
  let activeType = type;
  const lowerText = text.toLowerCase();
  
  if (lowerText.includes('suspicious') || lowerText.includes('below threshold') || lowerText.includes('low delivery')) {
    activeType = 'danger';
  } else if (lowerText.includes('clean') || lowerText.includes('safe') || lowerText.includes('verified')) {
    activeType = 'safe';
  } else if (lowerText.includes('new seller') || lowerText.includes('warning')) {
    activeType = 'warning';
  }

  const getTheme = () => {
    switch (activeType) {
      case 'danger':
        return {
          wrapper: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800/50',
          icon: <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-500" />,
          text: 'text-red-800 dark:text-red-400',
        };
      case 'safe':
        return {
          wrapper: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800/50',
          icon: <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-500" />,
          text: 'text-green-800 dark:text-green-400',
        };
      case 'warning':
      default:
        return {
          wrapper: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800/50',
          icon: <AlertCircle className="w-4 h-4 text-yellow-600 dark:text-yellow-500" />,
          text: 'text-yellow-800 dark:text-yellow-400',
        };
    }
  };

  const theme = getTheme();

  return (
    <div className={`inline-flex items-center gap-1.5 border rounded-full px-3 py-1 shadow-sm ${theme.wrapper}`}>
      {theme.icon}
      <span className={`text-xs font-bold tracking-wide uppercase ${theme.text}`}>
        {text}
      </span>
    </div>
  );
}
