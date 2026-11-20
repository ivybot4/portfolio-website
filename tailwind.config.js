/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        body: ["Inter", "system-ui", "sans-serif"],
        spartan: ["'League Spartan'", "Inter", "system-ui", "sans-serif"],
        condensed: ["'Open Sans Condensed'", "'Arial Narrow'", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};