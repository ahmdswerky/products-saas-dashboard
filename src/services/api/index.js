import axios from 'axios';
import { computed } from 'vue';
import router from '@/router';
import store from '@/store';

const api = axios.create({
	baseURL: process.env.VUE_APP_BASE_URL,
});

api.interceptors.request.use(config => {
	const apiKey = computed(() => store.getters['keys/apiKey']);
	const headers = {
		...config.headers,
	};

	if (apiKey.value) {
		headers['Api-Key'] = typeof apiKey.value !== 'string' ? JSON.stringify(apiKey.value) : apiKey.value;
	}

	return {
		...config,
		headers,
	};
});

api.interceptors.response.use(
	config => config,
	error => {
		if (error.response && error.response.status && error.response.status === 404) {
			router.push({
				name: 'NotFound',
			});
		}

		return Promise.reject(error);
	}
);

export default api;
