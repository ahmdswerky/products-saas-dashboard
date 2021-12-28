<template>
	<!--<TransitionRoot
		:show="open"
		enter="transition-all sduration-75"
		enter-from="opacity-0"
		enter-to="opacity-100"
		leave="transition-all  delay-300 sduration-150"
		leave-from="opacity-100"
		leave-to="opacity-0"
	>-->
	<div
		v-if="open"
		@click.self="close"
		class="bg-black bg-opacity-40 flex justify-end items-end fixed top-0 right-0 bottom-0 left-0 z-50"
	>
		<div
			:class="{ 'w-1/3': open, 'w-0': !open }"
			class="bg-white h-screen flex flex-col ml-auto shadow-lg transition-all"
		>
			<div class="flex items-center justify-between p-7">
				<h1 class="flex flex-shrink-0 text-lg items-center space-x-5 font-semibold text-gray-700 mb-4s">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
						/>
					</svg>
					<!--<svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
					/>
				</svg>-->
					<span>Transactions</span>
				</h1>

				<div class="flex items-center space-x-2">
					<span v-if="balance" class="text-gray-400 text-xl">Total of</span>
					<span v-if="balance" class="text-indigo-500 font-semibold text-2xl bg-gray-100 rounded-md px-2 py-1"
						>${{ balance }}</span
					>
				</div>
			</div>

			<hr class="line-through" />

			<div v-if="loading" class="flex-grow divide-y sspace-y-0.5">
				<div v-for="i in 30" :key="i" class="h-36 p-6">
					<div class="animate-pulse flex space-x-4">
						<div class="rounded-full bg-gray-100 h-10 w-10"></div>
						<div class="flex-1 space-y-6 py-1">
							<div class="h-3 bg-gray-100 rounded"></div>
							<div class="space-y-3">
								<div class="grid grid-cols-3 gap-4">
									<div class="h-3 bg-gray-100 rounded col-span-2"></div>
									<div class="h-3 bg-gray-100 rounded col-span-1"></div>
								</div>
								<div class="h-3 bg-gray-100 rounded"></div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div v-else class="divide-y overflow-y-auto flex-grow">
				<div v-for="({ status, user, created_at }, index) in payments" :key="index" class="p-7 hover:bg-gray-100">
					<div class="flex justify-between items-center">
						<div class="space-y-4">
							<div class="flex items-center justify-center space-x-4">
								<img class="rounded-full w-10 h-10 shadow-sm" :src="user.avatar.path" />
								<h3 class="text-sm text-gray-700 font-semibold">{{ user.name }}</h3>

								<div
									v-if="status === 'pending'"
									draggable="false"
									class="rounded-full select-none cursor-default space-x-1 flex items-center justify-center bg-amber-100 text-amber-600 text-xs font-semibold py-0.5 px-2"
								>
									<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
										<path
											fill-rule="evenodd"
											d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
											clip-rule="evenodd"
										/>
									</svg>
									<span>{{ status }}</span>
								</div>

								<div
									v-if="status === 'succeeded'"
									draggable="false"
									class="rounded-full select-none cursor-default space-x-1 flex items-center justify-center bg-green-100 text-green-600 text-xs font-semibold py-0.5 px-2"
								>
									<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
										<path
											fill-rule="evenodd"
											d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
											clip-rule="evenodd"
										/>
									</svg>
									<span>{{ status }}</span>
								</div>

								<div
									v-if="status === 'failed'"
									draggable="false"
									class="rounded-full select-none cursor-default space-x-1 flex items-center justify-center bg-red-100 text-red-600 text-xs font-semibold py-0.5 px-2"
								>
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
											d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
										/>
									</svg>
									<span>failed</span>
								</div>
							</div>

							<!--<button
							class="flex items-center text-gray-500 space-x-1 text-sm rounded-full px-2 py-0.5 hover:bg-gray-200"
						>
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
									d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
								/>
							</svg>
							<span>Copy transaction info</span>
						</button>-->
						</div>
						<div class="flex flex-col items-end space-y-2">
							<span class="text-indigo-500 font-semibold text-2xl">$2000</span>
							<div class="flex items-center space-x-1">
								<span class="text-gray-400 text-sm">Purchased on</span>
								<span class="text-gray-400 text-sm font-semibold">{{
									formatDate(created_at, 'MMMM D, YYYY hh:mm A')
								}}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!--</TransitionRoot>-->
</template>

<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
// import { TransitionRoot } from '@headlessui/vue';
import emitter from '@/plugins/emitter';
import { index } from '@/services/api/payments';
import { formatDate } from '@/utils';
import { getBalance } from '@/services/api/merchants';

const { getters, commit } = useStore();
const product = computed(() => getters['product/product']);
const open = computed(() => getters['product/transactionOpen']);
const loading = ref(true);
const balance = ref(null);
const payments = ref([]);

function getData() {
	loading.value = true;
	index(product.value.id)
		.then(({ data }) => {
			payments.value = data.data;
		})
		.then(() => {
			getBalance().then(({ data }) => {
				balance.value = data.total;
			});
		})
		.finally(() => {
			loading.value = false;
		});
}

function close() {
	loading.value = true;
	payments.value = [];
	balance.value = null;
	commit('product/setProduct', {});
	commit('product/closeTransactions');
}

emitter.on('payment:open', data => getData());
</script>
