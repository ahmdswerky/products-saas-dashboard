<template>
	<div class="bg-white px-3 py-2 rounded-lg shadow flex items-center justify-between">
		<div class="flex-1 flex items-center justify-between">
			<div>
				<nav class="relative z-10 inline-flex items-center rounded-md space-x-4" aria-label="Pagination">
					<button
						@click="paginate(-1)"
						:disabled="page <= 1"
						:class="{
							'hover:bg-gray-200': page > 1,
							'hover:bg-gray-100 cursor-default': page <= 1,
						}"
						class="relative inline-flex items-center px-2 py-2 rounded-md bg-gray-100 text-sm font-medium text-gray-500"
					>
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
					</button>

					<div>
						<p class="text-sm text-gray-700">
							Showing
							<span class="font-medium">{{ perPage * (page - 1) + 1 }}</span>
							to
							<span class="font-medium">{{ perPage * page }}</span>
							of
							<span class="font-medium">{{ total }}</span>
							results
						</p>
					</div>

					<button
						@click="paginate(1)"
						:disabled="!hasMore"
						:class="{
							'hover:bg-gray-200': hasMore,
							'hover:bg-gray-100 cursor-default': !hasMore,
						}"
						class="relative inline-flex items-center px-2 py-2 rounded-md bg-gray-100 text-gray-500 text-sm font-medium"
					>
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
					</button>
				</nav>
			</div>
		</div>
	</div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue';

const props = defineProps({
	page: {
		type: Number,
		default: 1,
	},
	lastPage: {
		type: Number,
		default: 0,
	},
	total: {
		type: Number,
		default: 0,
	},
	perPage: {
		type: Number,
		default: 15,
	},
	hasMore: {
		type: Boolean,
		default: false,
	},
});

const emit = defineEmits(['change']);
const page = computed(() => props.page);
const lastPage = computed(() => props.lastPage);
const total = computed(() => props.total);
const perPage = computed(() => props.perPage);
const hasMore = computed(() => props.hasMore);

function paginate(steps) {
	const newPage = props.page + steps;

	emit('change', newPage);
}
</script>
