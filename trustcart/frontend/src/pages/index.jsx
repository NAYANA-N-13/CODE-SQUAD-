import Home from './Home';
import ProductDetail from './ProductDetail';
import SellerProfile from './SellerProfile';

export { Home as HomePage, ProductDetail as ProductDetailPage, SellerProfile as SellerProfilePage };

export function ProductsPage() {
  return <div className="max-w-7xl mx-auto px-4 py-10"><h1 className="font-display font-bold text-3xl mb-6">All Products</h1></div>;
}

export function CartPage() {
  return <div className="max-w-7xl mx-auto px-4 py-10"><h1 className="font-display font-bold text-3xl">Your Cart</h1></div>;
}

export function CheckoutPage() {
  return <div className="max-w-7xl mx-auto px-4 py-10"><h1 className="font-display font-bold text-3xl">Checkout</h1></div>;
}

export function LoginPage() {
  return <div className="min-h-screen flex items-center justify-center"><h1 className="font-display font-bold text-3xl">Sign In</h1></div>;
}

export function RegisterPage() {
  return <div className="min-h-screen flex items-center justify-center"><h1 className="font-display font-bold text-3xl">Create Account</h1></div>;
}

export function AccountPage() {
  return <div className="max-w-7xl mx-auto px-4 py-10"><h1 className="font-display font-bold text-3xl">My Account</h1></div>;
}

export function AIRecommendPage() {
  return <div className="max-w-7xl mx-auto px-4 py-10"><h1 className="font-display font-bold text-3xl">AI Recommendations</h1></div>;
}

export function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="font-display font-bold text-6xl text-gradient">404</h1>
      <p className="text-gray-500">Page not found</p>
      <a href="/" className="btn-primary">Go Home</a>
    </div>
  );
}

