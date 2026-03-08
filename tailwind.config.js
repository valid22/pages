/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        valorant: {
          red: '#FF4655',
          dark: '#0F1923',
          darker: '#070D12',
          'dark-2': '#1B242E',
          white: '#ECE8E1',
          gold: '#C89B3C',
          purple: '#7B73FF',
          teal: '#00D4AA',
          blue: '#4FC1E9',
        }
      },
      fontFamily: {
        valorant: ['Rajdhani', 'sans-serif'],
        mono: ['Share Tech Mono', 'monospace'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        'glitch': 'glitch 2s infinite',
        'scan': 'scan 3s linear infinite',
        'pulse-red': 'pulse-red 2s infinite',
        'float': 'float 6s ease-in-out infinite',
        'flicker': 'flicker 0.15s infinite',
        'border-run': 'border-run 2s linear infinite',
      },
      keyframes: {
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        'pulse-red': {
          '0%, 100%': { boxShadow: '0 0 5px #FF4655, 0 0 10px #FF4655' },
          '50%': { boxShadow: '0 0 20px #FF4655, 0 0 40px #FF4655' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        flicker: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.8 },
        },
        'border-run': {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '200% 0%' },
        },
      },
    },
  },
  plugins: [],
}
