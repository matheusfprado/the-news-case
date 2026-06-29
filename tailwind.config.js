/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        muted: "hsl(var(--muted))",
        border: "hsl(var(--border))",
        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",
      },
      fontFamily: { sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"] },
      fontSize: {
        xs: ["0.8125rem", { lineHeight: "1.125rem" }],
        sm: ["0.9375rem", { lineHeight: "1.375rem" }],
      },
      keyframes: {
        shimmer: { "100%": { transform: "translateX(100%)" } },
        enter: { from: { opacity: "0", transform: "translateY(6px)" }, to: { opacity: "1", transform: "translateY(0)" } },
      },
      animation: { enter: "enter 240ms ease-out both" },
    },
  },
  plugins: [],
};
