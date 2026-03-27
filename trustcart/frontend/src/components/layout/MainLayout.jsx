import { Outlet } from 'react-router-dom';
import Navbar  from './Navbar';
import Footer  from './Footer';
import { AuthProvider } from '@context/AuthContext';
import { CartProvider } from '@context/CartContext';

/**
 * MainLayout wraps all authenticated/public routes with Navbar + Footer.
 * Context providers are nested here so every child page has access.
 */
export default function MainLayout() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">
            <Outlet />
          </main>
          <Footer />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}
