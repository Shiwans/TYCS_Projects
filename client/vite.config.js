import { defineConfig } from "vite";
import react from "@vitejs/plugin-react"; // ✅ Add this
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    react(), // ✅ Add React support
    visualizer({ open: true }), // Opens a report after build
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "axios"], // Split vendors
        },
      },
    },
  },
});
