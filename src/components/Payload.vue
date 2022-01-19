<template>
	<div class="flex items-center space-x-3">
		<div class="w-20 flex items-start justify-start">
			<span class="rounded font-bold text-white px-2 py-0.5" :class="color">{{ method }}</span>
		</div>
		<span class="flex-grow text-gray-600 font-medium">{{ uri }}</span>
	</div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
	method: {
		required: true,
		type: String,
		validator(value) {
			return ['GET', 'POST', 'PUT', 'DELETE'].includes(value);
		},
	},
	uri: {
		required: true,
		type: String,
	},
});

const colors = {
	GET: 'bg-green-500',
	POST: 'bg-blue-500',
	PUT: 'bg-yellow-500',
	DELETE: 'bg-red-500',
};

const color = colors[props.method];
</script>

<style></style>
