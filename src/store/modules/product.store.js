const product = {
	namespaced: true,

	state: () => ({
		product: {},
		transactionOpen: false,
	}),

	mutations: {
		setProduct(state, data) {
			state.product = data;
		},
		openTransactions(state) {
			state.transactionOpen = true;
		},
		closeTransactions(state) {
			state.transactionOpen = false;
		},
		toggleTransactions(state) {
			state.transactionOpen = !state.transactionOpen;
		},
	},

	getters: {
		product: state => state.product,
		transactionOpen: state => state.transactionOpen,
	},
};

export default product;
