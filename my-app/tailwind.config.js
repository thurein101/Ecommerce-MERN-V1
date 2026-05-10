/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"  // make sure this line exists
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')  // ⚡ This requires Flowbite installed
  ],
}
