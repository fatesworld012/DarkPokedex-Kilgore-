import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    rules: {
      // Bare `name` silently resolves to the browser global `window.name`,
      // which can mask an undefined variable and cause runtime bugs.
      'no-restricted-globals': [
        'error',
        {
          name: 'name',
          message:
            'Use a more specific variable name; bare `name` resolves to window.name.',
        },
      ],
    },
  },
])
