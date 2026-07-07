/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Deep obsidian neutrals — warm undertone
        ink: {
          950: '#07060A',
          900: '#0C0B10',
          800: '#14121A',
          700: '#1E1B27',
          600: '#282434',
          500: '#342F42',
        },
        // Primary — coral-magenta signature
        flame: {
          300: '#FF9CAF',
          400: '#FF7A93',
          500: '#E8527A',
          600: '#D03A62',
          700: '#B0244E',
        },
        // Secondary — warm amber-gold
        gold: {
          300: '#FFD97A',
          400: '#FFC842',
          500: '#F0A030',
          600: '#D48A20',
          700: '#B87318',
        },
        // Accent — soft lavender
        lav: {
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#7C3AED',
        },
        // Keep iris as alias for backward compat in toast etc.
        iris: {
          300: '#FF9CAF',
          400: '#FF7A93',
          500: '#E8527A',
          600: '#D03A62',
        },
        // Aurora spectrum for gradient effects
        aurora: {
          rose: '#E8527A',
          gold: '#F0A030',
          lavender: '#A78BFA',
          cyan: '#06B6D4',
        },
        spectrum: {
          cyan: '#F0A030',
          violet: '#E8527A',
        },
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        sans: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'spectrum-gradient':
          'linear-gradient(135deg, #E8527A 0%, #D03A62 30%, #F0A030 70%, #A78BFA 100%)',
        'aurora-gradient':
          'linear-gradient(135deg, #E8527A 0%, #F0A030 33%, #A78BFA 66%, #06B6D4 100%)',
        'glass-gradient':
          'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
        'aurora-mesh':
          'radial-gradient(ellipse at 20% 50%, rgba(232,82,122,0.12) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(240,160,48,0.08) 0%, transparent 50%), radial-gradient(ellipse at 50% 80%, rgba(167,139,250,0.08) 0%, transparent 50%)',
      },
      boxShadow: {
        glow: '0 0 40px -8px rgba(232, 82, 122, 0.45)',
        'glow-lg': '0 0 60px -12px rgba(232, 82, 122, 0.5)',
        'glow-gold': '0 0 40px -8px rgba(240, 160, 48, 0.35)',
        'glow-lav': '0 0 40px -8px rgba(167, 139, 250, 0.35)',
        aurora: '0 0 80px -20px rgba(232, 82, 122, 0.3), 0 0 60px -15px rgba(240, 160, 48, 0.2)',
        glass: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
        'glass-sm': '0 4px 16px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
        'inner-glow': 'inset 0 0 30px rgba(232, 82, 122, 0.08)',
      },
      backdropBlur: {
        xs: '2px',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-down': {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        develop: {
          '0%': { opacity: '0', filter: 'blur(16px)', transform: 'scale(1.02)' },
          '100%': { opacity: '1', filter: 'blur(0)', transform: 'scale(1)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        'aurora-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px -5px rgba(232, 82, 122, 0.4)' },
          '50%': { boxShadow: '0 0 40px -5px rgba(232, 82, 122, 0.6)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-6px) rotate(1deg)' },
          '66%': { transform: 'translateY(3px) rotate(-1deg)' },
        },
        'border-flow': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'text-reveal': {
          '0%': { opacity: '0', transform: 'translateY(30px) rotateX(-10deg)' },
          '100%': { opacity: '1', transform: 'translateY(0) rotateX(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'mesh-move': {
          '0%': { transform: 'translate(0%, 0%) scale(1)' },
          '33%': { transform: 'translate(5%, -3%) scale(1.05)' },
          '66%': { transform: 'translate(-3%, 5%) scale(0.95)' },
          '100%': { transform: 'translate(0%, 0%) scale(1)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.95)', opacity: '1' },
          '75%, 100%': { transform: 'scale(1.3)', opacity: '0' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-1deg)' },
          '50%': { transform: 'rotate(1deg)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out',
        'fade-up': 'fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-up-delay-1': 'fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both',
        'fade-up-delay-2': 'fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both',
        'fade-up-delay-3': 'fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both',
        'fade-up-delay-4': 'fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both',
        'slide-down': 'slide-down 0.3s ease-out',
        develop: 'develop 0.7s ease-out',
        'aurora-shift': 'aurora-shift 8s ease infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        float: 'float 4s ease-in-out infinite',
        'float-slow': 'float-slow 6s ease-in-out infinite',
        'border-flow': 'border-flow 4s ease infinite',
        'text-reveal': 'text-reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        'text-reveal-delay-1': 'text-reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s both',
        'text-reveal-delay-2': 'text-reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both',
        'scale-in': 'scale-in 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        'mesh-move': 'mesh-move 20s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        wiggle: 'wiggle 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
