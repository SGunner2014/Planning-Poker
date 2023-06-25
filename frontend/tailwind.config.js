/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        "poker-card": "4px 4px 12px 0px rgba(0, 0, 0, 0.25)",
        "poker-card-2": "8px 8px 12px 0px rgba(0, 0, 0, 0.25)",
      },
      colors: {
        "poker-gray": "#D6D7D8",
        "poker-gray-2": "#E8E8E8",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
