module.exports = {
    root: true,
    env: {
        node: true,
        browser: true,
        es6: true
    },
    parser: "@typescript-eslint/parser",
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended"
    ],
    plugins: ["@typescript-eslint", "prettier"],
    rules: {
        "prettier/prettier": "error",
        "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
        "@typescript-eslint/explicit-module-boundary-types": "off"
    },
    ignorePatterns: ["node_modules", "dist", "src/generated"]
};
