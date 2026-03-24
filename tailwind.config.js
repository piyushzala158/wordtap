/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#f5efe5',
        ink: '#1f1a17',
        ember: '#b45309',
        pine: '#1f4d3a',
      },
      boxShadow: {
        paper: '0 18px 50px rgba(31, 26, 23, 0.14)',
      },
      fontFamily: {
        display: ['Georgia', 'serif'],
        body: ['"Avenir Next"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
