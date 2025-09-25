/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {
      config: './tailwind.config.mjs', // Add this line
    },
    autoprefixer: {},
  },
};

export default config;