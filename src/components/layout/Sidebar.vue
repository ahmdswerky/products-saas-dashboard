<template>
	<aside
		class="flex-shrink-0 flex flex-col justify-between h-screen overflow-y-auto overflow-x-hidden"
		style="width: 320px"
	>
		<div>
			<div class="nav-logo flex flex-col justify-center items-center h-48">
				<img src="/images/logo.svg" alt="Simple Products" class="rounded-md w-16 h-16 bg-gray-100s shadow-lgs" />
				<!--<h2 class="mt-3 text-gray-500 font-bold text-lg">{{ merchant?.title }}</h2>-->
				<h2 class="mt-3 text-gray-500 font-bolds text-lg">
					Welcome, <span class="font-semibold">{{ user.name }}</span>
				</h2>
			</div>
			<nav class="mt-2 mx-3">
				<ul class="bg-customs grid flex-col gap-y-3">
					<li
						v-for="({ title, icon, to, soon, beta, children }, i) in navigation"
						:key="i"
						sclass="rounded-md bg-blueGray-100s text-blueGray-700 hover:bg-blueGray-200 shadows nav-list relative"
					>
						<div
							:class="{ 'hover:bg-blueGray-200': !soon }"
							class="rounded-md bg-blueGray-100 text-blueGray-700 shadows nav-list relative"
						>
							<span
								:class="{ 'border-l-4 transition-all': !soon && route.name === to.name }"
								class="border-l-0 border-primary-500 absolute top-0 bottom-0 left-0 rounded-l-md"
							></span>
							<RouterLink v-if="!soon" :to="to" class="flex items-center mx-4 py-3 px-2">
								<span
									v-if="icon.startsWith('mdi-')"
									class="text-gray-500 bg-gray-200 nav-icon rounded-md mdi w-8 text-center flex-grow-0"
									:class="icon"
									style="font-size: 1.1rem"
								/>
								<span v-else v-html="icon"></span>
								<div class="flex justify-between items-center flex-grow">
									<div class="flex items-center mx-4">
										<span class="flex-grow">{{ title }}</span>
										<span
											v-if="beta"
											class="text-xs mx-2 px-2 bg-primary-100 text-primary-500 font-semibold rounded-full"
											>beta</span
										>
									</div>
									<span v-if="soon" class="text-sm bg-orange-100 text-orange-500 px-2 rounded-full">soon</span>
								</div>
							</RouterLink>
							<a v-else class="flex cursor-default items-center mx-4 py-3 px-2 sw-full text-left text-gray-500">
								<span
									v-if="icon.startsWith('mdi-')"
									class="text-gray-500 bg-gray-200 nav-icon rounded-md mdi w-8 text-center flex-grow-0"
									:class="icon"
									style="font-size: 1.1rem"
								/>
								<span v-else v-html="icon"></span>
								<div class="flex justify-between items-center flex-grow">
									<span class="flex-grow mx-4">{{ title }}</span>
									<span v-if="soon" class="text-sm bg-orange-100 text-orange-500 px-2 rounded-full">soon</span>
								</div>
							</a>
						</div>

						<ul v-if="children" class="ml-3 mt-2s bg-blueGray-200s rounded-md px-2 pt-2 space-y-2">
							<li
								v-for="({ title, icon, to, soon }, i) in children"
								:key="i"
								:class="{ 'hover:bg-blueGray-200': !soon }"
								class="rounded-md bg-blueGray-100 text-blueGray-600 shadows nav-list relative"
							>
								<span
									:class="{ 'border-l-4 transition-all': !soon && route.name === to.name }"
									class="border-l-0 border-primary-500 absolute top-0 bottom-0 left-0 rounded-l-md"
								></span>
								<RouterLink v-if="!soon" :to="to" class="flex items-center mx-4 py-2 px-2">
									<span
										v-if="icon.startsWith('mdi-')"
										class="text-gray-500 bg-gray-200 nav-icon rounded-md mdi w-8 text-center flex-grow-0"
										:class="icon"
										style="font-size: 1.1rem"
									/>
									<span v-else v-html="icon"></span>
									<div class="flex justify-between items-center flex-grow">
										<span class="flex-grow mx-4">{{ title }}</span>
										<span v-if="soon" class="text-sm bg-orange-100 text-orange-500 px-2 rounded-full">soon</span>
									</div>
								</RouterLink>
								<a v-else class="flex cursor-default items-center mx-4 py-2 px-2 sw-full text-left text-gray-500">
									<span
										v-if="icon.startsWith('mdi-')"
										class="text-gray-500 bg-gray-200 nav-icon rounded-md mdi w-8 text-center flex-grow-0"
										:class="icon"
										style="font-size: 1.1rem"
									/>
									<span v-else v-html="icon"></span>
									<div class="flex justify-between items-center flex-grow">
										<span class="flex-grow mx-4">{{ title }}</span>
										<span v-if="soon" class="text-sm bg-orange-100 text-orange-500 px-2 rounded-full">soon</span>
									</div>
								</a>
							</li>
						</ul>
					</li>
				</ul>
			</nav>
		</div>

		<div @click="logout" class="p-3 flex justify-center">
			<!--<RouterLink :to="{ name: 'SignIn' }"></RouterLink>-->
			<button
				class="flex justify-centers justify-between items-center space-x-3 bg-red-100 text-red-500 hover:bg-red-200 font-semibold rounded-md px-4 py-2 w-full"
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
		title: 'Add-ons',
		to: {
			name: 'Addons',
		},
		beta: true,
		icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
</svg>`,
		children: [
			{
				title: 'API',
				to: {
					name: 'Api',
				},
				icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
</svg>`,
			},
// 			{
// 				title: 'Integrations',
// 				to: {
// 					name: 'Addons',
// 				},
// 				soon: true,
// 				icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
// </svg>`,
// 				//				icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// 				//  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
// 				// </svg>`,
// 			},
		],
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
	{
		title: 'Invitations',
		to: {
			name: 'Products',
		},
		soon: true,
		icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
</svg>`,
	},
	{
		title: 'Shipment',
		to: {
			name: 'Products',
		},
		soon: true,
		icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
</svg>`,
	},
	{
		title: 'Themes',
		to: {
			name: 'Products',
		},
		soon: true,
		icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
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
