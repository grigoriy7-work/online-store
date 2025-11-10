import { Layout } from './features/components/layout/Layout';
import { Routes, Route } from 'react-router-dom';
import { SignUpPage } from './pages/SignUpPage';
import { SignInPage } from './pages/SignInPage';

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
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Layout>
  );
}

export default App;
