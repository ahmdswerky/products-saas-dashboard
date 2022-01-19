import api from '@/services/api';

export function index(params) {
	return api.get('products', { params });
}

export function show(id) {
	return api.get(`products/${id}`);
}

export function store(data) {
	return api.post(`products`, data, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});
}

export function update(id, data) {
	return api.post(`products/${id}`, data, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});
}

export function remove(id) {
	return api.delete(`products/${id}`);
}
