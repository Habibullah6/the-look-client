/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  daisyui: {
    themes: [
      {
        thelooktheme: {
        primary: '#2563eb',
        secondary: '#6366f1',
        accent: '#4338ca',
        neutral: "#3D4451",
        "base-100": '#FFFFFF'
        },
      },
    ],
  },


  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}
