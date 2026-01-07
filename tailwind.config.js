module.exports = {
  content: [
    "./pages/*.{html,js}",
    "./index.html",
    "./js/*.js",
    "./components/*.html"
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors - ACM Blue
        primary: {
          DEFAULT: "#0076A8", // ACM blue - authority, trust building
          50: "#EBF8FF", // blue-50
          100: "#BEE3F8", // blue-100
          500: "#0076A8", // custom ACM blue
          600: "#005A7F", // darker ACM blue
          700: "#004766", // darkest ACM blue
        },
        // Secondary Colors - Innovation Violet
        secondary: {
          DEFAULT: "#6A11CB", // violet-700 - innovation energy
          50: "#F3E8FF", // violet-50
          100: "#E9D5FF", // violet-100
          500: "#8B5CF6", // violet-500
          600: "#7C3AED", // violet-600
          700: "#6A11CB", // custom violet
        },
        // Accent Colors - Action Blue
        accent: {
          DEFAULT: "#2575FC", // blue-500 - action focus, CTA prominence
          50: "#EFF6FF", // blue-50
          100: "#DBEAFE", // blue-100
          500: "#2575FC", // custom accent blue
          600: "#1D4ED8", // blue-700
        },
        // Background Colors
        background: "#FFFFFF", // white - content clarity
        surface: {
          DEFAULT: "#F8FAFC", // slate-50 - subtle section separation
          100: "#F1F5F9", // slate-100
          200: "#E2E8F0", // slate-200
        },
        // Text Colors
        text: {
          primary: "#1E293B", // slate-800 - extended reading comfort
          secondary: "#64748B", // slate-500 - clear hierarchy
          muted: "#94A3B8", // slate-400
        },
        // Status Colors
        success: {
          DEFAULT: "#10B981", // emerald-500 - achievement celebration
          50: "#ECFDF5", // emerald-50
          100: "#D1FAE5", // emerald-100
        },
        warning: {
          DEFAULT: "#F59E0B", // amber-500 - important notices
          50: "#FFFBEB", // amber-50
          100: "#FEF3C7", // amber-100
        },
        error: {
          DEFAULT: "#EF4444", // red-500 - helpful problem identification
          50: "#FEF2F2", // red-50
          100: "#FEE2E2", // red-100
        },
        // Border Colors
        border: {
          DEFAULT: "#E2E8F0", // slate-200 - minimal borders
          light: "#F1F5F9", // slate-100
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Primary font for headlines and body
        mono: ['JetBrains Mono', 'monospace'], // Technical credibility for code
        inter: ['Inter', 'sans-serif'], // Explicit Inter reference
        jetbrains: ['JetBrains Mono', 'monospace'], // Explicit JetBrains reference
      },
      fontSize: {
        'hero': ['3.5rem', { lineHeight: '1.1', fontWeight: '700' }], // 56px
        'display': ['3rem', { lineHeight: '1.2', fontWeight: '600' }], // 48px
        'heading': ['2rem', { lineHeight: '1.3', fontWeight: '600' }], // 32px
        'subheading': ['1.5rem', { lineHeight: '1.4', fontWeight: '500' }], // 24px
        'body': ['1rem', { lineHeight: '1.6', fontWeight: '400' }], // 16px
        'small': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }], // 14px
      },
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      borderRadius: {
        'card': '0.75rem', // 12px
        'button': '0.5rem', // 8px
      },
      spacing: {
        '18': '4.5rem', // 72px
        '88': '22rem', // 352px
        '128': '32rem', // 512px
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      transitionDuration: {
        '300': '300ms',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #0076A8 0%, #2575FC 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #6A11CB 0%, #2575FC 100%)',
        'gradient-hero': 'linear-gradient(135deg, #0076A8 0%, #6A11CB 50%, #2575FC 100%)',
      },
    },
  },
  plugins: [],
}