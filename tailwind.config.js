/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],   
  theme: {
    extend: {
      colors: {
        primary: {
          blue: 'hsl(238, 40%, 52%)',
          red: 'hsl(358, 79%, 66%)',
          lightBlue: 'hsl(239, 57%, 85%)',
          paleRed: 'hsl(357, 100%, 86%)',
        },
        neutral: {
          darkBlue: 'hsl(212, 24%, 26%)',
          grayishBlue: 'hsl(211, 10%, 45%)',
          lightGray: 'hsl(223, 19%, 93%)',
          veryLightGray: 'hsl(228, 33%, 97%)',
          white: 'hsl(0, 0%, 100%)',
        },
      },
    },
  },
  plugins: [],
}

