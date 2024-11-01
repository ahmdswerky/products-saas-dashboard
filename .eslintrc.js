// const configFile = require.resolve(__dirname, 'vue.config.js');

module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: ['plugin:vue/vue3-essential', '@vue/airbnb', 'plugin:prettier/recommended'],
	parserOptions: {
		parser: 'babel-eslint',
	},
	plugins: ['prettier'],
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'import/no-unresolved': 'off',
		'import/extensions': 'off',
		'no-unused-vars': 'off',
		'import/no-cycle': 'off',
		'unused-vars': 'off',
		'import/no-extraneous-dependencies': 'off',
	},
	// settings: {
	//	'import/resolver': {
	//		webpack: {
	//			config: require.resolve('@vue/cli-service/webpack.config.js'),
	//		},
	//	},
	// },
	settings: {
		'import/resolver': {
			// alias: {
			//	map: [['@', './src']],

			//	extensions: ['.js', '.vue', '.json'],
			// },
			webpack: {
				// config: require.resolve(__dirname, './vue.config.js'),
				// config: configFile,
			},
		},
	},
	overrides: [
		{
			files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
			env: {
				jest: true,
			},
		},
	],
};
