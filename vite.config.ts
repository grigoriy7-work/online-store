import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const repoName = 'online-store';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: `/${repoName}/`,
});
