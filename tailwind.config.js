const config = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: "#14181a", soft: "#2a3033" },
        paper: "#faf8f4",
        sand: { DEFAULT: "#f1ece2", deep: "#e6dfd0" },
        line: "#e6e0d4",
        muted: "#69706d",
        emerald: { DEFAULT: "#0e7c61", dark: "#0a5f4a", light: "#e3f2ed" },
        gold: { DEFAULT: "#b8935a", dark: "#8f6f3f", light: "#f4ecdc" },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "ui-serif", "Georgia", "serif"],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(20,24,26,.04), 0 8px 24px -8px rgba(20,24,26,.12)",
        lift: "0 2px 4px rgba(20,24,26,.05), 0 18px 40px -12px rgba(20,24,26,.22)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: { "100%": { transform: "translateX(100%)" } },
      },
      animation: {
        "fade-up": "fade-up .35s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
