import { fileURLToPath } from "url";
import { dirname } from "path";
import { defineConfig, globalIgnores } from "eslint/config";

import tsParser from "@typescript-eslint/parser";
import globals from "globals";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import prettier from "eslint-plugin-prettier";

import { fixupPluginRules } from "@eslint/compat";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  {
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2018,
      sourceType: "module",

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },

      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },

    plugins: {
      "@typescript-eslint": typescriptEslint,
      react,
      "react-hooks": fixupPluginRules(reactHooks),
      prettier,
    },

    extends: compat.extends(
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:prettier/recommended"
    ),

    settings: {
      react: {
        version: "detect",
      },
    },

    rules: {
      "prettier/prettier": "error",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
    },
  },
  {
    files: ["src/legacy/*.tsx"],
    rules: {
      "react-hooks/rules-of-hooks": "off",
      "react-hooks/exhaustive-deps": "off",
    },
  },
  globalIgnores(["**/dist", "**/legacy", "**/node_modules"]),
]);