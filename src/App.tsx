import { Layout } from './features/components/layout/Layout';
import { AuthForm } from './features/auth/AuthForm';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Layout>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <h1>Продукты</h1>
              </div>
            }
          />
          <Route path="/registration" element={<AuthForm type="signUp" />} />
          <Route path="/auth" element={<AuthForm type="signIn" />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </div>
    </Layout>
  );
}

export default App;
