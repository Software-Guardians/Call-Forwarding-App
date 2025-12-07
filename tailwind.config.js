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
                "primary": "#00F0FF", // Neon Cyan
                "primary-dim": "rgba(0, 240, 255, 0.1)",
                "secondary": "#BC13FE", // Electric Violet
                "accent-green": "#00FFA3", // For Call Button
                "background-dark": "#050B14", // Deep Void Blue
                "surface-dark": "#0A141F",
                "surface-glass": "rgba(10, 20, 31, 0.6)",
            },
            fontFamily: {
                "display": ["Rajdhani", "sans-serif"],
                "body": ["Inter", "sans-serif"],
                "mono": ["Share Tech Mono", "monospace"],
            },
            boxShadow: {
                "neon": "0 0 10px rgba(0, 240, 255, 0.5), 0 0 20px rgba(0, 240, 255, 0.3)",
                "neon-green": "0 0 15px rgba(0, 255, 163, 0.5), 0 0 30px rgba(0, 255, 163, 0.3)",
                "glass": "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
            },
            backgroundImage: {
                "grid-pattern": "linear-gradient(to right, #1f2937 1px, transparent 1px), linear-gradient(to bottom, #1f2937 1px, transparent 1px)",
            }
        },
    },
    plugins: [],
}
