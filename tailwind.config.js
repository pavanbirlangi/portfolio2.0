export default {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    safelist: [
      'font-fira'
    ],
    theme: {
      extend: {
        fontFamily: {
          fira: ['Fira Code', 'monospace'],
          sans: ['Open Sans', 'sans-serif'],
        },
        animation: {
          marquee: 'marquee var(--duration, 30s) linear infinite'
        },
        keyframes: {
          marquee: {
            to: { transform: 'translateX(-50%)' }
          }
        }
      },
    },
    plugins: []
};
  