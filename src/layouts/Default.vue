<template>
	<div class="flex flex-col w-full h-screen items-stretch bg-white">
		<div class="flex w-full h-full">
			<div class="shadow-xl relative z-50">
				<Sidebar />
			</div>
			<main
				class="bg-blue-50s bg-gray-100 shadow-lgs h-screen flex-grow overflow-y-auto overflow-x-hidden rounded-l-2xls rounded-2xls m-2s"
			>
				<div class="p-6 h-full">
					<slot />
				</div>
			</main>
		</div>
	</div>
</template>

<script setup>
import Sidebar from '@/components/layout/Sidebar.vue';
</script>
