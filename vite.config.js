import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import flowbiteReact from "flowbite-react/plugin/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss({
      config: {
        content: [
          "./src/**/*.{html,js,jsx,ts,tsx}",
          "./node_modules/react-tailwindcss-datepicker/dist/index.esm.{js,ts}",
        ],
        theme: {
          extend: {},
        },
        plugins: [],
      },
    }),
    flowbiteReact(),
  ],
});
