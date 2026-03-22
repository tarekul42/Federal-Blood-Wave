/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#D32F2F", // Blood Red
          dark: "#B71C1C",
          light: "#EF5350",
        },
        slate: {
          900: "#0F172A",
          800: "#1E293B",
          700: "#334155",
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
