import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: mode === "production" ? "/wishlist-bingo-app/" : "/",
  build: {
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, 'index.html'),
        'pages/wishlist-bingo': path.resolve(__dirname, 'pages/wishlist-bingo.html'),
      }
    }
  }
}));
