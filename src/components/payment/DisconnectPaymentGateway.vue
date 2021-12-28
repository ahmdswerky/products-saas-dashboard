<template>
	<button
		@click="deleteItem"
		class="relative w-full flex justify-center items-center py-2 px-4 border space-x-2 border-transparent bg-gray-200 hover:bg-gray-300 focus:bg-gray-300 focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 group text-sm font-medium rounded-md text-gray-700 focus:outline-none"
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
		<span> Disconnect </span>
	</button>
</template>

<script setup>
import { defineProps, ref } from 'vue';
import { useStore } from 'vuex';
import { disconnect } from '@/services/api/connect';

const props = defineProps({
	gateway: {
		type: String,
		required: true,
	},
});

const { commit } = useStore();
const loading = ref(false);

function deleteItem() {
	loading.value = true;

	disconnect(props.gateway)
		.then(({ data }) => {
			commit('merchant/setMerchant', data.merchant);
		})
		.finally(() => {
			loading.value = false;
		});
}
</script>
