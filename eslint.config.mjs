import pluginCypress from 'eslint-plugin-cypress/flat'

export default [
  {
    plugins: {
      cypress: pluginCypress
    },
    rules: {
      'semi': ['error', 'never'],
      'indent': ['error', 2],
      'quotes': ['error', 'single'],
      'cypress/unsafe-to-chain-command': 'error'
    }
  }
]