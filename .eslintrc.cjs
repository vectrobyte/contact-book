// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

/** @type {import("eslint").Linter.Config} */
const config = {
  overrides: [
    {
      extends: [
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
      ],
      files: ["*.ts", "*.tsx"],
      parserOptions: {
        project: path.join(__dirname, "tsconfig.json"),
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: path.join(__dirname, "tsconfig.json"),
  },
  plugins: [
    "react",
    "@typescript-eslint",
    "simple-import-sort",
  ],
  extends: [
    "eslint:recommended",
    "next/core-web-vitals",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
    "prettier"
  ],
  env: {
    "browser": true,
    "jest": true,
    "node": true,
    "es6": true,
  },
  rules: {
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        prefer: "type-imports",
        fixStyle: "inline-type-imports",
      },
    ],
    "@typescript-eslint/require-await": "off",
    "@typescript-eslint/no-misused-promises": "off",
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/explicit-member-accessibility": 0,
    "@typescript-eslint/explicit-module-boundary-types": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "import/order": "off",
    "no-console": "warn",
    "no-unused-vars": "warn",
    "prettier/prettier": [
      "error", {
        "printWidth": 100,
        "singleQuote": true,
        "trailingComma": "es5",
        "tabWidth": 2,
        "endOfLine": "auto"
      }
    ],
    "react/jsx-curly-brace-presence": ["error", { "props": "never", "children": "never" }],
    "react/react-in-jsx-scope": "off",
    "react/jsx-uses-react": "off",
    "react/prop-types": 0,
    "semi": "warn",
    "simple-import-sort/imports": "error",
    "sort-imports": "off",
    "no-restricted-imports": [
      "error",
      {
        "patterns": []
      }
    ]
  },
};

module.exports = config;
