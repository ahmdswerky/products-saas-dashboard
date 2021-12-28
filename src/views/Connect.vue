<template>
	<div class="flex flex-col h-full">
		<div class="flex-shrink-0 flex justify-between items-center">
			<h1 class="text-xl text-gray-600 mb-4 flex items-center space-x-3">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
					/>
				</svg>
				<span>Connect Payment Methods</span>
			</h1>
		</div>

		<div
			v-if="gateway"
			class="bg-yellow-100 mt-autos text-yellow-600 ring-2s ring-blue-200 p-3 rounded-md flexs items-center space-x-3 my-auto inline-flex mx-auto px-4"
		>
			<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
				/>
			</svg>
			<span>We're connecting your account, please keep this page until we finish.</span>
		</div>

		<div
			v-if="!gateway && !loaded"
			class="text-blue-500 ring-2s p-3 font-semibold space-x-3 mx-auto space-y-10 px-4 my-auto"
		>
			<div class="flex justify-center items-center space-x-3">
				<img class="w-12" src="@/assets/images/love.png" alt="" />
				<span>We are preparing your links.</span>
			</div>
			<div class="mx-auto">
				<svg
					class="animate-spin h-6 w-6 text-blue-500 mx-auto"
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
			</div>
		</div>

		<div v-show="gateway && !loaded" class="flex-grow flex justify-center items-center">
			<svg
				class="animate-spin h-6 w-6 text-indigo-500"
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
		</div>

		<div v-show="loaded" class="flex-grow flex justify-center items-center space-x-6">
			<!--<div v-if="!loaded" class="bg-white bg-opacity-70"></div>-->

			<!--<div class="flex justify-center items-center space-x-6 relative p-10">
				<div
					v-if="!loaded"
					class="bg-black bg-opacity-20 absolute top-0 right-0 bottom-0 left-0 z-20 flex justify-center items-center rounded-lg"
				>
					<svg
						class="animate-spin h-6 w-6 text-indigo-500"
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
				</div>-->

			<StripeConnect class="w-80 h-60" />
			<PaypalConnect class="w-80 h-60" />
		</div>
	</div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import StripeConnect from '@/components/payment/StripeConnect.vue';
import PaypalConnect from '@/components/payment/PayPalConnect.vue';
import emitter from '@/plugins/emitter';
import { show } from '@/services/api/merchants';

const { commit } = useStore();
const route = useRoute();
const gateway = computed(() => route.params.gateway);
const pending = ref({
	stripe: true,
	paypal: true,
});
const loaded = computed(() => {
	let result = true;

	Object.keys(pending.value).forEach(key => {
		if (pending.value[key] === true) {
			result = false;
		}
	});

	return result;
});

function getPaymentMethods() {
	show().then(({ data }) => {
		commit('merchant/setMerchant', data.merchant);
	});
}

getPaymentMethods();

emitter.on('payment:pending', (method, value) => {
	pending.value[method] = value;
});
</script>
