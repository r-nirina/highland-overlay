import js from "@eslint/js"
import stylistic from "@stylistic/eslint-plugin"
import compat from "eslint-plugin-compat"
import pluginVue from "eslint-plugin-vue"
import globals from "globals"

export default [
	{
		ignores: [ "dist/" ],
	},

	js.configs.recommended,
	...pluginVue.configs["flat/recommended"],
	// Flags browser APIs missing from the targets of .browserslistrc (OverlayPlugin's Chromium)
	compat.configs["flat/recommended"],
	stylistic.configs.customize({
		indent: "tab",
		quotes: "double",
		semi: false,
		commaDangle: "always-multiline",
		braceStyle: "1tbs",
		jsx: false,
	}),

	{
		languageOptions: {
			globals: globals.browser,
		},
		rules: {
			"no-console": "error",
			"no-unreachable": "off",
			"no-unused-vars": [ "error", { args: "none" } ],
			"@stylistic/indent": [ "error", "tab", { SwitchCase: 1 } ],
			"@stylistic/array-bracket-spacing": [ "error", "always" ],
			"@stylistic/space-before-function-paren": [ "error", "never" ],
			"vue/html-indent": [ "error", "tab" ],
			"vue/multi-word-component-names": [ "error", { ignores: [ "App" ] } ],
			// Keep the existing template style
			"vue/max-attributes-per-line": [ "error", { singleline: { max: 3 } } ],
			"vue/singleline-html-element-content-newline": "off",
			"vue/html-self-closing": [ "error", { html: { void: "any", normal: "any", component: "always" } } ],
		},
	},

	{
		files: [ "*.config.js" ],
		languageOptions: {
			globals: globals.node,
		},
	},
]
