// vite.config.js
import { defineConfig } from "file:///C:/Users/jonat/OneDrive/Documentos/Trabajo/VentaMas/client/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/jonat/OneDrive/Documentos/Trabajo/VentaMas/client/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0"
  },
  build: {
    sourcemap: true,
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id.toString().split("node_modules/")[1].split("/")[0].toString();
          }
        }
      }
    }
  },
  define: {
    "global": "window"
  }
});
export {
  vite_config_default as default
};
