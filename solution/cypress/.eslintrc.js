module.exports = {
  plugins: ['eslint-plugin-cypress'],
  extends: [
    'plugin:cypress/recommended',
  ],
  env: {
    'cypress/globals': true,
  },
  rules: {
    'testing-library/await-async-query': 'off',
    'testing-library/prefer-screen-queries': 'off',
  },
};
