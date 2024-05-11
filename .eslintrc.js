module.exports = {
  extends: ['next/core-web-vitals', '@it-incubator/eslint-config', 'plugin:storybook/recommended'],
  overrides: [
    {
      files: ['**/*.stories.tsx'],
      rules: {
        'no-console': 'off',
        'react-hooks/rules-of-hooks': 'off',
      },
    },
  ],
}
