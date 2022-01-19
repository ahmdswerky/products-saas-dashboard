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
			v-if="gateway === 'paypal'"
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

		<div class="flex flex-col justify-center items-center space-y-3">
			<img draggable="false" class="select-none h-10" src="@/assets/images/payment-gateways/paypal.png" />
		</div>
		<div class="flex flex-col justify-center items-start space-y-3">
			<div
				class="bg-sky-100 hover:bg-sky-50 group cursor-default rounded space-x-2 flex justify-center items-center px-2 p-1"
			>
				<img draggable="false" class="select-none h-7" src="@/assets/images/payment-methods/paypal.png" />
				<span class="text-sm text-gray-700 group-hover:text-sky-700">PayPal buttons</span>
			</div>
		</div>
		<div v-show="['none', 'disconnected'].includes(status)">
			<a
				:href="link"
				target="PPFrame"
				class="relative w-full flex justify-center items-center py-2 px-4 space-x-2 border border-transparent bg-primary-600 hover:bg-primary-700 focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 group text-sm font-medium rounded-md text-white focus:outline-none"
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
				<span>Connect</span>
			</a>
		</div>

		<div v-show="!['none', 'disconnected'].includes(status)">
			<DisconnectPaymentGateway gateway="paypal" />
		</div>
	</div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { connect, generateLink } from '@/services/api/connect';
import DisconnectPaymentGateway from '@/components/payment/DisconnectPaymentGateway.vue';
import { loadScript } from '@/utils/payment/paypal';
import emitter from '@/plugins/emitter';

const { commit } = useStore();
const router = useRouter();
const link = ref(null);
const loading = ref(false);
const { getters } = useStore();
const route = useRoute();
const gateway = computed(() => route.params.gateway);
const { merchantIdInPayPal, consentStatus } = route.query;
const status = computed(() => {
	const merchant = getters['merchant/merchant'];
	if (merchant && merchant.metas) {
		const meta = merchant.metas.find(item => item.gateway.key === 'paypal');
		return meta.status;
	}

	return 'none';
});

loadScript();

function loadButtonLink() {
	emitter.emit('payment:pending', 'paypal', true);

	generateLink('paypal')
		.then(({ data }) => {
			link.value = `${data.link}&displayMode=minibrowser`;
		})
		.catch(errors => {
			console.log(errors);
		})
		.finally(() => {
			emitter.emit('payment:pending', 'paypal', false);
		});
}

loadButtonLink();

generateLink('paypal')
	.then(({ data }) => {
		link.value = data.link;
	})
	.catch(err => {
		//
	});

if (gateway.value === 'paypal' && merchantIdInPayPal && consentStatus.toString() === 'true') {
	connect({
		remote_id: merchantIdInPayPal,
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
