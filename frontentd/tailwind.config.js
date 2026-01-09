/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        angular: {
          red: '#DD0031',
          crimson: '#C3002F',
          magenta: '#BD0043',
          purple: '#A100FF',
          pink: '#E91E63',
        },
      },
      backgroundImage: {
        'gradient-angular':
          'linear-gradient(135deg, #DD0031 0%, #BD0043 50%, #E91E63 100%)',
        'gradient-vibrant': 'linear-gradient(135deg, #DD0031 0%, #A100FF 100%)',
        'gradient-accent':
          'linear-gradient(135deg, #C3002F 0%, #BD0043 50%, #A100FF 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'gradient-shift': 'gradientShift 3s ease infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
};
