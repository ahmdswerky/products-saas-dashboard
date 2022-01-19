<template>
	<div class="flex flex-col bg-white shadow-md rounded-lg group relative">
		<div class="relative overflow-x-hidden">
			<RouterLink
				v-if="routeName"
				:to="{ name: routeName }"
				class="absolute top-1/2 transform -translate-y-1/2 right-10 opacity-0 bg-primary-500 hover:bg-primary-400 text-white transition-all group-hover:right-5 group-hover:opacity-100 rounded-full w-9 h-9 flex justify-center items-center"
			>
				<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
				</svg>
			</RouterLink>

			<div class="absolute top-4 right-4 flex items-center justify-between">
				<div v-if="toogleable" class="flex items-center">
					<input
						:id="`toggle-${title}`"
						name="remember"
						v-model="data.enabled"
						@change="change"
						checked
						type="checkbox"
						class="h-4 w-4 toggle"
					/>
					<label class="cursor-pointer h-6 w-10 p-1 rounded-full" :for="`toggle-${title}`">
						<div class="toggle-circle h-4 w-4"></div>
					</label>
				</div>
			</div>

			<header class="px-6 pt-8 flex flex-col items-center space-y-4s text-center">
				<div class="relative text-gray-500 transition-all rounded-full h-12 w-12 flex justify-center items-center">
					<span class="hidden group-hover:flex absolute top-0 right-0 bottom-0 left-0">
						<span
							class="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary-500 opacity-75"
						></span>
					</span>
					<!--<span
					class="absolute -top-10 -right-10 -bottom-10 -left-10 rounded-full bg-primary-500 animate-pulse z-0"
				></span>-->
					<div class="relative z-1 bg-gray-100 w-full h-full flex justify-center items-center rounded-full my-3">
						<slot name="icon">
							<!--{{ icon }}-->
							<!--<img v-if="icon" class="h-6 w-6" :src="image" :alt="title" />-->
						</slot>
					</div>
				</div>
			</header>

			<main class="flex flex-col px-6 pb-8 text-center">
				<h4 class="text-gray-600 group font-semibold text-lg mt-4 flex justify-center items-center">
					<span v-if="url" class="h-4 w-6 block"></span>
					<span>{{ title }}</span>
					<a
						v-if="url"
						:href="url"
						target="_blank"
						class="text-gray-300 group-hover:opacity-100 opacity-0 transition-all p-2"
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
								d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
							/>
						</svg>
					</a>
				</h4>
				<p v-if="description" class="text-gray-400 text-sm mt-2">{{ description }}</p>
			</main>
		</div>

		<!--<div @click="toggle" v-if="requiresKeys" class="flex justify-end mx-5 mb-5">
			<button
				class="absolutes bottom-5 right-5 bg-gray-200 text-gray-600 rounded-lg w-8 h-8 flex justify-center items-center"
			>
				<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
				</svg>
			</button>
		</div>-->

		<footer v-if="requiresKeys && opened" class="bg-gray-100 rounded-b-lg flex mt-auto flex-col pt-4">
			<input
				class="block text-sm ring-1 mx-6 focus:ring-2 px-4 py-1 placeholder-gray-500 mt-2 text-gray-700 rounded ring-gray-300 focus:ring-primary-500"
				type="text"
				v-model="data.key"
				placeholder="Key"
			/>
			<input
				class="block text-sm ring-1 mx-6 focus:ring-2 px-4 py-1 placeholder-gray-500 mt-2 text-gray-700 rounded ring-gray-300 focus:ring-primary-500"
				type="text"
				v-model="data.secret"
				placeholder="Secret"
			/>
			<button
				@click="change"
				class="bg-primary-500 hover:bg-primary-400 rounded-b-lg text-white px-4 py-2 mt-4 uppercase text-sm font-semibold"
			>
				Update
			</button>
		</footer>
	</div>
</template>

<script setup>
import { defineProps, defineEmits, ref, computed } from 'vue';
import { RouterLink } from 'vue-router';

const props = defineProps({
	title: {
		required: true,
		type: String,
	},
	description: {
		required: false,
		type: String,
	},
	url: {
		required: false,
		type: String,
	},
	routeName: {
		required: false,
		type: String,
	},
	usageKey: {
		required: false,
		type: String,
	},
	usageSecret: {
		required: false,
		type: String,
	},
	// icon: {
	//	required: false,
	//	type: String,
	// },
	toogleable: {
		required: false,
		type: Boolean,
		default: () => true,
	},
	enabled: {
		required: false,
		type: Boolean,
		default: () => false,
	},
	requiresKeys: {
		required: false,
		type: Boolean,
		default: () => false,
	},
});

const emit = defineEmits('change');
// const isEnabled = ref(props.enabled);
const opened = ref(false);
const data = ref({
	enabled: props.enabled,
	key: props.usageKey || '',
	secret: props.usageSecret || '',
});

function toggle() {
	opened.value = !opened.value;
}

function change() {
	emit('change', {
		// value.target.checked,
		...data.value,
	});
}

function update() {
	alert(JSON.stringify(data.value));
}
</script>
