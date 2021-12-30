<template>
	<div class="bg-gray-100 h-screen w-full flex justify-center items-center" style="height: 100vh">
		<div class="w-full lg:w-1/2 flex flex-col h-full">
			<div class="mb-auto mx-auto" style="width: 450px">
				<div class="relative"></div>
			</div>
			<div class="mb-auto">
				<slot />
			</div>
		</div>
	</div>
</template>

<script setup>
import { defineComponent, onMounted } from 'vue';

defineComponent({
	name: 'AuthLayout',
});

onMounted(() => {
	const img = new Image();
	img.src = `${window.location.origin}/images/logo.png`;
});
</script>
