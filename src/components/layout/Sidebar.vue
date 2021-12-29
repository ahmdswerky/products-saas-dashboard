<template>
	<aside
		class="flex-shrink-0 flex flex-col justify-between h-screen overflow-y-auto overflow-x-hidden"
		style="width: 320px"
	>
		<div>
			<div class="nav-logo flex flex-col justify-center items-center h-48">
				<img src="/images/logo.png" alt="Simple Products" class="rounded-md w-16 h-16 bg-gray-100s shadow-lgs" />
				<!--<h2 class="mt-3 text-gray-500 font-bold text-lg">{{ merchant?.title }}</h2>-->
				<h2 class="mt-3 text-gray-500 font-bolds text-lg">
					Welcome, <span class="font-semibold">{{ user.name }}</span>
				</h2>
			</div>
			<nav class="mt-2 mx-3">
				<ul class="bg-customs grid flex-col gap-y-2">
					<li
						v-for="({ title, icon, to }, i) in navigation"
						:key="i"
						class="rounded-md bg-blueGray-100 text-blueGray-700 hover:bg-blueGray-200 shadows nav-list relative"
					>
						<span
							:class="{ 'border-l-4 transition-all': route.name === to.name }"
							class="border-l-0 border-indigo-500 absolute top-0 bottom-0 left-0 rounded-l-md"
						></span>
						<RouterLink :to="to" class="flex items-center mx-4 w-full py-3 px-2">
							<span
								v-if="icon.startsWith('mdi-')"
								class="text-gray-500 bg-gray-200 nav-icon rounded-md mdi w-8 text-center flex-grow-0"
								:class="icon"
								style="font-size: 1.1rem"
							/>
							<span v-else v-html="icon"></span>
							<span class="flex-grow mx-4">{{ title }}</span>
						</RouterLink>
					</li>
				</ul>
			</nav>
		</div>

		<div @click="logout" class="p-3 flex justify-center">
			<!--<RouterLink :to="{ name: 'SignIn' }"></RouterLink>-->
			<button
				class="flex justify-centers justify-between items-center space-x-3 bg-red-400 text-red-100 hover:bg-red-500 font-semibold rounded-md px-4 py-2 w-full"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6 mr-autos"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
					/>
				</svg>
				<span class="mr-auto"> Sign out </span>
				<span class="w-6"></span>
			</button>
		</div>
	</aside>
</template>

<script setup>
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { computed } from 'vue-demi';

const { getters, dispatch } = useStore();
const router = useRouter();
const route = useRoute();
const merchant = computed(() => getters['merchant/merchant']);
const user = computed(() => getters['auth/user']);

const navigation = [
	{
		title: 'Installation',
		to: {
			name: 'Installation',
		},
		icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
</svg>`,
	},
	{
		title: 'Payment Methods',
		to: {
			name: 'Connect',
		},
		icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
</svg>`,
	},
	{
		title: 'Products',
		to: {
			name: 'Products',
		},
		icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
</svg>`,
	},
];

function logout() {
	dispatch('auth/signOut').then(() => {
		router.push({
			name: 'SignIn',
		});
	});
}
</script>
