/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'; // 1. Import the default theme

const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // 2. Spread the default fonts and colors back in
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        serif: ['Lora', 'serif'],
      },
      colors: {
        ...defaultTheme.colors, // Add the default color palette
        'primary': '#2D3748',
        'accent': '#2B6CB0',
        'background': '#F7FAFC',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
};

export default config;