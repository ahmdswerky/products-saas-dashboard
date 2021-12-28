import axios from 'axios';
// import api from '@/services/api';

export function getIntegrationCode() {
	return axios.get(`https://d2b1av8zp398ss.cloudfront.net/v1/integration.js`);
}

export function index() {}
