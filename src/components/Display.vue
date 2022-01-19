<template>
	<div @click="select" class="flex flex-col items-center space-y-2 cursor-pointer">
		<div
			:class="{ 'border-primary-500': selected }"
			class="h-20 border border-transparent w-36 shadow rounded-md transition-all bg-white flex flex-col justify-center items-center"
		>
			<!--<div v-for="col in cols" :key="col" :class="`w-1/${cols}`" class="bg-gray-400">{{ cols }}</div>-->
			<!--<div v-for="col in cols" :key="col" :class="`w-1/${col}s`" class="bg-gray-400 w-4 h-5">{{ `w-1/${col}` }}</div>-->

			<template v-if="!isDefault">
				<div
					v-for="row in rows"
					:key="row"
					:class="`w-1/${row}s`"
					class="w-full flex justify-center items-center space-x-1 h-4 px-1"
				>
					<div
						v-for="col in cols"
						:key="col"
						:class="{ 'bg-primary-500': selected, 'bg-gray-400': !selected }"
						class="flex-shrink-0 rounded-sm w-3 h-3 transition-all"
					></div>
				</div>
			</template>
			<h4 :class="{ 'text-primary-500': selected, 'text-gray-500': !selected }" class="font-semibold" v-else>
				Default
			</h4>
		</div>
		<span class="text-gray-500">{{ display }}</span>
	</div>
</template>

<script setup>
import { computed, defineProps, defineEmits } from 'vue';

const props = defineProps({
	isDefault: {
		type: Boolean,
		default: false,
	},
	selected: {
		type: Boolean,
		default: false,
	},
	display: {
		type: String,
		required: true,
	},
});

const emit = defineEmits(['click']);
const cols = computed(() => Number(props.display.split('x')[0]));
const rows = computed(() => Number(props.display.split('x')[1]));

function select() {
	emit('click', props.display);
}
</script>
