import { Layout } from './features/components/layout/Layout';
import { Routes, Route } from 'react-router-dom';
import { SignUpPage, SignInPage, ProfilePage } from './pages';
import { CategoriesPage } from './pages/CategoriesPage';

function App() {
  return (
    <Layout>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <h1>Продукты</h1>
            </div>
          }
        />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Layout>
  );
}

export default App;
