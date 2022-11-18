module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    node: true,
    es6: true,
    'react-native/react-native': true,
  },
  plugins: ['react', 'react-hooks', 'react-native', '@typescript-eslint'],
  rules: {
    'react/prop-types': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
