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
		apiKey: state => state.merchant.api_key,
	},
};

export default merchant;
