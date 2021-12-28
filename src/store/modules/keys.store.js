const merchant = {
	namespaced: true,

	state: () => ({
		apiKey: {},
	}),

	mutations: {
		setApiKey(state, apiKey) {
			state.apiKey = apiKey;
		},
	},

	getters: {
		apiKey: state => state.apiKey,
	},
};

export default merchant;
