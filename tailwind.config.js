/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Dubai Public Library color scheme
        primary: {
          DEFAULT: '#8AB82E', // Green from DPL
          dark: '#6A8B22',
          light: '#A6D44D',
        },
        secondary: {
          DEFAULT: '#4A5568', // Dark blue/gray from DPL
          dark: '#2D3748',
          light: '#718096',
        },
        accent: {
          DEFAULT: '#F6AD55', // Orange from DPL
          dark: '#ED8936',
          light: '#FBD38D',
        },
        background: {
          DEFAULT: '#F7FAFC',
          dark: '#EDF2F7',
        },
        success: '#48BB78',
        warning: '#ECC94B',
        error: '#F56565',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        heading: ['var(--font-poppins)', 'sans-serif'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'button': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        dplTheme: {
          "primary": "#8AB82E",
          "secondary": "#4A5568",
          "accent": "#F6AD55",
          "neutral": "#2D3748",
          "base-100": "#F7FAFC",
          "info": "#3ABFF8",
          "success": "#48BB78",
          "warning": "#ECC94B",
          "error": "#F56565",
        },
      },
    ],
  },
}
