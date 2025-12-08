// tailwind.config.js
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Fresh color scheme - choose one
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9', // Main brand color
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        // OR for something different:
        brand: {
          light: '#8b5cf6', // Purple
          DEFAULT: '#7c3aed',
          dark: '#6d28d9',
        },
        // OR earth tones:
        earth: {
          light: '#d97706', // Amber
          DEFAULT: '#b45309',
          dark: '#92400e',
        }
      },
      fontFamily: {
        // Add custom font if you want
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Poppins', 'sans-serif'],
      }
    },
  },
  plugins: [],
}