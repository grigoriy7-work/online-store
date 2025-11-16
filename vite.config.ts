import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const repoName = 'https://github.com/grigoriy7-work/online-store';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: `/${repoName}/`,
});
