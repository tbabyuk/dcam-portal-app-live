/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // theme: {
  //   extend: {
  //     backgroundImage: {
  //       'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  //       'gradient-conic':
  //         'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
  //     },
  //   },
  // },
  daisyui: {
    themes: [
    {
      autumn: {
      ...require("daisyui/src/theming/themes")["autumn"],
      primary: "#375681",
      secondary: "#567fA3",
      accent: "#F98764",
    },
  },
  ]
  },
  plugins: [
    require('daisyui'),
  ],
}
