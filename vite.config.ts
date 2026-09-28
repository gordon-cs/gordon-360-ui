import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import viteTsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
const config = ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [react(), viteTsconfigPaths()],
    server: {
      port: parseInt(process.env.VITE_PORT ?? '5173'),
      host: process.env.VITE_HOST ?? 'localhost',
      proxy: {
        '/api': {
          target: process.env.VITE_API_URL,
          changeOrigin: true,
        },
        '/browseable': {
          target: process.env.VITE_API_URL, // same as your backend URL
          changeOrigin: true,
          secure: false,
        },
      },
    },
  });
};

export default config;
