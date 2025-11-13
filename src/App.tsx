import { Layout } from './features/components/layout/Layout';
import { Routes, Route } from 'react-router-dom';
import {
  SignUpPage,
  SignInPage,
  ProfilePage,
  ProductsPage,
  CategoriesPage,
  ShoppingCartPage,
} from './pages';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/shopping-cart" element={<ShoppingCartPage />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Layout>
  );
}

export default App;
