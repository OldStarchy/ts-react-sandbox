const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
	mode: 'development',
	entry: {
		index: './src/index.tsx',
		other: './src/other.tsx',
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
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
	],
	resolve: {
		extensions: ['.js', '.ts', '.tsx'],
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
};
