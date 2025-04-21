/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6366F1',
          hover: '#4F46E5',
          light: '#818CF8',
          dark: '#4338CA',
        },
        secondary: {
          DEFAULT: '#EC4899',
          hover: '#DB2777',
          light: '#F472B6',
          dark: '#BE185D',
        },
        background: {
          light: '#F8FAFC',
          card: '#FFFFFF',
          input: '#F1F5F9',
          accent: '#F0F9FF',
        },
        border: {
          light: '#E2E8F0',
          dark: '#334155',
        },
        dark: {
          primary: '#1E293B',
          secondary: '#0F172A',
          background: '#0F172A',
          card: '#1E293B',
          input: '#334155',
        },
        text: {
          primary: {
            light: '#1E293B',
            dark: '#F8FAFC',
          },
          secondary: {
            light: '#64748B',
            dark: '#94A3B8',
          },
        },
        status: {
          success: '#10B981',
          warning: '#F59E0B',
          error: '#EF4444',
          info: '#3B82F6',
        },
        accent: {
          purple: '#8B5CF6',
          blue: '#3B82F6',
          green: '#10B981',
          yellow: '#F59E0B',
          red: '#EF4444',
          pink: '#EC4899',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Plus Jakarta Sans', 'sans-serif'],
      },
      fontSize: {
        'h1': ['2.5rem', { lineHeight: '3rem', fontWeight: '700', letterSpacing: '-0.02em' }],
        'h2': ['2rem', { lineHeight: '2.5rem', fontWeight: '600', letterSpacing: '-0.01em' }],
        'h3': ['1.5rem', { lineHeight: '2rem', fontWeight: '600', letterSpacing: '-0.01em' }],
        'h4': ['1.25rem', { lineHeight: '1.75rem', fontWeight: '600' }],
        'body-large': ['1.125rem', { lineHeight: '1.75rem', fontWeight: '400' }],
        'body-small': ['0.875rem', { lineHeight: '1.25rem', fontWeight: '400' }],
        'button': ['0.875rem', { lineHeight: '1.25rem', fontWeight: '600', letterSpacing: '0.025em' }],
        'label': ['0.875rem', { lineHeight: '1.25rem', fontWeight: '500' }],
      },
      spacing: {
        'base': '0.5rem',
        'button': {
          x: '1.5rem',
          y: '1rem',
        },
        'card': '1.5rem',
        'section': '2rem',
      },
      borderRadius: {
        DEFAULT: '0.75rem',
        'lg': '1rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
      },
      maxWidth: {
        container: '80rem',
      },
      gridTemplateColumns: {
        'auto-fit': 'repeat(auto-fit, minmax(320px, 1fr))',
      },
      gap: {
        grid: '1.5rem',
      },
      boxShadow: {
        'light': '0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)',
        'medium': '0 10px 15px -3px rgb(0 0 0 / 0.08), 0 4px 6px -4px rgb(0 0 0 / 0.05)',
        'dark': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        'inner': 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
    screens: {
      'mobile': 'max-width: 767px',
      'tablet': '768px',
      'desktop': '1280px',
      'wide': '1536px',
    },
  },
  plugins: [],
}