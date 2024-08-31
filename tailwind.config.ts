import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      padding: {
        sm: "2rem",
        lg: "3rem",
        xl: "7rem",
        "2xl": "8rem",
      },
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: {
        '50': '#f0fdf5',
        '100': '#e5f4fd',
        '200': '#b0ddf9',
        '300': '#7bc6f5',
        '400': '#47b0f1',
        '500': '#1299ed',
        '600': '#0e77b8',
        '700': '#0e77b8',
        '800': '#0a5584',
        '900': '#06334f',
        '950': '#02111a',
        },
        secondary: {
          '50': '#fef9e8',
          '100': '#fef0c3',
          '200': '#fee28a',
          '300': '#fdd147',
          '400': '#fac215',
          '500': '#eab308',
          '600': '#ca9a04',
          '700': '#a17c07',
          '800': '#85680e',
          '900': '#715a12',
          '950': '#423306',
        },
        'custom-dark': '#1a1a1a',
        
        'custom-darker': '#242629',
      },
    },
  },
  plugins: [],
};
export default config;
