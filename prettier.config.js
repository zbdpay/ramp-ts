export default {
  printWidth: 120,
  singleQuote: true,
  semi: true,
  trailingComma: 'es5',
  arrowParens: 'always',
  bracketSpacing: true,
  bracketSameLine: true,
  endOfLine: 'lf',
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  importOrder: [
    '^@/middleware/(.*)$',
    '^@/services/(.*)$',
    '^@/jobs/(.*)$',
    '^@/app/payouts/(.*)$',
    '^@/utils/(.*)$',
    '^@/constants/(.*)$',
    '^@/types/(.*)$',
    '^[./]'
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true
};