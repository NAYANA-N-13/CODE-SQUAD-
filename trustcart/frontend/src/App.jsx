import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '@components/layout/MainLayout';
import {
  HomePage,
  ProductsPage,
  ProductDetailPage as ProductDetail,
  CartPage,
  CheckoutPage,
  LoginPage,
  RegisterPage,
  AccountPage,
  AIRecommendPage,
  NotFoundPage,
  SellerProfilePage,
} from '@pages/index';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index                   element={<HomePage />} />
          <Route path="products"         element={<ProductsPage />} />
          <Route path="products/:id"     element={<ProductDetail />} />
          <Route path="cart"             element={<CartPage />} />
          <Route path="checkout"         element={<CheckoutPage />} />
          <Route path="account"          element={<AccountPage />} />
          <Route path="ai-recommend"     element={<AIRecommendPage />} />
          <Route path="seller/:id"       element={<SellerProfilePage />} />
        </Route>

        {/* Auth routes (no main layout) */}
        <Route path="login"    element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
