/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#FFFDF9",
          cream: "#FAF6F0",
          warm: "#F7F0E8"
        },
        wine: {
          DEFAULT: "#651F2F",
          dark: "#46131E",
          light: "#822B3F"
        },
        rose: {
          DEFAULT: "#B97878",
          blush: "#EFDAD6",
          soft: "#F8ECE9"
        },
        gold: {
          DEFAULT: "#B99256",
          champagne: "#D8C3A3",
          light: "#F3E7D3"
        },
        charcoal: {
          DEFAULT: "#241B18",
          muted: "#766A64"
        }
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Playfair Display', 'serif'],
        sans: ['Inter', 'Manrope', 'sans-serif'],
        script: ['Montez', 'cursive']
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #B99256 0%, #D8C3A3 50%, #B99256 100%)',
        'wine-gradient': 'linear-gradient(135deg, #651F2F 0%, #46131E 100%)',
        'cream-gradient': 'linear-gradient(180deg, #FFFDF9 0%, #FAF6F0 100%)'
      },
      boxShadow: {
        'luxury': '0 10px 40px -10px rgba(101, 31, 47, 0.08)',
        'gold-glow': '0 0 25px rgba(185, 146, 86, 0.25)'
      }
    },
  },
  plugins: [],
}
