import { computed } from 'vue';
import api from '@/services/api';
import store from '@/store';

export function show() {
	const merchantId = computed(() => store.getters['merchant/merchant'].id);

	return api.get(`merchants/${merchantId.value}`);
}

export function getBalance() {
	return api.get(`merchant/balance`);
}
