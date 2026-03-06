import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['node_modules', 'dist', 'test'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  {
    languageOptions: {
      parserOptions: {
        allowDefaultProject: ['*.ts'],
        defaultProject: 'tsconfig.eslint.json',
      },
    },
    rules: {
      // Your custom rules
    },
  },
);
