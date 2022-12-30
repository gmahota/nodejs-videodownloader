/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx',
    "./node_modules/flowbite-react/**/*.js",
    "./public/**/*.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: 'Roboto, sans-serif'
      },

      backgroundImage: {
        app: 'url(/app-bg.png)'
      },

      colors: {
        primary: "#1AB7EA",
        blue:{
          300:"#1AB7EA"
        },
        red:{
          200:"#FF0000"
        },

        ignite: {
          500: '#129E57'
        },
        yellow: {
          500: '#F7DD43',
          700: "#E5CD3D"
        },
        gray: {
          100: "#E1E1E6",
          300: "#8D8D99",
          600: "#323238",
          800: "#202024",
          900: "#121214"
        }
      }
    },
  },
  plugins: [
    require("flowbite/plugin")
  ],
}
