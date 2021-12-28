const merchant = {
	namespaced: true,

	state: () => ({
		merchant: {},
	}),

	mutations: {
		setMerchant(state, data) {
			state.merchant = data;
		},
	},

	getters: {
		merchant: state => state.merchant,
	},
};

export default merchant;
