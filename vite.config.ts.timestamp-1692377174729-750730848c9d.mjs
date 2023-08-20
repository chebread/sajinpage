// vite.config.ts
import { defineConfig } from "file:///Users/ihaneum/workspace/sajin.page/.yarn/__virtual__/vite-virtual-7a3b21c79d/0/cache/vite-npm-4.4.2-30a21cad61-37a1c3a0cc.zip/node_modules/vite/dist/node/index.js";
import react from "file:///Users/ihaneum/workspace/sajin.page/.yarn/__virtual__/@vitejs-plugin-react-virtual-efb64ef586/0/cache/@vitejs-plugin-react-npm-4.0.0-e0a2ed08ce-575298f665.zip/node_modules/@vitejs/plugin-react/dist/index.mjs";
import tsconfigPaths from "file:///Users/ihaneum/workspace/sajin.page/.yarn/__virtual__/vite-tsconfig-paths-virtual-8b852146f0/0/cache/vite-tsconfig-paths-npm-4.2.0-af5eeb1a7e-73a8467de7.zip/node_modules/vite-tsconfig-paths/dist/index.mjs";
import svgr from "file:///Users/ihaneum/workspace/sajin.page/.yarn/__virtual__/vite-plugin-svgr-virtual-66d303b678/0/cache/vite-plugin-svgr-npm-2.4.0-9b893a40f7-16b333a728.zip/node_modules/vite-plugin-svgr/dist/index.mjs";
import mkcert from "file:///Users/ihaneum/workspace/sajin.page/.yarn/__virtual__/vite-plugin-mkcert-virtual-46ba7a919d/0/cache/vite-plugin-mkcert-npm-1.14.1-7dd81ca4b6-5dd06c3850.zip/node_modules/vite-plugin-mkcert/dist/mkcert.mjs";
var vite_config_default = defineConfig(async () => {
  return {
    optimizeDeps: {
      include: ["react/jsx-runtime"]
    },
    plugins: [
      react(),
      tsconfigPaths(),
      svgr(),
      mkcert(),
      ViteFaviconsPlugin({
        logo: "public/assets/logo.png",
        favicons: {
          path: "assets/"
        }
      })
    ],
    server: {
      port: 5050,
      https: true
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvaWhhbmV1bS93b3Jrc3BhY2Uvc2FqaW4ucGFnZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2loYW5ldW0vd29ya3NwYWNlL3NhamluLnBhZ2Uvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2loYW5ldW0vd29ya3NwYWNlL3NhamluLnBhZ2Uvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5pbXBvcnQgdHNjb25maWdQYXRocyBmcm9tICd2aXRlLXRzY29uZmlnLXBhdGhzJzsgLy8gdml0ZVx1Qzc1OCBcdUM4MDhcdUIzMDBcdUFDQkRcdUI4NUMgXHVCOUY1XHVENTUxIFx1QkFBOFx1QjRDOFxuaW1wb3J0IHN2Z3IgZnJvbSAndml0ZS1wbHVnaW4tc3Zncic7XG5pbXBvcnQgbWtjZXJ0IGZyb20gJ3ZpdGUtcGx1Z2luLW1rY2VydCc7XG5cbi8vICgwKTogY2xlYXIgY29uc29sZSBcdUNEOTRcdUFDMDBcdUQ1NThcdUFFMzBcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoYXN5bmMgKCkgPT4ge1xuICByZXR1cm4ge1xuICAgIG9wdGltaXplRGVwczoge1xuICAgICAgaW5jbHVkZTogWydyZWFjdC9qc3gtcnVudGltZSddLFxuICAgIH0sXG4gICAgcGx1Z2luczogW1xuICAgICAgcmVhY3QoKSxcbiAgICAgIHRzY29uZmlnUGF0aHMoKSxcbiAgICAgIHN2Z3IoKSxcbiAgICAgIG1rY2VydCgpLFxuICAgICAgVml0ZUZhdmljb25zUGx1Z2luKHtcbiAgICAgICAgbG9nbzogJ3B1YmxpYy9hc3NldHMvbG9nby5wbmcnLFxuICAgICAgICBmYXZpY29uczoge1xuICAgICAgICAgIHBhdGg6ICdhc3NldHMvJyxcbiAgICAgICAgfSxcbiAgICAgIH0pLFxuICAgIF0sXG4gICAgc2VydmVyOiB7XG4gICAgICBwb3J0OiA1MDUwLFxuICAgICAgaHR0cHM6IHRydWUsXG4gICAgfSxcbiAgfTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUEyUixTQUFTLG9CQUFvQjtBQUN4VCxPQUFPLFdBQVc7QUFDbEIsT0FBTyxtQkFBbUI7QUFDMUIsT0FBTyxVQUFVO0FBQ2pCLE9BQU8sWUFBWTtBQUluQixJQUFPLHNCQUFRLGFBQWEsWUFBWTtBQUN0QyxTQUFPO0FBQUEsSUFDTCxjQUFjO0FBQUEsTUFDWixTQUFTLENBQUMsbUJBQW1CO0FBQUEsSUFDL0I7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLE1BQU07QUFBQSxNQUNOLGNBQWM7QUFBQSxNQUNkLEtBQUs7QUFBQSxNQUNMLE9BQU87QUFBQSxNQUNQLG1CQUFtQjtBQUFBLFFBQ2pCLE1BQU07QUFBQSxRQUNOLFVBQVU7QUFBQSxVQUNSLE1BQU07QUFBQSxRQUNSO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDSDtBQUFBLElBQ0EsUUFBUTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLElBQ1Q7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
