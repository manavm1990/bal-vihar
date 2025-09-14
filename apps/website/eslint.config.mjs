import baseConfig from '@bv/eslint-config'
import nextPlugin from '@next/eslint-plugin-next'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import eslintPluginUseEncapsulation from 'eslint-plugin-use-encapsulation'
import { defineConfig } from 'eslint/config'

export default defineConfig(
  ...baseConfig,
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      '*.config.*',
      'next-env.d.ts',
    ],
    languageOptions: {
      globals: { React: true },
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      '@next/next': nextPlugin,
      'jsx-a11y': jsxA11y,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'use-encapsulation': eslintPluginUseEncapsulation,
    },
    rules: {
      // Accessibility rules
      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/anchor-has-content': 'error',
      'jsx-a11y/anchor-is-valid': 'error',
      'jsx-a11y/aria-props': 'error',
      'jsx-a11y/aria-role': 'error',

      // React & Next.js
      '@next/next/no-html-link-for-pages': 'error',
      '@next/next/no-img-element': 'error',
      '@next/next/google-font-display': 'error',
      '@next/next/google-font-preconnect': 'error',
      '@next/next/no-unwanted-polyfillio': 'error',
      '@next/next/no-typos': 'error',
      '@next/next/no-sync-scripts': 'error',
      '@next/next/no-assign-module-variable': 'error',
      '@next/next/no-async-client-component': 'error',
      '@next/next/no-document-import-in-page': 'error',
      '@next/next/no-head-import-in-document': 'error',
      '@next/next/no-head-element': 'error',
      'react/jsx-no-useless-fragment': 'error',
      'react/no-children-prop': [
        2,
        {
          allowFunctions: true,
        },
      ],
      'use-encapsulation/prefer-custom-hooks': ['error', { allow: ['useMemo'] }],
    },
  },
)
