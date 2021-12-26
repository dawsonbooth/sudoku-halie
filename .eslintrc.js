module.exports = {
  parser: "@typescript-eslint/parser",
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
  plugins: [
    "react",
    "react-hooks",
    "react-native",
    "@typescript-eslint",
    "prettier",
  ],
  rules: {
    "prettier/prettier": "off",
    "react/prop-types": "off",
    "@typescript-eslint/no-empty-interface": "off",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
