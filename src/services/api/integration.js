import axios from 'axios';
// import api from '@/services/api';

export function getIntegrationCode() {
	const { protocol } = window.location;
	return axios.get(`${protocol}//${process.env.VUE_APP_WIDGET_DOMAIN}/v1/integration.js`);
}

export function index() {}
