// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
// figure out why .storybook/main.js falls
import storybook from "eslint-plugin-storybook";

import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint, { parser } from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist", "node_modules", ".storybook"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.strict,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
      parserOptions: {
        project: "./tsconfig.app.json",
      },
    },
  },
  {
    files: ["**/*.test.{ts,tsx}"],
  },
  {
    files: ["vitest.shims.d.ts", "vite.config.ts", "vitest.*.ts"],
    languageOptions: {
      globals: { ...globals.node, ...globals.vitest },
      parserOptions: {
        project: "./tsconfig.node.json",
      },
    },
  },
  ...storybook.configs["flat/recommended"],
]);
