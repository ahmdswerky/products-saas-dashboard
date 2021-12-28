import { computed } from 'vue';
import api from '@/services/api';
import store from '@/store';

export function signUp(data) {
	return api.post('signup', data);
}

export function signIn(data) {
	return api.post('signin', data);
}

export function getUser() {
	const token = computed(() => store.getters['auth/token']);

	return api.get('user', {
		headers: {
			Authorization: `Bearer ${token.value}`,
		},
	});
}
