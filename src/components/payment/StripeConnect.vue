<template>
	<div class="p-5 rounded-lg shadow-md bg-white flex justify-between flex-col space-y-3 relative">
		<div
			v-if="!['none', 'disconnected'].includes(status) && !loading"
			class="rounded-full font-semibold px-3 absolute top-0 left-0 mx-5 transform -translate-y-1/2 text-sm space-x-2"
			:class="{
				'bg-amber-100  text-amber-700': status === 'pending',
				'bg-teal-100  text-teal-700': status === 'connected',
			}"
		>
			<svg
				v-if="status === 'connected'"
				xmlns="http://www.w3.org/2000/svg"
				class="inline-flex h-5 w-5"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
				/>
			</svg>
			{{ status }}
		</div>

		<div
			v-if="code && gateway === 'stripe'"
			class="bg-white bg-opacity-70 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0 z-10 rounded-lg"
		>
			<svg
				class="animate-spin h-6 w-6 text-primary-500"
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

		<div class="flex flex-col justify-center items-center space-y-2">
			<img draggable="false" class="select-none h-10" src="@/assets/images/payment-gateways/stripe.svg" />
			<!--<p class="text-gray-400">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro, repellendus?</p>-->
			<!--<p class="text-gray-400">offers multiple payment methods</p>-->
		</div>
		<div class="flex flex-col justify-center items-start space-y-3">
			<div
				class="bg-sky-100 hover:bg-sky-50 group cursor-default rounded space-x-2 flex justify-center items-center px-2 p-1"
			>
				<img draggable="false" class="select-none h-7" src="@/assets/images/payment-methods/credit_card.png" />
				<span class="text-sm text-gray-700 group-hover:text-sky-700">Credit Cards</span>
			</div>
			<div
				class="relative bg-sky-100 hover:bg-sky-50 group cursor-default rounded space-x-2 flex justify-center items-center px-2 p-1"
			>
				<span
					class="px-2 py-0.5s h-5 select-none text-sm block font-semibold bg-orange-100 text-orange-500 rounded-full absolute top-0 right-0 transform -translate-y-1/2 translate-x-1/2"
					>soon</span
				>
				<img draggable="false" class="select-none h-7" src="@/assets/images/payment-methods/google-pay.png" />
				<span class="text-sm text-gray-700 group-hover:text-sky-700">Google Pay</span>
			</div>
			<div
				class="relative bg-sky-100 hover:bg-sky-50 group cursor-default rounded space-x-2 flex justify-center items-center px-2 p-1"
			>
				<span
					class="px-2 py-0.5s h-5 select-none text-sm block font-semibold bg-orange-100 text-orange-500 rounded-full absolute top-0 right-0 transform -translate-y-1/2 translate-x-1/2"
					>soon</span
				>
				<img draggable="false" class="select-none h-7" src="@/assets/images/payment-methods/ach.png" />
				<span class="text-sm text-gray-700 group-hover:text-sky-700">Bank Transfers (ACH)</span>
			</div>
			<!--<p class="text-gray-400">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro, repellendus?</p>-->
			<!--<p class="text-gray-400">offers multiple payment methods</p>-->
			<!--<div class="flex justify-center items-center flex-grow h-full space-x-8 sw-full">
				<img class="h-8" src="@/assets/images/payment-methods/credit_card.png" />
				<img class="h-8" src="@/assets/images/payment-methods/ach.png" />
			</div>-->
		</div>

		<div v-show="['none', 'disconnected'].includes(status)">
			<a
				@click="loading = true"
				:href="link"
				class="relative w-full flex justify-center items-center py-2 px-4 border space-x-2 border-transparent bg-primary-600 hover:bg-primary-700 focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 group text-sm font-medium rounded-md text-white focus:outline-none"
			>
				<svg
					v-if="loading"
					class="animate-spin h-4 w-4 text-white"
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
				<span>Connect</span>
			</a>
		</div>
		<div v-show="!['none', 'disconnected'].includes(status)">
			<DisconnectPaymentGateway gateway="stripe" />
		</div>
	</div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { connect, generateLink } from '@/services/api/connect';
import DisconnectPaymentGateway from '@/components/payment/DisconnectPaymentGateway.vue';
import emitter from '@/plugins/emitter';

const link = ref(null);
const loading = ref(false);
const { getters, commit } = useStore();
const router = useRouter();
const route = useRoute();
// const { gateway } = route.params;
const gateway = computed(() => route.params.gateway);
const code = computed(() => route.query.code);
const status = computed(() => {
	const merchant = getters['merchant/merchant'];
	if (merchant && merchant.metas) {
		const meta = merchant.metas.find(item => item.gateway.key === 'stripe');
		return meta.status;
	}

	return 'none';
});
// const status = computed(() => getters['merchant/merchant']);

// alert(JSON.stringify(status.value.metas.find(item => item.gateway.key === 'stripe')));
// status.value.metas.find(item => alert(JSON.stringify(item.gateway.key)));

function loadButtonLink() {
	emitter.emit('payment:pending', 'stripe', true);
	generateLink('stripe')
		.then(({ data }) => {
			link.value = data.link;
		})
		.catch(err => {
			//
		})
		.finally(() => {
			emitter.emit('payment:pending', 'stripe', false);
		});
}

loadButtonLink();

if (code.value && gateway.value === 'stripe') {
	connect({
		code: code.value,
		gateway: gateway.value,
	})
		.then(({ data }) => {
			loading.value = false;
			commit('merchant/setMerchant', data.merchant);
			setTimeout(() => {
				router.push({
					name: route.name,
				});
			}, 100);
		})
		.catch(() => {
			loading.value = false;
			//
		});
}
</script>
