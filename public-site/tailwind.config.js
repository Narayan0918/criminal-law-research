/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Lora', 'serif'],
      },
      colors: {
        'primary': '#2D3748',
        'accent': '#2B6CB0',
        'navBackground':'#fff2e9',
        'logocolor1':'#f16a09',
        'logocolor2':'#ff5683',
        'footBackground':'#fff2e9',
        'background': '#FAF8F1',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}