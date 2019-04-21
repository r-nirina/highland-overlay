"use strict"

const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { VueLoaderPlugin } = require("vue-loader")

module.exports = {
	target: "web",

	entry: {
		index: "./src/index.js",
	},

	output: {
		filename: "[name].js",
		path: path.resolve(__dirname, "dist"),
	},

	mode: "development",

	module: {
		rules: [
			{ // Vue
				test: /\.vue$/,
				use: "vue-loader",
			},
			{ // Babel
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel-loader",
			},
			{ // Styles
				test: /\.(css|scss)$/,
				use: [
					"style-loader",
					"css-loader",
					"sass-loader",
				],
			},
			{ // Fonts
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "[name].[ext]",
							outputPath: "fonts",
						},
					},
				],
			},
			{ // Images
				test: /\.(jpg|jpeg|png|svg)$/,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "[name].[ext]",
							outputPath: "images",
						},
					},
				],
			},
		],
	},

	plugins: [
		new VueLoaderPlugin(),
		new HtmlWebpackPlugin({
			template: "src/index.html",
			favicon: "./favicon.ico",
		}),
	],
}
