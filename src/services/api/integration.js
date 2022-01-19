import axios from 'axios';
// import api from '@/services/api';

export function getIntegrationCode() {
	const { protocol } = window.location;
	// return axios.get(`${protocol}//d2b1av8zp398ss.cloudfront.net/v1/integration.js`);
	return axios.get(`https://products-list.test/integration.js`);
}

export function index() {}
