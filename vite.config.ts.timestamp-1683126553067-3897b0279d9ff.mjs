// vite.config.ts
import { defineConfig } from "file:///Users/ihaneum/workspace/sajin.app/.yarn/__virtual__/vite-virtual-e2c67f2b94/0/cache/vite-npm-4.3.4-4744edd48c-90ce3923ef.zip/node_modules/vite/dist/node/index.js";
import react from "file:///Users/ihaneum/workspace/sajin.app/.yarn/__virtual__/@vitejs-plugin-react-virtual-132d9e42d1/0/cache/@vitejs-plugin-react-npm-4.0.0-e0a2ed08ce-575298f665.zip/node_modules/@vitejs/plugin-react/dist/index.mjs";
import tsconfigPaths from "file:///Users/ihaneum/workspace/sajin.app/.yarn/__virtual__/vite-tsconfig-paths-virtual-0e1908ddcf/0/cache/vite-tsconfig-paths-npm-4.2.0-af5eeb1a7e-73a8467de7.zip/node_modules/vite-tsconfig-paths/dist/index.mjs";
import svgr from "file:///Users/ihaneum/workspace/sajin.app/.yarn/__virtual__/vite-plugin-svgr-virtual-7b8a7b5c2d/0/cache/vite-plugin-svgr-npm-2.4.0-9b893a40f7-16b333a728.zip/node_modules/vite-plugin-svgr/dist/index.mjs";
import mkcert from "file:///Users/ihaneum/workspace/sajin.app/.yarn/__virtual__/vite-plugin-mkcert-virtual-3f356a2738/0/cache/vite-plugin-mkcert-npm-1.14.1-7dd81ca4b6-5dd06c3850.zip/node_modules/vite-plugin-mkcert/dist/mkcert.mjs";
var vite_config_default = defineConfig(async () => {
  return {
    optimizeDeps: {
      include: ["react/jsx-runtime"]
    },
    plugins: [react(), tsconfigPaths(), svgr(), mkcert()],
    server: {
      port: 5050,
      https: true,
      open: true
      // 브라우저에서 열음
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvaWhhbmV1bS93b3Jrc3BhY2Uvc2FqaW4uYXBwXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvaWhhbmV1bS93b3Jrc3BhY2Uvc2FqaW4uYXBwL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9paGFuZXVtL3dvcmtzcGFjZS9zYWppbi5hcHAvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xuaW1wb3J0IHRzY29uZmlnUGF0aHMgZnJvbSBcInZpdGUtdHNjb25maWctcGF0aHNcIjsgLy8gdml0ZVx1Qzc1OCBcdUM4MDhcdUIzMDBcdUFDQkRcdUI4NUMgXHVCOUY1XHVENTUxIFx1QkFBOFx1QjRDOFxuaW1wb3J0IHN2Z3IgZnJvbSBcInZpdGUtcGx1Z2luLXN2Z3JcIjtcbmltcG9ydCBta2NlcnQgZnJvbSBcInZpdGUtcGx1Z2luLW1rY2VydFwiO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKGFzeW5jICgpID0+IHtcbiAgcmV0dXJuIHtcbiAgICBvcHRpbWl6ZURlcHM6IHtcbiAgICAgIGluY2x1ZGU6IFtcInJlYWN0L2pzeC1ydW50aW1lXCJdLFxuICAgIH0sXG4gICAgcGx1Z2luczogW3JlYWN0KCksIHRzY29uZmlnUGF0aHMoKSwgc3ZncigpLCBta2NlcnQoKV0sXG4gICAgc2VydmVyOiB7XG4gICAgICBwb3J0OiA1MDUwLFxuICAgICAgaHR0cHM6IHRydWUsXG4gICAgICBvcGVuOiB0cnVlLCAvLyBcdUJFMENcdUI3N0NcdUM2QjBcdUM4MDBcdUM1RDBcdUMxMUMgXHVDNUY0XHVDNzRDXG4gICAgfSxcbiAgfTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF3UixTQUFTLG9CQUFvQjtBQUNyVCxPQUFPLFdBQVc7QUFDbEIsT0FBTyxtQkFBbUI7QUFDMUIsT0FBTyxVQUFVO0FBQ2pCLE9BQU8sWUFBWTtBQUduQixJQUFPLHNCQUFRLGFBQWEsWUFBWTtBQUN0QyxTQUFPO0FBQUEsSUFDTCxjQUFjO0FBQUEsTUFDWixTQUFTLENBQUMsbUJBQW1CO0FBQUEsSUFDL0I7QUFBQSxJQUNBLFNBQVMsQ0FBQyxNQUFNLEdBQUcsY0FBYyxHQUFHLEtBQUssR0FBRyxPQUFPLENBQUM7QUFBQSxJQUNwRCxRQUFRO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUEsTUFDUCxNQUFNO0FBQUE7QUFBQSxJQUNSO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
