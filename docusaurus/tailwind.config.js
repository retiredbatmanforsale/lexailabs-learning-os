/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,md,mdx}",
    "../docs/**/*.{md,mdx}",
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        'indian-saffron': '#ff9933',
        'indian-white': '#ffffff',
        'indian-green': '#138808',
        'indian-blue': '#0066ff',
        'accent-orange': '#ffb366',
        'accent-green': '#20a020',
        'accent-blue': '#4da6ff',
      },
      fontFamily: {
        'mono': ['SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', 'monospace'],
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}
