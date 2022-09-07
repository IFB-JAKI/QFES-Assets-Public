/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: ["./src/**/*.{html,js,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        'bebas': ['Bebas Neue', 'cursive'],
      },
      screens: {
        "lg": "992px"
      },
      colors: {
        primary: {
          100: "#0A0A0A",
          200: "#222222",
          300: "#6D6D6D",
          400: "#F8F8F8",
          500: "#FFFFFF",
        },
        orange:"#FE5E37",
        blue: "#142F54"
      },
    },
    fontFamily: {
      sans: ["Inter var", "sans-serif"],
      serif: ["Inter var", "serif"],
    },
  },
  plugins: [],
}