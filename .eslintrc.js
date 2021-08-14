module.exports = {
  parser: "@typescript-eslint/parser", // Specifies the ESLint parser
  env: {
    node: true,
    es6: true,
    "react-native/react-native": true,
  },
  extends: [
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:react-hooks/recommended",
  ],
  plugins: ["react", "react-native", "prettier"],
  rules: {
    "react/prop-types": "off",
  },
  parserOptions: {
    ecmaFeatures: {
      tsx: true,
    },
    ecmaVersion: 2020,
    sourceType: "module",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
