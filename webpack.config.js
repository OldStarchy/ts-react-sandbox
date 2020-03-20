const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const fs = require('fs');
const path = require('path');

const entryDir = path.resolve('./src/entries');

function findEntryGroups(entryDir) {
	const files = fs.readdirSync(entryDir).filter(f => f !== '.' && f !== '..');

	/**
	 * @type {{ [entryName: string]: string[] }} entries
	 */
	const entryGroups = {};
	files.forEach(file => {
		const nameWithoutExtension = file
			.split('.')
			.slice(0, -1)
			.join('.');

		const entry =
			entryGroups[nameWithoutExtension] ||
			(entryGroups[nameWithoutExtension] = []);

		entry.push(path.join(entryDir, file));
	});

	return entryGroups;
}

/**
 * @param {ReturnType<findEntryGroups>} entryGroups
 * @param {import('webpack').WebpackOptions} outWebpackConfig
 */
function ripTsxEntries(entryGroups, outWebpackConfig) {
	Object.keys(entryGroups).forEach(groupName => {
		const files = entryGroups[groupName];

		let tsxFileName = null;
		let htmlFileName = null;
		let scssFileName = null;

		files.forEach(file => {
			switch (path.extname(file).toUpperCase()) {
				case '.TSX':
					tsxFileName = file;
					break;
				case '.HTML':
					htmlFileName = file;
					break;
				case '.SCSS':
					scssFileName = file;
					break;
				default:
					break;
			}
		});

		if (tsxFileName !== null) {
			const chunksForHtml = ['vendor', groupName];
			outWebpackConfig.entry[groupName] = tsxFileName;

			if (scssFileName !== null) {
				outWebpackConfig.entry[groupName] = [tsxFileName, scssFileName];
				// chunksForHtml.push(groupName + 'Scss');
			}
			if (htmlFileName !== null) {
				outWebpackConfig.plugins.push(
					new HtmlWebpackPlugin({
						template: htmlFileName,
						filename: path.basename(htmlFileName),
						chunks: chunksForHtml,
					})
				);
			}
		}
	});
}

/**
 * @param {ReturnType<findEntryGroups>} entryGroups
 * @param {import('webpack').WebpackOptions} outWebpackConfig
 */
function ripScssEntries(entryGroups, outWebpackConfig) {
	Object.keys(entryGroups).forEach(groupName => {
		const files = entryGroups[groupName];

		let scssFileName = null;

		files.forEach(file => {
			switch (path.extname(file).toUpperCase()) {
				case '.scss':
					scssFileName = file;
				default:
					break;
			}
		});

		if (scssFileName !== null) {
			outWebpackConfig.entry[groupName] = scssFileName;
		}
	});
}

/**
 * @type {import('webpack').WebpackOptions}
 */
const config = {
	mode: 'development',

	// Don't remove this
	entry: {},
	// Don't remove this either
	plugins: [new MiniCssExtractPlugin()],

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

const entryGroups = findEntryGroups(entryDir);
ripTsxEntries(entryGroups, config);
ripScssEntries(entryGroups, config);

module.exports = config;
