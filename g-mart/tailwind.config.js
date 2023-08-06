/** @type {import('tailwindcss').Config} */
export const content = [
  "./index.html",
  "./app/**/*.{js,ts,jsx,tsx,mdx}",
  "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./components/**/*.{js,ts,jsx,tsx,mdx}",

  // Or if using `src` directory:
  "./src/**/*.{js,ts,jsx,tsx,mdx}",
];
export const theme = {
  extend: {
    fontFamily: {
      sans: ["DM Sans", "sans-serif"],
    },
    colors: {
      green: {
        DEFAULT: "#71B214",
      },
      gray: {
        600: "#606060",
      },
    },
    spacing: {
      13: "3.25rem",
    },
    boxShadow: {
      primary: "0px 9.9px 21.6px rgba(136, 202, 41, 0.41)",
    },
  },
};

export const plugins = [];
