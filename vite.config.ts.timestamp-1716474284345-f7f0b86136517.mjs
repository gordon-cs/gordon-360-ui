// vite.config.ts
import react from "file:///nfs/users/arabella.ji/summer-practicum/gordon-360-ui/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { defineConfig, loadEnv, splitVendorChunkPlugin } from "file:///nfs/users/arabella.ji/summer-practicum/gordon-360-ui/node_modules/vite/dist/node/index.js";
import viteTsconfigPaths from "file:///nfs/users/arabella.ji/summer-practicum/gordon-360-ui/node_modules/vite-tsconfig-paths/dist/index.mjs";
var config = ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    build: {
      target: "es2022"
    },
    plugins: [react(), viteTsconfigPaths(), splitVendorChunkPlugin()],
    server: {
      port: parseInt(process.env.VITE_PORT ?? "5173"),
      host: process.env.VITE_HOST ?? "localhost",
      proxy: {
        "/api": {
          target: process.env.VITE_API_URL,
          changeOrigin: true
        }
      }
    }
  });
};
var vite_config_default = config;
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvbmZzL3VzZXJzL2FyYWJlbGxhLmppL3N1bW1lci1wcmFjdGljdW0vZ29yZG9uLTM2MC11aVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL25mcy91c2Vycy9hcmFiZWxsYS5qaS9zdW1tZXItcHJhY3RpY3VtL2dvcmRvbi0zNjAtdWkvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL25mcy91c2Vycy9hcmFiZWxsYS5qaS9zdW1tZXItcHJhY3RpY3VtL2dvcmRvbi0zNjAtdWkvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52LCBzcGxpdFZlbmRvckNodW5rUGx1Z2luIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgdml0ZVRzY29uZmlnUGF0aHMgZnJvbSAndml0ZS10c2NvbmZpZy1wYXRocyc7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5jb25zdCBjb25maWcgPSAoeyBtb2RlIH0pID0+IHtcbiAgcHJvY2Vzcy5lbnYgPSB7IC4uLnByb2Nlc3MuZW52LCAuLi5sb2FkRW52KG1vZGUsIHByb2Nlc3MuY3dkKCkpIH07XG5cbiAgcmV0dXJuIGRlZmluZUNvbmZpZyh7XG4gICAgYnVpbGQ6IHtcbiAgICAgIHRhcmdldDogJ2VzMjAyMicsXG4gICAgfSxcbiAgICBwbHVnaW5zOiBbcmVhY3QoKSwgdml0ZVRzY29uZmlnUGF0aHMoKSwgc3BsaXRWZW5kb3JDaHVua1BsdWdpbigpXSxcbiAgICBzZXJ2ZXI6IHtcbiAgICAgIHBvcnQ6IHBhcnNlSW50KHByb2Nlc3MuZW52LlZJVEVfUE9SVCA/PyAnNTE3MycpLFxuICAgICAgaG9zdDogcHJvY2Vzcy5lbnYuVklURV9IT1NUID8/ICdsb2NhbGhvc3QnLFxuICAgICAgcHJveHk6IHtcbiAgICAgICAgJy9hcGknOiB7XG4gICAgICAgICAgdGFyZ2V0OiBwcm9jZXNzLmVudi5WSVRFX0FQSV9VUkwsXG4gICAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICB9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbmZpZztcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBaVYsT0FBTyxXQUFXO0FBQ25XLFNBQVMsY0FBYyxTQUFTLDhCQUE4QjtBQUM5RCxPQUFPLHVCQUF1QjtBQUc5QixJQUFNLFNBQVMsQ0FBQyxFQUFFLEtBQUssTUFBTTtBQUMzQixVQUFRLE1BQU0sRUFBRSxHQUFHLFFBQVEsS0FBSyxHQUFHLFFBQVEsTUFBTSxRQUFRLElBQUksQ0FBQyxFQUFFO0FBRWhFLFNBQU8sYUFBYTtBQUFBLElBQ2xCLE9BQU87QUFBQSxNQUNMLFFBQVE7QUFBQSxJQUNWO0FBQUEsSUFDQSxTQUFTLENBQUMsTUFBTSxHQUFHLGtCQUFrQixHQUFHLHVCQUF1QixDQUFDO0FBQUEsSUFDaEUsUUFBUTtBQUFBLE1BQ04sTUFBTSxTQUFTLFFBQVEsSUFBSSxhQUFhLE1BQU07QUFBQSxNQUM5QyxNQUFNLFFBQVEsSUFBSSxhQUFhO0FBQUEsTUFDL0IsT0FBTztBQUFBLFFBQ0wsUUFBUTtBQUFBLFVBQ04sUUFBUSxRQUFRLElBQUk7QUFBQSxVQUNwQixjQUFjO0FBQUEsUUFDaEI7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0YsQ0FBQztBQUNIO0FBRUEsSUFBTyxzQkFBUTsiLAogICJuYW1lcyI6IFtdCn0K
