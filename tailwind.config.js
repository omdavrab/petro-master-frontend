/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js"
  ],
  theme: {
    fontFamily: {
      sans: [
        // "Poppins , sans-serif",
        "Outfit, sans-serif",
        // {
        //   fontFeatureSettings: '"cv11", "ss01"',
        //   fontVariationSettings: '"opsz" 32'
        // },
      ],
    },
    color: {
      'orange': '#808080',
      "sienna": '#a7763b',
      'lightsteelblue': '#ccd7d8',
      'darkolivegreen': '#4c482e',
      'dark700':'#3d4465'

    },
    extend: {
      colors: {
        'orange': '#808080',
        "sienna": '#a7763b',
        'lightsteelblue': '#ccd7d8',
        'darkolivegreen': '#4c482e',
        'dark700':'#3d4465',
        'gray500':'#7e7e7e',
        'dark900': 'rgba(9, 4, 21, 0.9)',
        'gray700': 'rgba(9, 4, 21, 0.65)',
        'gray801': 'rgba(9, 4, 21, 0.8)',
        'gray850': 'rgba(9, 4, 21, 0.85)',
        'gray023':'0px 0px 23.432px rgba(0, 0, 0, 0.08)',
        'gray800': 'rgba(9, 4, 21, 0.75)',
        'gray750': 'rgba(9, 4, 21, 0.7)',
        'gray600':'rgba(9, 4, 21, 0.6)',
        'gray500': 'rgba(9, 4, 21, 0.5)',
        'gray80':'gba(9, 4, 21, 0.08)',
        'gray50': 'rgba(9, 4, 21, 0.05)',
        'gray40': 'rgba(9, 4, 21, 0.04)',
        'gray30': 'rgba(9, 4, 21, 0.03)',
        'gray250': 'rgba(9, 4, 21, 0.25)',
        'gray120': 'rgba(196, 196, 196, 0.3)',
        'gray110': "#84828A",
        'black500':'#020104',
        'violet600': '#284b9b',
        'violet250': '#F5F3FF',
        'violet500': '#764AD7',
        'violet210':'rgba(222, 212, 245, 0.2)',
        'violet150': '#F4EFFF',
        'violet200': 'rgba(91, 38, 207, 0.1)',
        'gray200': '#090415',
        'red500': '#FF0000',
        'main': '#254691',
        'text-blue': '#6a51d3',
        'secondary': '#5c47cf',
        'black500': '#322E3C',
        'black300': '#84818A',
        'blue100': '#F2EDFF',
        'black400': '#5B5863',
        'main-bg': '#FAF9FD',
        'black600': '#090415',
        'black200': '#ADABB1',
        'purple100': '#DED4F5',
        'second-bg': '#faf9fd',
        'pink600': '#D82594',
        'pink500': '#DE49A6',
        'pink100':'#F7D3EA',
        'pink400':'#E56EB8',
        'green600': '#0CAE43',
        'green100': '#CEEFD9',
        'purple600':'#5B26CF',
        'red600':'#FF0000',
        'red100':'#FFCCCC',
        'black100':'#D9D9D980'
      },
      boxShadow:{
        'main':'-1px 1px 23px 3px rgba(0,0,0,0.12);',
        'header':'-3px 2px 32px 3px rgba(0,0,0,0.09);',
        'box':'0 0 35px 0 rgba(154,161,171,0.15)',
        'notification-box':'0px 0px 15px 1px rgba(201,201,201,1)',

      },
      backgroundImage: {
        'upload-img': "url('/assets/images/transparent-grid-pattern-for-background-vector.jpg')",
        'login-bg':"url('/assets/images/bg-1.jpg')",
        'slider1':"url('/assets/images/slider-1.jpg')",
        'slider2':"url('/assets/images/slider-2.jpg')",
        'slider3':"url('/assets/images/slider-3.jpg')",
      }
     
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
