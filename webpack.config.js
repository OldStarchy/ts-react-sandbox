module.exports = {
	mode: 'development',
	entry: {
		index: './src/index.tsx',
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
			},
		],
	},
};
