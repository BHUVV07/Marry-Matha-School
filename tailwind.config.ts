import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        school: {
          50: "#F0F7FF",
          100: "#E0EFFE",
          200: "#BAE0FD",
          300: "#7CC6FB",
          400: "#38A8F7",
          500: "#0284C7",
          600: "#0369A1",
          700: "#075985",
          800: "#0C4A6E",
          900: "#0A3355",
          950: "#08233C",
        },
        navy: {
          800: "#1E293B",
          900: "#0F172A",
          950: "#0B1120",
        },
        accent: {
          gold: "#D97706",
          amber: "#F59E0B",
          light: "#FEF3C7",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        heading: ["var(--font-heading)", "Inter", "sans-serif"],
      },
      boxShadow: {
        soft: "0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)",
        card: "0 4px 20px rgba(7, 43, 77, 0.08)",
        "card-hover": "0 12px 30px rgba(7, 43, 77, 0.12)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
    },
  },
  plugins: [],
};

export default config;
