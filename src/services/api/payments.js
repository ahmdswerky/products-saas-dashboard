import { computed } from 'vue';
import api from '@/services/api';
import store from '@/store';

export function index(params) {
	const merchant = computed(() => store.getters['merchant/merchant']);

	return api.get('payments', {
		params: {
			...params,
			merchant_id: merchant.value.id,
		},
	});
}

export function show(id) {
	return api.get(`payments/${id}`);
}
