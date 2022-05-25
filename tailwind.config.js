module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    fontFamily: {
      suwannaphum: ['Suwannaphum', 'sans-serif']
    },
    extend: {
      colors: {
        neutral: {
          50: '#f6f6f7',
          100: '#efeff0',
          200: '#e1e2e4',
          300: '#cfcfd2',
          400: '#bababf',
          500: '#a7a7ad',
          600: '#919198',
          700: '#7e7e84',
          800: '#67676c',
          900: '#565659'
        },
        primary: {
          50: '#E7F0F4',
          100: '#C2DAE4',
          200: '#9AC1D3',
          300: '#72A8C1',
          400: '#5396B3',
          500: '#3583A6',
          600: '#307B9E',
          700: '#287095',
          800: '#22668B',
          900: '#16537B'
        },
        secondary: {
          50: '#FEF5E8',
          100: '#FCE6C7',
          200: '#FBD6A1',
          300: '#F9C57B',
          400: '#F7B85F',
          500: '#F6AC43',
          600: '#F5A53D',
          700: '#F39B34',
          800: '#F2922C',
          900: '#EF821E'
        },
        warning: {
          50: '#fffbeb',
          100: '#fff4c6',
          200: '#ffe688',
          300: '#ffd44a',
          400: '#ffbf1e',
          500: '#f99e07',
          600: '#dd7602',
          700: '#b75206',
          800: '#943e0c',
          900: '#7a330d'
        },
        error: {
          50: '#fff2f1',
          100: '#ffe1df',
          200: '#ffc9c5',
          300: '#ffa39d',
          400: '#ff6e64',
          500: '#ff5448',
          600: '#ed2315',
          700: '#c8190d',
          800: '#a5190f',
          900: '#881c14'
        },
        black: '#000000',
        white: '#FFFFFF'
      }
    }
  },
  plugins: []
}
