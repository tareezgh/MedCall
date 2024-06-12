/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        DM: ['DM Sans', 'sans-serif'],
        Pippins: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary600: "#7A0101",
        primary500: "#A00000",
        secondary600: "#2A3454",
        secondary500: "#3C4B78",
        textColor: "#F2F1EB",
        stroke: "#EEEEEB",
        lightBg: "#E4E4FD",
        modalBackground: "#FAFAFC",
        backText: "#1D1C2B",
      },
      
    },
  },
  plugins: [],
};
