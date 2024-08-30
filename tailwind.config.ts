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
        '100': '#dcfce8',
        '200': '#bbf7d2',
        '300': '#86efae',
        '400': '#4ade82',
        '500': '#22c560',
        '600': '#16a34c',
        '700': '#15803e',
        '800': '#166534',
        '900': '#14532c',
        '950': '#052e15',
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
