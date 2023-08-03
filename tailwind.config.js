/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: { raw: "(max-width: 500px)" },
        sm: "768px",
        md: "1060px",
      },
    },
    colors: {
      "start-node": "var(--start)",
      "end-node": "var(--end)",
      shortest: "var(--shortest)",
      visited: "var(--visited)",
    },
  },
  daisyui: {
    themes: ["lofi"],
  },
  plugins: [require("daisyui")],
};
