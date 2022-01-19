<template>
	<div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
		<div class="max-w-md w-full space-y-8">
			<div>
				<img class="mx-auto h-16" src="/images/logo.svg" alt="Simple Products" />
				<h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
				<p class="mt-2 text-center text-sm text-gray-600">
					Or
					<RouterLink :to="{ name: 'SignUp' }" class="font-medium text-primary-600 hover:text-primary-500">
						create a new account
					</RouterLink>
				</p>
			</div>
			<Form @submit="login" v-slot="{ errors }" class="mt-8 space-y-2 bg-white p-8 rounded-lg shadow">
				<div class="rounded-md space-y-2">
					<div>
						<label for="email" class="sr-only">Email address</label>
						<Field
							id="email"
							name="email"
							type="email"
							autocomplete="email"
							:class="{
								'ring-gray-300 focus:ring-primary-500 ': !errors.email,
								'ring-red-400 focus:ring-red-400 ': errors.email,
							}"
							class="block ring-1 focus:ring-2 w-full px-3 py-2 placeholder-gray-500 text-gray-900 rounded-md"
							:rules="email"
							placeholder="Email address"
						/>
						<div class="text-red-400 text-sm h-5 block mt-1">
							<ErrorMessage v-if="errors.email" name="email" />
						</div>
					</div>
					<div>
						<label for="password" class="sr-only">Password</label>
						<Field
							id="password"
							name="password"
							type="password"
							autocomplete="off"
							:rules="password"
							:class="{
								'ring-gray-300 focus:ring-primary-500 ': !errors.password,
								'ring-red-400 focus:ring-red-400 ': errors.password,
							}"
							class="block ring-1 focus:ring-2 w-full px-3 py-2 placeholder-gray-500 text-gray-900 rounded-md"
							placeholder="Password"
						/>
						<div class="text-red-400 text-sm h-5 block mt-1">
							<ErrorMessage v-if="errors.password" name="password" />
						</div>
					</div>
				</div>

				<div class="flex items-center justify-between">
					<div class="flex items-center">
						<input
							id="remember-me"
							name="remember"
							checked
							type="checkbox"
							class="h-4 w-4 checkbox ring-2 ring-gray-400 rounded-full border-none"
						/>
						<label class="cursor-pointer w-4 h-4 ring-2 rounded" for="remember-me">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-4 w-4 checkbox-icon"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
							</svg>
						</label>
						<label for="remember-me" class="mx-2 block text-sm text-gray-900 select-none"> Remember me </label>
					</div>

					<!--<div class="text-sm">
						<a href="#" class="font-medium text-primary-600 hover:text-primary-500"> Forgot your password? </a>
					</div>-->
				</div>

				<div>
					<button
						type="submit"
						:disabled="Object.keys(errors).length || loading"
						:class="{
							'bg-gray-400 cursor-default': Object.keys(errors).length || loading,
							'bg-primary-600 hover:bg-primary-700 focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 group':
								!Object.keys(errors).length && !loading,
						}"
						class="relative mt-6 w-full flex justify-center items-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none"
					>
						<svg
							v-if="loading"
							class="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
						>
							<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
							<path
								class="opacity-75"
								fill="currentColor"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
							></path>
						</svg>
						<span>Sign in</span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-4 w-4 -ml-4 opacity-0 group-hover:opacity-100 group-hover:ml-1 transition-all"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
						</svg>
					</button>
				</div>
			</Form>
		</div>
	</div>
</template>

<script setup>
import { Form, Field, ErrorMessage, useResetForm } from 'vee-validate';
import { ref } from 'vue-demi';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { email, password } from '@/schemas/auth';
import { signIn } from '@/services/api/auth';
import { handleErrors } from '@/utils';

const router = useRouter();
const loading = ref(false);
const { commit, dispatch } = useStore();

function login(values, actions) {
	loading.value = true;
	console.log(values, actions);

	signIn(values)
		.then(({ data }) => {
			dispatch('auth/signIn', {
				user: data.user,
				token: data.token,
			})
				.then(() => {
					return commit('keys/setApiKey', data.user.merchant?.api_key);
				})
				.then(() => {
					return commit('merchant/setMerchant', data.user.merchant);
				})
				.then(() => {
					router.push({
						name: 'Installation',
					});
				});
		})
		.catch(error => {
			handleErrors(error, errors => actions.setErrors(errors));
		})
		.finally(() => {
			loading.value = false;
		});
}
</script>
