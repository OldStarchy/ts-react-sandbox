const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
	mode: 'development',
	entry: {
		index: './src/pages/index.tsx',
		other: './src/pages/other.tsx',
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
			},
			{
				test: /\.scss$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			filename: 'index.html',
			chunks: ['vendor', 'index'],
		}),
		new HtmlWebpackPlugin({
			template: './src/index.html',
			filename: 'other.html',
			chunks: ['vendor', 'other'],
		}),
		new MiniCssExtractPlugin(),
	],
	resolve: {
		extensions: ['.js', '.ts', '.tsx', '.scss'],
	},
	optimization: {
		splitChunks: {
			chunks: 'all',
			cacheGroups: {
				vendor: {
					// test: module => !module.isEntryModule(),
					test: module => module.getChunks().length > 1,
					priority: -10,
					name: 'vendor',
				},
			},
		},
	},
	devtool: 'source-map',
};
