import { createStore } from 'vuex';
import auth from '@/store/modules/auth.store';
import merchant from '@/store/modules/merchant.store';
import product from '@/store/modules/product.store';
import keys from '@/store/modules/keys.store';

export default createStore({
	modules: {
		auth,
		merchant,
		product,
		keys,
	},
});
