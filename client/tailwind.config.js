/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        mainColor: "#22d3ee",
        grayBg: "#EEF5FA",
      },
    },
  },
  plugins: [],
};
