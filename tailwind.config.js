/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                // Using CSS variables for Theming support
                // Syntax: rgb(var(--variable-name) / <alpha-value>)
                "primary": "rgb(var(--color-primary) / <alpha-value>)",
                "primary-dim": "rgb(var(--color-primary) / 0.1)",
                "secondary": "rgb(var(--color-secondary) / <alpha-value>)",
                "accent-green": "rgb(var(--color-accent-green) / <alpha-value>)",
                "background-dark": "rgb(var(--color-background-dark) / <alpha-value>)",
                "surface-dark": "rgb(var(--color-surface-dark) / <alpha-value>)",
                "surface-glass": "rgba(10, 20, 31, 0.6)", // Keeping glass fixed or make variable if needed
            },
            fontFamily: {
                "display": ["Rajdhani", "sans-serif"],
                "body": ["Inter", "sans-serif"],
                "mono": ["Share Tech Mono", "monospace"],
            },
            boxShadow: {
                "neon": "0 0 10px rgb(var(--color-primary) / 0.5), 0 0 20px rgb(var(--color-primary) / 0.3)",
                "neon-green": "0 0 15px rgb(var(--color-accent-green) / 0.5), 0 0 30px rgb(var(--color-accent-green) / 0.3)",
                "glass": "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
            },
            backgroundImage: {
                "grid-pattern": "linear-gradient(to right, #1f2937 1px, transparent 1px), linear-gradient(to bottom, #1f2937 1px, transparent 1px)",
            },
            keyframes: {
                shine: {
                    "0%": { transform: "translateX(-200%) skewX(-12deg)" },
                    "100%": { transform: "translateX(200%) skewX(-12deg)" },
                },
            },
            animation: {
                shine: "shine 1s ease-in-out infinite",
            },
        },
    },
    plugins: [],
}
