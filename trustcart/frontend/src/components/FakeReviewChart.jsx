import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { AlertTriangle, CheckCircle } from 'lucide-react';

const COLORS = ['#ef4444', '#10b981']; // Red for suspicious, Green for genuine

export default function FakeReviewChart({ stats, explanation }) {
  const data = [
    { name: 'Suspicious', value: stats.suspiciousPct },
    { name: 'Genuine', value: stats.genuinePct },
  ];

  const hasHighRisk = stats.suspiciousPct > 30;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">AI Fake Review Analysis</h3>
        {hasHighRisk && (
           <span className="bg-red-100 text-red-700 text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">High Risk</span>
        )}
      </div>

      <div className="flex-1 flex flex-col lg:flex-row items-center gap-6">
        {/* Pie Chart */}
        <div className="w-48 h-48 shrink-0 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={85}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <RechartsTooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                itemStyle={{ fontWeight: 'bold' }}
                formatter={(value) => [`${value}%`, undefined]}
              />
            </PieChart>
          </ResponsiveContainer>
          
          {/* Inner Label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
            <span className="text-3xl font-black text-gray-900 dark:text-white leading-none">
              {stats.genuinePct}%
            </span>
            <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest mt-1">
              Valid
            </span>
          </div>
        </div>

        {/* Breakdown Text & Legend */}
        <div className="flex-1 space-y-4 w-full">
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-3 border border-gray-100 dark:border-gray-800 space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="flex items-center gap-2 font-medium text-gray-700 dark:text-gray-300">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Genuine Reviews
              </span>
              <span className="font-bold">{stats.genuinePct}%</span>
            </div>
            <div className="flex justify-between items-center text-sm pt-2 border-t border-gray-200 dark:border-gray-800">
              <span className="flex items-center gap-2 font-medium text-gray-700 dark:text-gray-300">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> Suspicious Patterns
              </span>
              <span className="font-bold text-red-500">{stats.suspiciousPct}%</span>
            </div>
          </div>

          <div className={`p-4 rounded-xl border relative mt-4 ${hasHighRisk ? 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-900/50' : 'bg-emerald-50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-900/50'}`}>
             <div className="absolute -left-2 -top-2 bg-white dark:bg-gray-800 rounded-full shadow-sm p-0.5">
                {hasHighRisk ? <AlertTriangle className="w-5 h-5 text-red-500" /> : <CheckCircle className="w-5 h-5 text-emerald-500" />}
             </div>
             <p className={`text-sm leading-relaxed indent-2 ${hasHighRisk ? 'text-red-800 dark:text-red-300' : 'text-emerald-800 dark:text-emerald-300'}`}>
               {explanation}
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}
