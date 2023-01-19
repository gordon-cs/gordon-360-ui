import { defineConfig, loadEnv, splitVendorChunkPlugin } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [react(), viteTsconfigPaths(), splitVendorChunkPlugin()],
    server: {
      proxy: {
        '/api': {
          target: process.env.VITE_API_URL,
          changeOrigin: true,
        },
      }
    }
  })
};
