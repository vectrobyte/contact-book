/** @type {import("prettier").Config} */
const config = {
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
  "printWidth": 100,
  "singleQuote": true,
  "trailingComma": "es5",
  "tabWidth": 2,
  "endOfLine": "auto"
};

module.exports = config;
