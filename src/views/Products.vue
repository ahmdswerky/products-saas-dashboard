<template>
	<div>
		<Payments :show="route.name === 'Transactions'" />

		<div class="flex justify-between items-center">
			<h1 class="text-xl text-gray-600 mb-4 flex items-center space-x-3">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
					/>
				</svg>
				<span> Products </span>
			</h1>

			<RouterLink
				:to="{ name: 'CreateProduct' }"
				class="bg-primary-500 hover:bg-primary-600 transition-all text-white px-4 py-1 rounded-md text-sm"
			>
				Create
			</RouterLink>
		</div>

		<section class="flex justify-between items-end my-2 bg-gray-200s rounded-lg p-4s relative">
			<!--<div style="width: 140px" class="bg-white z-0 shadow absolute right-0 top-0 bottom-0 rounded-lg shadow-sms"></div>-->
			<form @submit.prevent="search()" class="relative shadow-sm flex bg-white rounded-md">
				<span
					@click="focus('#search')"
					class="bg-gray-200 cursor-default select-none opacity-70 rounded-md absolute w-7 mx-2 left-0 top-2 bottom-2 text-gray-500 font-semibold flex justify-center items-center"
				>
					/
				</span>
				<input
					v-model="searchQuery"
					id="search"
					type="text"
					placeholder="Search"
					class="pl-11 pr-4 py-2 rounded-md h-12 text-gray-700"
				/>
				<button class="bg-transparent rounded-r-lg px-4 text-gray-400" type="submit">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/>
					</svg>
				</button>
			</form>
			<div
				class="flex flex-col items-center justify-center space-y-2 relative z-1 bg-white rounded-lg shadow py-4 px-6"
			>
				<span class="text-2xl mx-2 text-primary-500 font-semibold">{{ currencyFormat(balance, 'USD') }}</span>
				<h4 class="text-gray-500">Total Revenue</h4>
			</div>
		</section>

		<div v-if="loading" class="animate-pulse flex space-x-4">
			<div style="height: 80vh" class="bg-gray-200 w-full rounded-lg"></div>
		</div>
		<div v-else-if="!loading && products.length" class="flex flex-col">
			<div class="overflow-x-auto -mx-8">
				<div class="py-2 align-middle inline-block min-w-full px-8">
					<div class="overflow-hidden border-b border-gray-200 rounded-lg shadow">
						<table class="min-w-full divide-y divide-gray-200">
							<thead class="bg-gray-50">
								<tr>
									<th
										scope="col"
										class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
									>
										Title
									</th>
									<th
										scope="col"
										class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
									>
										Price
									</th>
									<th
										scope="col"
										class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
									>
										Quantity
									</th>
									<th
										style="width: 50px"
										scope="col"
										class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
									>
										Category
									</th>
									<th style="width: 300px" scope="col" class="relative px-6 py-3">
										<span class="sr-only">Edit</span>
									</th>
								</tr>
							</thead>
							<tbody class="bg-white divide-y divide-gray-200">
								<tr
									:class="{ 'bg-red-50': deleting === product.slug, 'bg-primary-50': paymentProduct.id === product.id }"
									class="relative"
									v-for="product in products"
									:key="product.id"
								>
									<td class="px-6 py-4 whitespace-nowrap group">
										<div
											v-if="paymentProduct.id === product.id"
											class="absolute bg-primary-500 top-0 left-0 bottom-0 w-1"
										></div>
										<div class="flex items-center">
											<RouterLink
												:to="{ name: 'Product', params: { id: product.slug } }"
												class="flex-shrink-0 h-10 w-7"
											>
												<img class="h-10 w-7 rounded-md" :src="product.photo?.path" />
											</RouterLink>
											<div class="ml-4">
												<RouterLink
													:to="{ name: 'Product', params: { id: product.slug } }"
													class="text-sm font-medium text-gray-900 flex justify-center items-center space-x-2"
												>
													<span>
														{{ product.title }}
													</span>

													<svg
														xmlns="http://www.w3.org/2000/svg"
														class="h-4 w-4 text-gray-500 opacity-0 transition-all transform group-hover:translate-x-3 group-hover:opacity-100"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
													>
														<path
															stroke-linecap="round"
															stroke-linejoin="round"
															stroke-width="2"
															d="M14 5l7 7m0 0l-7 7m7-7H3"
														/>
													</svg>
												</RouterLink>
											</div>
										</div>
									</td>
									<td class="px-6 py-4 whitespace-nowrap">
										<div class="text-sm font-bold text-gray-500">
											{{ currencyFormat(product.usd_price, 'USD') }}
										</div>
									</td>
									<td class="px-6 py-4 whitespace-nowrap">
										<span class="text-gray-600 text-sm">
											{{ product.quantity }}
										</span>
										<!--<span
											class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
										>
											Active
										</span>-->
									</td>
									<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										{{ product.category }}
									</td>
									<td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
										<div class="flex justify-center items-center space-x-2">
											<button
												v-if="product.total_payments"
												:title="`${currencyFormat(product.total_payments, 'USD')}`"
												@click="openPayments(product)"
												class="bg-gray-100 flex items-center space-x-1 text-sm hover:bg-gray-200 text-gray-600 py-1 px-2 rounded-md space-x-2"
											>
												<span>{{ currencyFormat(product.total_payments, 'USD') }}</span>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													class="h-5 w-5"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
												>
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="2"
														d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
													/>
												</svg>
											</button>

											<RouterLink
												v-if="deleting !== product.slug"
												:to="{ name: 'Product', params: { id: product.slug } }"
												class="text-primary-600 p-2 hover:text-primary-900 flex justify-center items-center space-x-1"
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													class="h-4 w-4"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
												>
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="2"
														d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
													/>
												</svg>
												<span> Edit </span>
											</RouterLink>

											<button
												v-if="deleting !== product.slug"
												@click="beforeDeleteItem(product.slug)"
												class="text-red-400 p-2 hover:text-red-600 flex justify-center items-center space-x-1"
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													class="h-4 w-4"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
												>
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="2"
														d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
													/>
												</svg>

												<span> Delete </span>
											</button>

											<div class="flex justify-center items-center" v-if="deleting === product.slug && !deleted">
												<button
													@click="deleteItem(product.slug)"
													class="text-red-400 p-2 hover:text-red-600 flex justify-center items-center space-x-1"
												>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														class="h-4 w-4"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
													>
														<path
															stroke-linecap="round"
															stroke-linejoin="round"
															stroke-width="2"
															d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
														/>
													</svg>

													<span> Confirm Delete </span>
												</button>

												<button
													v-if="deleting === product.slug"
													@click="cancelDelete"
													class="text-gray-500 p-2 hover:text-gray-600 flex justify-center items-center space-x-1"
												>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														class="h-4 w-4"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
													>
														<path
															stroke-linecap="round"
															stroke-linejoin="round"
															stroke-width="2"
															d="M6 18L18 6M6 6l12 12"
														/>
													</svg>

													<span> Cancel </span>
												</button>
											</div>

											<span
												v-if="deleting === product.slug && deleted"
												class="text-red-500 p-2 flex justify-center items-center space-x-1"
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													class="h-4 w-4 animate-spin"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
												>
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="2"
														d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
													/>
												</svg>

												<span> Deleting </span>
											</span>
										</div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>

					<div class="flex justify-center items-center my-2">
						<Paginator
							@change="paginate"
							:page="meta.page"
							:total="meta.total"
							:lastPage="meta.lastPage"
							:hasMore="meta.hasMore"
							:perPage="meta.perPage"
						/>
					</div>

					<div
						v-if="false"
						class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between rounded-b-lg px-8 py-4 bg-white border-ts"
					>
						<div>
							<p class="text-sm text-gray-700">
								Showing
								<span class="font-medium">1</span>
								to
								<span class="font-medium">10</span>
								of
								<span class="font-medium">97</span>
								results
							</p>
						</div>
						<div>
							<nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
								<a
									href="#"
									class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
								>
									<span class="sr-only">Previous</span>
									<!-- Heroicon name: solid/chevron-left -->
									<svg
										class="h-5 w-5"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
										fill="currentColor"
										aria-hidden="true"
									>
										<path
											fill-rule="evenodd"
											d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
											clip-rule="evenodd"
										/>
									</svg>
								</a>
								<!-- Current: "z-10 bg-primary-50 border-primary-500 text-primary-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" -->
								<a
									href="#"
									aria-current="page"
									class="z-10 bg-primary-50 border-primary-500 text-primary-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
								>
									1
								</a>
								<a
									href="#"
									class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
								>
									2
								</a>
								<a
									href="#"
									class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
								>
									3
								</a>
								<span
									class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
								>
									...
								</span>
								<a
									href="#"
									class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
								>
									8
								</a>
								<a
									href="#"
									class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
								>
									9
								</a>
								<a
									href="#"
									class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
								>
									10
								</a>
								<a
									href="#"
									class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
								>
									<span class="sr-only">Next</span>
									<!-- Heroicon name: solid/chevron-right -->
									<svg
										class="h-5 w-5"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
										fill="currentColor"
										aria-hidden="true"
									>
										<path
											fill-rule="evenodd"
											d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
											clip-rule="evenodd"
										/>
									</svg>
								</a>
							</nav>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div v-else style="height: 80vh" class="flex justify-center items-center flex-col space-y-6">
			<img class="w-72" src="@/assets/images/empty.png" alt="" />
			<h3 class="text-gray-400 text-xl font-semibold flex justify-center items-center space-x-3">
				<span> You don't have any products yet, </span>
				<RouterLink
					:to="{ name: 'CreateProduct' }"
					class="bg-primary-500 hover:bg-primary-600 transition-all text-white px-4 py-2 rounded-md text-sm"
				>
					Create a new Product
				</RouterLink>
			</h3>
		</div>
	</div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { onKeyStroke } from '@vueuse/core';
import { useStore } from 'vuex';
import Paginator from '@/components/Paginator.vue';
import { index, remove } from '@/services/api/products';
import Payments from '@/components/Payments.vue';
import { currencyFormat, focus } from '@/utils';
import { getBalance } from '@/services/api/merchants';
import emitter from '@/plugins/emitter';

const { commit, getters } = useStore();
const route = useRoute();
const router = useRouter();
const searchQuery = ref('');
const loading = ref(true);
const deleting = ref(null);
const deleted = ref(null);
const balance = ref(0);
const products = ref([]);
const meta = ref({});
const paymentProduct = computed(() => getters['product/product']);

function getData(params = {}) {
	loading.value = true;
	index(params)
		.then(({ data }) => {
			products.value = data.data;
			meta.value = {
				page: data.current_page,
				total: data.total,
				lastPage: data.last_page,
				perPage: data.per_page,
				hasMore: data.has_more,
			};
		})
		.then(() => {
			getBalance().then(({ data }) => {
				balance.value = data.total;
			});
		})
		.catch(() => {
			//
		})
		.finally(() => {
			loading.value = false;
		});
}

function paginate(page) {
	router.push({
		query: {
			...route.query,
			page,
		},
	});

	getData({
		...route.query,
		page,
	});
}

function openPayments(product) {
	commit('product/setProduct', product);
	commit('product/openTransactions');
	router.push({
		name: 'Transactions',
		query: {
			...route.query,
		},
		params: {
			id: product.id,
		},
	});
	// router.push({
	//		query: {
	//			...route.query,
	//			transactions: searchQuery.value,
	//		},
	//	});
	emitter.emit('payment:open', product);
}

function cancelDelete() {
	deleting.value = null;
	deleted.value = null;
}

function deleteItem(slug) {
	deleted.value = slug;

	const i = products.value.findIndex(product => product.slug === slug);

	remove(slug).then(() => {
		cancelDelete();

		products.value.splice(i, 1);

		getData();
	});
}

function search(withoutFetch = false) {
	if (
		(searchQuery.value.trim() === '' && route.query.search === undefined) ||
		searchQuery.value === route.query.search
	) {
		return;
	}

	if (searchQuery.value.trim() && searchQuery.value.length) {
		router.push({
			query: {
				...route.query,
				search: searchQuery.value.trim(),
			},
		});
	} else {
		const query = { ...route.query };
		searchQuery.value = null;

		delete query.search;

		router.push({ query });
	}

	if (!withoutFetch) {
		getData({ search: searchQuery.value });
	}
}

function beforeDeleteItem(slug) {
	cancelDelete();
	deleting.value = slug;
}

watch(
	() => route.query.search,
	value => {
		searchQuery.value = value;
		search(true);
	}
);

onKeyStroke('Escape', () => {
	cancelDelete();
});

onKeyStroke('/', () => {
	const input = document.getElementById('search');

	if (!['input', 'textarea'].includes(document.activeElement.tagName)) {
		setTimeout(() => {
			input.focus();
		}, 1);
	}
});

onMounted(() => {
	if (route.query.search) {
		searchQuery.value = route.query.search;

		getData({ search: searchQuery.value });
	} else {
		getData();
	}
});
</script>
