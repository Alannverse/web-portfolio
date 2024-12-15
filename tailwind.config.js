/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,css}", // Semua file dalam folder src
    "./*.html", // File HTML di root
    "./*.js", // File JavaScript di root
  ],
  theme: {
    extend: {}, // Tambahkan kustomisasi tema jika perlu
  },
  plugins: [],
};
