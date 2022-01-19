const merchant = {
	namespaced: true,

	state: () => ({
		codeTheme: 'dark',
	}),

	mutations: {
		setCodeTheme(state, theme) {
			state.codeTheme = theme;
		},
	},

	getters: {
		codeTheme: state => state.codeTheme,
	},
};

export default merchant;
