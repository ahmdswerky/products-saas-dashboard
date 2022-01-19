<template>
	<div class="space-y-6">
		<h1 class="text-xl text-gray-600 mb-4 flex items-center space-x-3">
			<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
				/>
			</svg>
			<span>API</span>
		</h1>

		<div class="flex justify-between items-start relative">
			<div class="flex-shrink-0" style="width: 550px">
				<div class="bg-white shadow rounded-lg mb-6">
					<h3 class="text-gray-600 p-4 font-semibold border-b space-x-2 flex items-center">
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
								d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
							/>
						</svg>
						<span>Authentication</span>
					</h3>
					<p class="text-gray-500 px-4 pt-4 pb-2 text-sm">
						The API uses API keys to authenticate requests. You can view and manage your API keys in the Dashboard.
					</p>
					<!--<p class="text-gray-500 font-semibold px-4 pb-3 text-sms">There are two ways to use it in a request</p>-->
					<p class="text-gray-500 font-semibold px-4 pb-2 text-sm">
						<span>in a header</span>
						<span class="bg-blueGray-200 mx-3 text-blueGray-600 px-2 py-0.5 rounded">Api-Key: {{ apiKey }}</span>
					</p>
					<p class="text-gray-500 font-semibold px-4 pb-4 text-sm">
						<span>or in a query</span>
						<span class="bg-blueGray-200 mx-3 text-blueGray-600 px-2 py-0.5 rounded">
							?api_key={{ apiKey }}
							<Popper
								as="section"
								placement="top"
								locked
								class="p-0 absolute right-0 top-0 whitespace-nowrap text-sm"
								content="Copied to clipboard"
								:show="showPopper"
							>
								<!--<button class="text-gray-500" @click="copyCode('?api_key={{ apiKey }}')">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-5 w-5 relative top-1"
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
								</button>-->
							</Popper>
							<!--<svg
								@click="copy('?api_key={{ apiKey }}')"
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
							</svg>-->
						</span>
					</p>
				</div>

				<div class="space-y-3 mb-10">
					<div
						v-for="({ uri, description, method, list, status, rules, payload, object }, index) in api.routes"
						:key="index"
						as="section"
						class="bg-white shadow rounded-lg"
					>
						<button
							@click="toggle(`${uri}-${method}`, api.objects[object], list, status)"
							class="py-3 px-4 flex justify-between w-full"
						>
							<ApiUri :method="method" :uri="uri" />

							<ChevronRightIcon
								class="w-6 my-auto"
								:class="open === `${uri}-${method}` ? 'transform rotate-90 text-primary-500' : 'text-gray-500'"
							/>
						</button>
						<transition
							enter-active-class="transition duration-100 ease-out"
							enter-from-class="transform scale-95 opacity-0"
							enter-to-class="transform scale-100 opacity-100"
							leave-active-class="transition-none duration-none ease-out"
							leave-from-class="transform scale-100 opacity-100"
							leave-to-class="transform scale-95 opacity-0"
						>
							<div
								v-if="open === `${uri}-${method}`"
								class="text-gray-500 border-t bg-gray-100 rounded-b-lg p-3 space-y-2"
							>
								<span v-if="description">
									{{ description }}
								</span>
								<div v-if="payload" class="text-gray-500 font-semibold pt-2 border-t border-gray-300">
									{{ method === 'GET' ? 'Query' : 'Payload' }}
								</div>
								<ul v-if="rules" class="text-gray-500 mt-2 p-3 rounded-md border">
									<li class="space-x-3" v-for="(rule, field) of rules" :key="rule">
										<span class="text-gray-600 text-sm capitalize w-20s font-semibolds inline-block">{{ field }}</span>
										<span v-if="rule === 'required'" class="text-xs font-semibold text-orange-600 uppercase">{{
											rule
										}}</span>
									</li>

									<!--<li class="space-x-3" v-for="(rule, i) in rules" :key="i">
										<span class="text-gray-500 text-sm">{{ rules[rule] }}</span>
										<span v-if="rule === 'required'" class="text-sm text-orange-600">{{ rule }}</span>
									</li>-->
								</ul>
								<div
									v-if="payload"
									style="max-height: calc(100vh - 6rem)"
									class="rounded-md text-black bg-white w-full overflow-y-autos overflow-x-hidden"
								>
									<pre
										class="w-full whitespace-pre-wrap p-6 text-sm"
										v-html="convertToCode(JSON.stringify(payload, null, 2), 'json')"
									></pre>
								</div>
							</div>
						</transition>
					</div>
				</div>
			</div>

			<div class="w-20 flex-shrink-0"></div>

			<!--<pre
				v-if="status === 204"
				style="background-color: #0d1117"
				class="w-full whitespace-pre-wrap text-white p-6 text-sm"
				v-html="convertToCode('No Content', 'html')"
			></pre>-->

			<div
				v-if="status !== 204 && open && code"
				style="max-height: calc(100vh - 6rem)"
				class="bg-blueGray-800s rounded-lg w-full text-black bg-white shadow flex-grow sticky top-4 right-0s overflow-y-auto overflow-x-hiddens sh-screen-y-4s"
			>
				<!--<span
					class="fixed bottom-7 z-40 right-14 mx-2 cursor-default select-none font-semibold px-2 py-0.5 rounded bg-gray-500"
				>
					{{ status }}
				</span>-->
				<pre v-if="status !== 204" class="w-full whitespace-pre-wrap p-6 text-sm" v-html="code"></pre>
				<!--<pre v-else class="w-full whitespace-pre-wrap p-6 text-sm" v-html="('No Content', 'html')"></pre>-->
			</div>
			<!--v-html="convertToCode(JSON.stringify(code), 'json')"-->
		</div>
	</div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
import { ChevronRightIcon } from '@heroicons/vue/solid';
import { useStore } from 'vuex';
import { useClipboard } from '@vueuse/core';
import Popper from 'vue3-popper';
import { api } from '@/services/api/docs.json';
import { convertToCode } from '@/utils';
import ApiUri from '@/components/ApiUri.vue';
import Payload from '@/components/Payload.vue';

const { getters } = useStore();
const open = ref(null);
const status = ref(200);
const code = ref(null);
const showPopper = ref(false);
const apiKey = computed(() => getters['merchant/apiKey']);
const source = ref('');
const { copy } = useClipboard({ source });

function copyCode(content) {
	copy(content).then(() => {
		showPopper.value = true;

		setTimeout(() => {
			showPopper.value = false;
		}, 1500);
	});
}

function toggle(id, object, list, statusCode = 200) {
	let output = object;
	status.value = statusCode;
	if (object === undefined) {
		open.value = false;
		code.value = null;
	} else {
		open.value = open.value === id ? null : id;
		if (list) {
			output = {
				data: object,
				...api.pagination,
			};
		}
		console.log(output);
		code.value = convertToCode(JSON.stringify(output, null, 2), 'json');
	}
}
</script>
