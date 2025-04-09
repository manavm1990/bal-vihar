import eslint from '@eslint/js'
import nextPlugin from '@next/eslint-plugin-next'
import importPlugin from 'eslint-plugin-import'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import perfectionist from 'eslint-plugin-perfectionist'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import eslintPluginUseEncapsulation from 'eslint-plugin-use-encapsulation'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  {
    ignores: [
      '**/.temp',
      '**/.*',
      '**/.git',
      '**/dist/',
      '**/build/',
      '**/node_modules/',
      '**/temp/',
    ],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node, React: true },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      '@next/next': nextPlugin,
      import: importPlugin,
      'jsx-a11y': jsxA11y,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'use-encapsulation': eslintPluginUseEncapsulation,
      perfectionist,
    },
    rules: {
      'perfectionist/sort-imports': 'error',

      // Import rules
      'import/first': 'error',
      'import/no-duplicates': 'error',
      'import/no-cycle': 'error',

      // Accessibility rules
      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/anchor-has-content': 'error',
      'jsx-a11y/anchor-is-valid': 'error',
      'jsx-a11y/aria-props': 'error',
      'jsx-a11y/aria-role': 'error',

      // Type safety
      '@typescript-eslint/ban-ts-comment': 'error',
      '@typescript-eslint/no-empty-object-type': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: false,
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^(_|ignore)',
        },
      ],
      '@typescript-eslint/no-unsafe-assignment': 'error',
      '@typescript-eslint/no-unsafe-member-access': 'error',
      '@typescript-eslint/no-unsafe-call': 'error',
      '@typescript-eslint/no-unsafe-return': 'error',
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        {
          allowNumber: true,
        },
      ],

      // Error prevention
      'no-extra-boolean-cast': 'error',
      'no-useless-catch': 'error',
      'no-useless-constructor': 'error',
      'no-useless-rename': 'error',
      'no-with': 'error',
      'no-const-assign': 'error',
      'no-constant-condition': 'error',
      'no-empty-pattern': 'error',
      'no-inner-declarations': 'error',
      'no-self-assign': 'error',
      'no-unreachable': 'error',
      'use-isnan': 'error',
      'no-delete-var': 'error',
      'no-class-assign': 'error',
      'no-compare-neg-zero': 'error',
      'no-debugger': 'error',
      'no-dupe-args': 'error',
      'no-dupe-class-members': 'error',
      'no-dupe-keys': 'error',
      'no-duplicate-case': 'error',
      'no-empty': 'error',
      'no-ex-assign': 'error',
      'no-fallthrough': 'error',
      'no-func-assign': 'error',
      'no-global-assign': 'error',
      'no-import-assign': 'error',
      'no-obj-calls': 'error',
      'no-redeclare': 'error',
      'no-shadow-restricted-names': 'error',
      'no-sparse-arrays': 'error',
      'no-this-before-super': 'error',
      'no-undef': 'error',
      'no-unsafe-finally': 'error',
      'no-unsafe-negation': 'error',
      'no-unused-labels': 'error',
      'no-useless-escape': 'error',
      'no-useless-return': 'error',
      'no-void': ['error', { allowAsStatement: true }],
      'valid-typeof': 'error',

      // Modern JavaScript
      'prefer-arrow-callback': 'error',
      'prefer-const': 'error',
      'no-var': 'error',
      'prefer-rest-params': 'error',
      'prefer-spread': 'error',
      'prefer-exponentiation-operator': 'error',
      'prefer-numeric-literals': 'error',
      'prefer-object-spread': 'error',
      'object-shorthand': 'error',
      'prefer-destructuring': ['error', { object: true, array: false }],

      // Security & best practices
      'no-console': ['error', { allow: ['warn', 'error', 'info', 'table'] }],
      'no-alert': 'error',
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-new-func': 'error',
      'no-new-wrappers': 'error',
      'no-proto': 'error',
      'no-return-await': 'error',
      'no-self-compare': 'error',
      'no-throw-literal': 'error',
      'no-unused-expressions': 'error',
      'no-useless-call': 'error',
      'no-useless-concat': 'error',
      'require-await': 'error',
      yoda: 'error',
      'no-array-constructor': 'error',
      'no-new-object': 'error',

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
