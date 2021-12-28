<template>
	<div class="space-y-6">
		<h1 class="text-xl text-gray-600 mb-4 flex items-center space-x-3">
			<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
				/>
			</svg>
			<span>Installation</span>
		</h1>

		<div v-if="codes.javascript">
			<h3 class="text-gray-900 mb-2">
				01. Copy this script and paste it inside the
				<span class="py-1 px-2 rounded bg-black bg-opacity-5 code-font" v-html="convertToCode(`<head>`, 'html')"></span>
				tag.
			</h3>
			<div class="rounded overflow-hiddens relative w-2/5">
				<Popper
					as="section"
					placement="top"
					locked
					class="p-0 absolute right-0 top-0 whitespace-nowrap text-sm"
					content="Copied to clipboard"
					:show="showPopper.javascript"
				>
					<button
						class="bg-white text-gray-500 hover:text-gray-600 focus:text-gray-800 rounded sabsolute right-0 top-0 m-2 p-1s"
						@click="copyCode('javascript')"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
							/>
						</svg>
					</button>
				</Popper>
				<!--<pre
					style="overflow-wrap: anywhere"
					class="whitespace-pre-wrap w-full bg-white shadow-sm text-black p-4 rounded-md code-font"
				><span v-html="convertToCode(codes.javascript, 'javascript')"></span></pre>-->
				<!--<pre
					style="overflow-wrap: anywhere"
					class="whitespace-pre-wrap w-full bg-white shadow-sm text-black p-4 rounded-md code-font"
				><span v-html="convertToCode(`<script>`, 'html')"></span></pre>-->
				<pre
					style="overflow-wrap: anywhere"
					class="whitespace-pre-wrap w-full bg-white shadow-sm text-black p-4 rounded-md code-font"
				><span v-html="convertToCode(`<script>\n${codes.javascript}\n</script>`, 'html')"></span></pre>
			</div>
		</div>

		<div v-if="codes.html">
			<h3 class="text-gray-900 mb-2">02. Add this code to the page you want it displayed in.</h3>

			<div class="rounded-md border border-gray-300 p-5 mb-4 inline-block bg-black bg-opacity-4">
				<h4 class="text-gray-600 text-sm space-x-2 flex items-center">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<span> Change the display of products (optional) </span>
				</h4>
				<div class="flex justify-start items-start space-x-3 my-3">
					<Display @click="selectDisplay(null)" is-default :selected="selectedDisplay === null" />
					<Display
						@click="selectDisplay"
						:display="one"
						:selected="selectedDisplay === one"
						v-for="(one, i) in displays"
						:key="i"
					/>
				</div>
			</div>

			<div class="transition-all rounded overflow-hiddens relative w-2/5">
				<span v-if="selectedDisplay !== null" class="flex h-3 w-3 absolute -top-1 -right-1">
					<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
					<span class="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
				</span>
				<!--<span class="flex h-full w-full absolute z-0">
					<span class="animate-ping absolute inline-flex h-full w-full rounded-md bg-indigo-500 opacity-75"></span>
					<span class="relative inline-flex rounded-md h-full w-full bg-transparent"></span>
				</span>-->
				<!--<span class="flex h-full w-full absolute">
					<span class="animate-ping absolute inline-flex h-full w-full roundedbg-sky-400 opacity-75"></span>
					<span class="relative inline-flex rounded h-full w-full bg-sky-500"></span>
				</span>-->
				<!--<div :class="{ 'animate-ping': selectedDisplay !== null }" class="absolute top-0 right-0 bottom-0 left-0 "></div>-->
				<Popper
					as="section"
					placement="top"
					locked
					class="p-0 absolute right-0 top-0 whitespace-nowrap text-sm"
					content="Copied to clipboard"
					:show="showPopper.html"
				>
					<button
						class="bg-white text-gray-500 hover:text-gray-600 focus:text-gray-800 rounded sabsolute right-0 top-0 m-2 p-1s"
						@click="copyCode('html')"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
							/>
						</svg>
					</button>
				</Popper>
				<pre
					class="whitespace-pre-wrap w-full bg-white shadow-sm text-black p-4 rounded-md code-font"
				><span v-html="convertToCode(codes.html, 'html')"></span></pre>
			</div>
		</div>
	</div>
</template>

<script setup>
import { useClipboard } from '@vueuse/core';
import Popper from 'vue3-popper';
import { ref, reactive, onMounted } from 'vue';
import { onBeforeRouteUpdate } from 'vue-router';
import Display from '@/components/Display.vue';
import { getIntegrationCode } from '@/services/api/integration';
import { convertToCode } from '@/utils';
import api from '@/services/api';

const showPopper = ref({
	javascript: false,
	html: false,
});
// const parameters = ['window', 'document', `'${process.env.VUE_APP_WIDGET_URL}/products-list.js'`, `'SULaWEQxzBv4UKC'`];
// const codes = ref({
//	html: `<simple-products-list></simple-products-list>`,
//	// javascript: `const _0x4f1c82=_0x4e0a;(function(_0x17c355,_0x5612fd){const _0x1c63fa=_0x4e0a,_0x2c33a1=_0x17c355();while(!![]){try{const _0xf609b7=-parseInt(_0x1c63fa(0x15a))/0x1*(-parseInt(_0x1c63fa(0x164))/0x2)+parseInt(_0x1c63fa(0x162))/0x3*(parseInt(_0x1c63fa(0x168))/0x4)+parseInt(_0x1c63fa(0x166))/0x5*(parseInt(_0x1c63fa(0x169))/0x6)+parseInt(_0x1c63fa(0x159))/0x7+parseInt(_0x1c63fa(0x15c))/0x8*(parseInt(_0x1c63fa(0x16a))/0x9)+parseInt(_0x1c63fa(0x158))/0xa+-parseInt(_0x1c63fa(0x154))/0xb;if(_0xf609b7===_0x5612fd)break;else _0x2c33a1['push'](_0x2c33a1['shift']());}catch(_0x4bc965){_0x2c33a1['push'](_0x2c33a1['shift']());}}}(_0x20d0,0x3ccb7));const baseURL=_0x4f1c82(0x15b),scriptId=_0x4f1c82(0x152),script=document[_0x4f1c82(0x165)](_0x4f1c82(0x157));function _0x20d0(){const _0x468626=['https://products-list.test','2120RYpKDj','onload','dispatchEvent','src','loaded','head','174niINoM','googleId','354mwRbml','createElement','5qtXHEt','/products-list.js','244RsdUpm','2606220OwFeol','5949JBrWeu','google-script','products-list:loaded','14090725vjfZpP','append','fireLoaded','script','3067980eweLBu','2569686uRJONJ','1373rylwFD'];_0x20d0=function(){return _0x468626;};return _0x20d0();}function _0x4e0a(_0x3575ff,_0x583389){const _0x20d0b8=_0x20d0();return _0x4e0a=function(_0x4e0abd,_0x4f9b2c){_0x4e0abd=_0x4e0abd-0x152;let _0x3f157e=_0x20d0b8[_0x4e0abd];return _0x3f157e;},_0x4e0a(_0x3575ff,_0x583389);}script[_0x4f1c82(0x15f)]=baseURL+_0x4f1c82(0x167),script['id']=scriptId,document[_0x4f1c82(0x161)][_0x4f1c82(0x155)](script),window[_0x4f1c82(0x163)]={'loaded':![],'fireLoaded':()=>{const _0x57d944=_0x4f1c82,_0x69ebfd=new Event(_0x57d944(0x153));window[_0x57d944(0x15e)](_0x69ebfd);}},script[_0x4f1c82(0x15d)]=()=>{const _0x3c1e57=_0x4f1c82;window[_0x3c1e57(0x163)][_0x3c1e57(0x160)]=!![],window[_0x3c1e57(0x163)][_0x3c1e57(0x156)]();};`,
//	javascript: ``,
//	// javascript: `(function(s,e,t,u,p){p=e.createElement('script'); p.src=t;e.head.append(p);s['ljkbamkwa']=u;})(${parameters.join(
//	//	`,`
//	// )});`,
// });

const displays = ref(['6x2', '4x3', '4x2', '3x4']);
const selectedDisplay = ref(null);
const htmlParts = [`<simple-products-list`, `></simple-products-list>`];
const codes = reactive({
	javascript: null,
	html: null,
});
// const codes = ref({
//	javascript: null,
//	html: null,
// });

getIntegrationCode().then(({ data }) => {
	// codes.javascript = convertToCode(data, 'javascript');
	// codes.html = convertToCode(`<simple-products-list></simple-products-list>`, 'html');
	codes.javascript = data;
	codes.html = htmlParts.join('');
});

function selectDisplay(display) {
	selectedDisplay.value = display;
	if (display === null) {
		codes.html = htmlParts.join('');
	} else {
		codes.html = htmlParts.join(` display="${display}"`);
	}
}

// fetch(`https://products-list.test/products-list.js`)
//	.then(res => res)
//	.then(res => {
//		console.log(res);
//	});

// alert(window.jsInstallationCode);

const code = ref(window.jsInstallationCode);
const source = ref('');
// const jsCode = hljs.highlight(codes.value.javascript, { language: 'javascript' }).value;
// const jsCode = hljs.highlight(code, { language: 'javascript' }).value;
// const htmlCode = hljs.highlight(codes.value.html, { language: 'html' }).value;

const { copy } = useClipboard({ source });

function copyCode(name) {
	const values = showPopper.value;

	Object.keys(values).forEach(key => {
		values[key] = false;
	});

	copy(codes[name]).then(() => {
		showPopper.value[name] = true;

		setTimeout(() => {
			showPopper.value[name] = false;
		}, 1500);
	});

	// if (name === 'javascript') {

	// }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400&display=swap');

.code-font {
	font-family: 'Inter', sans-serif;
	font-weight: 400;
}
</style>
