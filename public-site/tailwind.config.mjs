/** @type {import('tailwindcss').Config} */
const config = {
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
        'primary': '#2D3748',      // For main text
        'accent': '#2B6CB0',       // For links and highlights
        'background': '#F7FAFC',   // For page backgrounds
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
};

export default config;