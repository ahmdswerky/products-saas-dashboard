<template>
	<component :is="layout" v-if="layout">
		<slot />
	</component>
</template>

<script setup>
// import { ref } from '@vue/reactivity';
// import { watch } from '@vue/runtime-core';
import { reactive, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import Default from '@/layouts/Default.vue';
import Auth from '@/layouts/Auth.vue';
import Loading from '@/layouts/Loading.vue';
import Errors from '@/layouts/Errors.vue';
// import Auth from '@/layouts/Auth.vue';

// const layout = ref(Default);
const layout = ref(null);
const route = useRoute();
const layouts = reactive({
	Default,
	Auth,
	Loading,
	// Errors,
});

watch(
	() => route.meta,
	async meta => {
		// console.log(meta.layout);
		try {
			// const component = await import(`./${meta.layout}.vue`);
			// layout.value = component ? component.default : Loading;
			layout.value = meta.layout ? layouts[meta.layout] : Loading;
			// console.log(meta, layouts, layout.value);
			// console.log(meta, layouts);
			// layout.value = Default;
			// console.log(layout.value);
		} catch (error) {
			layout.value = Loading;
			// console.log('2', layout.value);
		}
	},
	{ immediate: true }
);
</script>
