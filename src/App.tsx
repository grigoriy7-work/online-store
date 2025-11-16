import { Layout } from './features/components/layout/Layout';
import { Routes, Route } from 'react-router-dom';
import {
  SignUpPage,
  SignInPage,
  ProfilePage,
  ProductsPage,
  CategoriesPage,
  ShoppingCartPage,
  OrdersPage,
  SellerPage,
} from './pages';
import { ProtectedRoute } from './features/components/ProtectedRoute';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<ProductsPage />} />
          <Route path="/online-store" element={<ProductsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/shopping-cart" element={<ShoppingCartPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/seller" element={<SellerPage />} />
        </Route>
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Layout>
  );
}

export default App;
