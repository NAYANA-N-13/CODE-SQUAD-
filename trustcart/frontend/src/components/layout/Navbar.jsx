import { Link, NavLink } from 'react-router-dom';
import { ShoppingCart, Sparkles, Search, User, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@context/CartContext';
import { useAuth } from '@context/AuthContext';

const NAV_LINKS = [
  { to: '/products',     label: 'Shop' },
  { to: '/ai-recommend', label: 'AI Picks' },
];

export default function Navbar() {
  const { totalItems }      = useCart();
  const { user, logout }    = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass border-b border-gray-200/50 dark:border-gray-700/30">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-display font-bold text-xl">
          <Sparkles className="text-primary-500 w-5 h-5" />
          <span className="text-gradient">TrustCart</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `btn-ghost ${isActive ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20' : ''}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button className="btn-ghost hidden sm:flex" aria-label="Search">
            <Search className="w-4 h-4" />
          </button>

          <Link to="/cart" className="btn-ghost relative" aria-label="Cart">
            <ShoppingCart className="w-4 h-4" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary-600 text-white text-[10px] font-bold flex items-center justify-center">
                {totalItems > 9 ? '9+' : totalItems}
              </span>
            )}
          </Link>

          {user ? (
            <button onClick={logout} className="btn-ghost hidden sm:flex" aria-label="Account">
              <User className="w-4 h-4" />
            </button>
          ) : (
            <Link to="/login" className="btn-primary hidden sm:flex">Sign In</Link>
          )}

          {/* Mobile hamburger */}
          <button
            className="btn-ghost md:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden glass border-t border-gray-200/50 dark:border-gray-700/30 px-4 py-3 flex flex-col gap-1 animate-slide-up">
          {NAV_LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} className="btn-ghost" onClick={() => setMobileOpen(false)}>
              {l.label}
            </NavLink>
          ))}
          {!user && <Link to="/login" className="btn-primary mt-1" onClick={() => setMobileOpen(false)}>Sign In</Link>}
        </div>
      )}
    </header>
  );
}
