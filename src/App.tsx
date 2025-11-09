import { Layout } from './features/components/layout/Layout';
import { AuthForm } from './features/auth/AuthForm';

function App() {
  return (
    <Layout>
      <div>
        <AuthForm />
      </div>
    </Layout>
  );
}

export default App;
