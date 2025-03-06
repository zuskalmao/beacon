/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3B82F6', // Blue
          dark: '#1D4ED8',
          light: '#60A5FA',
        },
        secondary: {
          DEFAULT: '#10B981', // Green
          dark: '#059669',
          light: '#34D399',
        },
        beacon: {
          light: '#FBBF24', // Yellow
          DEFAULT: '#F59E0B', // Amber
          dark: '#D97706', // Orange
        },
        dark: {
          DEFAULT: '#111827',
          light: '#1F2937',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        orbitron: ['Orbitron', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'beacon-glow': 'beacon-glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'ping-slow': 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      keyframes: {
        'beacon-glow': {
          '0%': { boxShadow: '0 0 5px 0px rgba(245, 158, 11, 0.5)' },
          '100%': { boxShadow: '0 0 20px 10px rgba(245, 158, 11, 0.8)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
