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
        "poker-input":
          "inset 6px 6px 13px #c5c6c7, inset -6px -6px 13px #e7e8e9",
      },
      colors: {
        "poker-gray": "#D6D7D8",
        "poker-gray-2": "#E8E8E8",
        "poker-foreground-light": "#3C3F40",
      },
      transitionTimingFunction: {
        "sunken-input-arrow": "cubic-bezier(.47,1.64,.41,.8)",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
