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
		'Content-Type': undefined,
	};

	delete config.headers.common['Content-Type'];
	config.headers['Content-Type'] = undefined;

	// delete headers.common['Content-Type'];

	if (
		(typeof apiKey.value === 'string' && apiKey.value) ||
		(typeof apiKey.value === 'object' && Object.keys(apiKey.value).length)
	) {
		headers['Api-Key'] = apiKey.value;
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
