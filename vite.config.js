import { resolve } from "node:path"
import vue from "@vitejs/plugin-vue"
import { defineConfig } from "vitest/config"

export default defineConfig({
	// Relative URLs: the overlay is served from a sub-path on GitHub Pages
	base: "./",

	plugins: [
		vue(),
	],

	build: {
		// OverlayPlugin renders overlays with CEF 95 (Chromium 95). Keep in sync with .browserslistrc
		target: "chrome95",
		// Keep images as files: job icons are only downloaded once displayed
		assetsInlineLimit: 0,
		rolldownOptions: {
			input: {
				index: resolve(import.meta.dirname, "index.html"),
				dpsChart: resolve(import.meta.dirname, "dpsChart.html"),
				timer: resolve(import.meta.dirname, "timer.html"),
			},
		},
	},

	test: {
		include: [ "src/**/*.test.js" ],
	},
})
