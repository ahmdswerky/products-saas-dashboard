import { createRouter, createWebHistory, useRoute } from 'vue-router';
import { authenitcation } from '@/middlewares/authentication';
import api from '@/services/api';

const routes = [
	{
		path: '/',
		redirect: '/installation',
	},
	{
		path: '/installation',
		name: 'Installation',
		meta: {
			title: 'Installation',
			layout: 'Default',
		},
		// beforeEnter: (to, from, next) => {
		//	to.params.js = 'asd';
		//	console.log(to, from, next);
		//	next();
		// },
		// beforeEnter(to, from, next) {
		//	api
		//		.get(`https://products-list.test/products-list.js`)
		//		.then(({ data }) => {
		//			window.jsInstallationCode = data;
		//		})
		//		.finally(() => {
		//			next();
		//		});
		// },
		component: () => import('@/views/Installation.vue'),
	},
	{
		path: '/connect/:gateway?',
		name: 'Connect',
		meta: {
			title: 'Connect',
			layout: 'Default',
		},
		component: () => import('@/views/Connect.vue'),
	},
	{
		path: '/products',
		name: 'Products',
		meta: {
			title: 'Products',
			layout: 'Default',
		},
		component: () => import('@/views/Products.vue'),
	},
	{
		path: '/products/create',
		name: 'CreateProduct',
		meta: {
			title: 'Create Product',
			layout: 'Default',
		},
		component: () => import('@/views/CreateProduct.vue'),
	},
	{
		path: '/products/:id',
		name: 'Product',
		meta: {
			title: 'Product',
			layout: 'Default',
		},
		component: () => import('@/views/UpdateProduct.vue'),
	},
	{
		path: '/signin',
		name: 'SignIn',
		meta: {
			title: 'Sign in',
			type: 'auth',
			layout: 'Auth',
		},
		component: () => import('@/views/auth/SignIn.vue'),
	},
	{
		path: '/signup',
		name: 'SignUp',
		meta: {
			title: 'Sign up',
			type: 'auth',
			layout: 'Auth',
		},
		component: () => import('@/views/auth/SignUp.vue'),
	},
	{
		path: '/404',
		name: 'NotFound',
		meta: {
			title: 'Not Found',
			layout: 'Default',
		},
		component: () => import('@/views/errors/NotFound.vue'),
	},
	{
		path: '/:catchAll(.*)',
		redirect: '/installation',
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

// router.beforeEach(authenitcation);
router.beforeEach(authenitcation);
// router.beforeEach((to, from, next) => {
//	return authenitcation(to, from, next);
// });

// router.beforeEach((to, from, next) => {
//	document.title = `${to.meta.title} | Dashboard`;

//	next();
// });

export default router;
