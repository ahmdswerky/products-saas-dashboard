import { computed } from 'vue';
import { getUser } from '@/services/api/auth';
import store from '@/store';

export function authenitcation(to, from, next) {
	const loggedIn = computed(() => store.getters['auth/loggedIn']);
	const token = computed(() => store.getters['auth/token']);
	const user = computed(() => store.getters['auth/user']);

	// const loggedIn = computed(() => store.getters['auth/loggedIn']);
	// const token = computed(() => store.getters['auth/token']);
	// const user = computed(() => store.getters['auth/user']);

	document.title = `${to.meta.title} | Simple Products`;

	// if (process.env.ENV !== 'production') {
	//	next();
	// }

	if (loggedIn.value) {
		// if (to.meta.type === 'auth') {
		//	next({
		//		name: 'Installation',
		//	});
		// } else {
		//	next();
		// }
		next();
	} else if (!(user.value && user.value.id) && token.value) {
		getUser()
			.then(({ data }) => {
				store
					.dispatch('auth/signIn', {
						user: data.user,
						token: token.value,
					})
					.then(() => {
						return store.commit('keys/setApiKey', data.user.merchant.api_key);
					})
					.then(() => {
						return store.commit('merchant/setMerchant', data.user.merchant);
					})
					.then(() => {
						if (to.meta.type === 'auth') {
							next({
								name: 'Installation',
							});
						} else {
							next();
						}
					});
			})
			.catch(errors => {
				console.log(errors);
				store.dispatch('auth/signOut').then(() => {
					if (from.name !== 'SignIn') {
						next({
							name: 'SignIn',
						});
					} else {
						next();
					}
					// if () {
					//  next({
					//    name: 'SignIn'
					//  });
					// }
				});
				// if (to.name !== 'SignIn') {
				//	next({
				//		name: 'SignIn',
				//	});
				// } else {
				//	next();
				// }
			});
	} else if (to.meta.type === 'auth') {
		next();
	} else {
		next({
			name: 'SignIn',
			query: { ...to.query },
		});
	}
}

// export function authenitcation(to, from, next) {
//	const loggedIn = computed(() => store.getters['auth/loggedIn']);
//	const token = computed(() => store.getters['auth/token']);
//	const user = computed(() => store.getters['auth/user']);

//	if (loggedIn.value) {
//		next();
//	} else if (!(user.value && user.value.id) && token.value) {
//		getUser()
//			.then(({ data }) => {
//				store
//					.dispatch('auth/signIn', {
//						user: data.user,
//						token: token.value,
//					})
//					.then(() => {
//						alert(JSON.stringify(data.user.merchant));
//					})
//					.then(() => {
//						next();
//					});
//			})
//			.catch(() => {
//				store.dispatch('auth/signOut');
//			});
//	} else {
//		// next();
//	}
// }

export function isAuthenticated() {
	return store.getters['auth/loggedIn'];
}
