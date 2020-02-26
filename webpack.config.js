module.exports = {
	mode: 'development',
	entry: ['./src/main.ts'],
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: 'ts-loader',
			},
		],
	},
};
