import { computed } from 'vue';
import api from '@/services/api';
import store from '@/store';

export function gateways() {
	return api.get('payment-gateways');
}

export function generateLink(gateway) {
	return api.post('merchant/link', { gateway });
}

export function connect(data) {
	return api.post('merchants', data);
}

export function disconnect(gateway) {
	const merchantId = computed(() => store.getters['merchant/merchant'].id);

	return api.post(`merchants/${merchantId.value}`, {
		_method: 'PUT',
		status: 'disconnected',
		gateway,
	});
}
