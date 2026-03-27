import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Mail, Lock, ArrowRight, Loader2, AlertCircle } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Passes our controlled state components to the Global AuthContext Hook
      await login({ email, password });
      
      // Navigate to the Dashboard after JWT is stored locally
      navigate('/'); 
    } catch (err) {
      setError(err.message || 'Login failed. Please verify your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-gray-50 dark:bg-[#0a0a0e] px-4 overflow-hidden">
      
      {/* Background Gradient Orbs */}
      <div className="absolute top-1/4 -left-32 w-[30rem] h-[30rem] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-[30rem] h-[30rem] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        
        {/* Branding Identity */}
        <div className="text-center mb-10 mt-safe">
           <Link to="/" className="inline-flex items-center gap-2.5 mb-6 hover:opacity-80 transition-opacity">
              <div className="bg-indigo-600 p-2.5 rounded-xl shadow-lg shadow-indigo-500/30">
                 <Sparkles className="w-7 h-7 text-white" />
              </div>
              <span className="font-display font-black text-3xl tracking-tight text-gray-900 dark:text-white">TrustCart</span>
           </Link>
           <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-3 tracking-tight">Welcome Back</h1>
           <p className="text-gray-500 dark:text-gray-400 font-medium">Please enter your details to sign in.</p>
        </div>

        {/* Glassmorphic Interaction Card */}
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-gray-200 dark:border-gray-800/80 rounded-3xl p-8 shadow-2xl">
          
          {error && (
            <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 text-red-700 dark:text-red-400 p-4 rounded-xl flex items-start gap-3 mb-6 animate-in slide-in-from-top-2">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <p className="text-sm font-semibold">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2" htmlFor="email">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                   <Mail className="w-5 h-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                </div>
                <input 
                  type="email" 
                  id="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="demo@trustcart.ai"
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50/50 dark:bg-gray-950/50 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-gray-900 dark:text-white font-medium shadow-inner"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2" htmlFor="password">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                   <Lock className="w-5 h-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                </div>
                <input 
                  type="password" 
                  id="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••"
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50/50 dark:bg-gray-950/50 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-gray-900 dark:text-white font-medium shadow-inner"
                />
              </div>
            </div>

            <div className="flex items-center justify-between mt-2">
               <label className="flex items-center gap-2 cursor-pointer group">
                 <input type="checkbox" className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700" />
                 <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">Remember me</span>
               </label>
               <Link to="/forgot" className="text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 transition-colors">
                 Forgot password?
               </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-4 rounded-xl transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-wait active:scale-[0.98]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Authenticating Server...
                </>
              ) : (
                <>
                  Sign In Securely
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-sm font-semibold text-gray-500 dark:text-gray-400">
             Don't have an account?{' '}
             <Link to="/register" className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline">
               Start shopping safely
             </Link>
          </div>
          
        </div>
      </div>
    </div>
  );
}
