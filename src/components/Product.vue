<template>
	<div>
		<div>
			<div class="grid grid-cols-3 gap-6">
				<div class="col-span-1">
					<template v-if="onlyCreate === false">
						<div class="px-4 sm:px-0 space-y-4">
							<div class="relative">
								<img
									v-if="preview || product.photo.path"
									class="rounded-lg max-w-full max-h-96s"
									:src="preview || product.photo.path"
								/>
								<div v-else class="rounded-lg w-full h-96 bg-gray-200 text-gray-400 flex justify-center items-center">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-20 w-20"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
										/>
									</svg>
								</div>
								<!--<img v-else class="rounded-lg max-w-full max-h-96s" src="" />-->
								<div
									v-if="preview || product.photo.path"
									class="from-black to-transparent bg-gradient-to-t opacity-60 absolute bottom-0 left-0 right-0 h-1/2 rounded-b-lg"
								></div>
								<span
									v-if="product.price && (preview || product.photo.path)"
									class="absolute right-0 bottom-0 m-4 text-white font-bold text-4xl"
								>
									{{ currencyFormat(product.price, 'USD') }}
								</span>
							</div>
							<h3 class="text-lg font-medium leading-6 text-gray-900">{{ product.title }}</h3>
							<p class="text-sm text-gray-600 line-clamp-3">
								{{ product.description }}
							</p>
						</div>
					</template>
					<template v-else>
						<div class="px-4 sm:px-0 space-y-4">
							<h2 class="text-gray-700 font-semibold text-lg">Create a new Product</h2>
							<p class="text-gray-500">
								You can fill all the required info and it will immedietly show up on your widget
							</p>
							<div
								class="bg-blue-100 text-blue-600 ring-2s ring-blue-200 p-3 rounded-md flex items-center space-x-3 mt-auto"
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
										d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
								<span>You can edit these info at any time.</span>
							</div>
						</div>
					</template>
				</div>
				<div class="mt-5 md:mt-0 md:col-span-2">
					<Form @submit="updateProduct" v-slot="{ errors }">
						<div class="shadow sm:rounded-md sm:overflow-hidden">
							<div class="px-4 py-5 bg-white space-y-6 sm:p-6">
								<div class="max-w-md">
									<label for="title" class="block text-sm font-medium text-gray-700">Title</label>
									<div class="mt-1 relative rounded-md shadow-sm">
										<Field
											type="text"
											name="title"
											id="title"
											:class="{ 'ring-red-400 focus:ring-red-400': errors.title, 'ring-gray-300': !errors.title }"
											v-model="product.title"
											class="focus:ring-primary-500 ring-2 focus:border-primary-500 block w-full px-4 py-2 sm:text-sm border-gray-300 rounded-md"
											rules="required|min:2"
											placeholder="Lorem"
										/>
									</div>
									<span v-if="errors.title" class="text-red-400 text-sm">
										{{ errors.title }}
									</span>
								</div>

								<div>
									<label for="price" class="block text-sm font-medium text-gray-700">Price</label>
									<div class="mt-1 relative rounded-md shadow-sm">
										<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
											<span class="text-gray-500 sm:text-sm"> $ </span>
										</div>
										<Field
											type="number"
											v-model.number="product.usd_price"
											name="price"
											id="price"
											:class="{ 'ring-red-400 focus:ring-red-400': errors.price, 'ring-gray-300': !errors.price }"
											class="focus:ring-primary-500 ring-2 focus:border-primary-500 block w-24 pl-7 pr-12s py-2 sm:text-sm border-gray-300 rounded-md"
											rules="required|integer|min:1"
											placeholder="0.00"
										/>
										<!--<div class="absolute inset-y-0 right-0 flex items-center">
											<label for="currency" class="sr-only">Currency</label>
											<select
												id="currency"
												name="currency"
												class="focus:ring-primary-500 focus:border-primary-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
											>
												<option>USD</option>
												<option>CAD</option>
												<option>EUR</option>
											</select>
										</div>-->
									</div>
									<span v-if="errors.price" class="text-red-400 text-sm">
										{{ errors.price }}
									</span>
								</div>

								<div>
									<label for="category" class="block text-sm font-medium text-gray-700">Category</label>
									<div class="mt-1 relative rounded-md shadow-sm">
										<Field
											type="text"
											v-model="product.category"
											name="category"
											id="category"
											:class="{ 'ring-red-400 focus:ring-red-400': errors.category, 'ring-gray-300': !errors.category }"
											class="focus:ring-primary-500 ring-2 w-52 focus:border-primary-500 block px-4 py-2 sm:text-sm border-gray-300 rounded-md"
											rules="required|min:2"
											placeholder="ex. Electronics, Puppies"
										/>
										<!--<div class="absolute inset-y-0 right-0 flex items-center">
											<label for="currency" class="sr-only">Currency</label>
											<select
												id="currency"
												name="currency"
												class="focus:ring-primary-500 focus:border-primary-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
											>
												<option>USD</option>
												<option>CAD</option>
												<option>EUR</option>
											</select>
										</div>-->
									</div>
									<span v-if="errors.category" class="text-red-400 text-sm">
										{{ errors.category }}
									</span>
								</div>

								<div>
									<label for="description" class="block text-sm font-medium text-gray-700">
										Description
										<span class="text-gray-500">(optional)</span>
									</label>
									<div class="mt-1">
										<textarea
											id="description"
											name="description"
											rows="3"
											v-model="product.description"
											:class="{
												'ring-red-400 focus:ring-red-400': errors.description,
												'ring-gray-300': !errors.description,
											}"
											class="shadow-sm focus:ring-primary-500 p-3 ring-2 focus:border-primary-500 mt-1 block w-full sm:text-sm rounded-md"
											placeholder="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et, minus."
										></textarea>
									</div>
									<span v-if="errors.description" class="text-red-400 text-sm">
										{{ errors.description }}
									</span>
								</div>

								<div>
									<label class="block text-sm font-medium text-gray-700 mb-1"> Product photo </label>
									<div
										@dragover.prevent="allowDrop"
										@drop.prevent="drop"
										:class="{ 'border-red-400': errors.photo, 'border-gray-300': !errors.photo }"
										class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md"
									>
										<div class="space-y-1 text-center">
											<svg
												class="mx-auto h-12 w-12 text-gray-400"
												stroke="currentColor"
												fill="none"
												viewBox="0 0 48 48"
												aria-hidden="true"
											>
												<path
													d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
													stroke-width="2"
													stroke-linecap="round"
													stroke-linejoin="round"
												/>
											</svg>
											<div class="flex text-sm text-gray-600">
												<label
													for="photo"
													class="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2s focus-within:ring-offset-2s focus-within:ring-primary-500s"
												>
													<span class="focus:outline-none outline-none ring-0">Upload a photo</span>
													<input
														id="photo"
														name="photo"
														type="file"
														rules="required|image"
														:class="{
															'ring-red-400 focus:ring-red-400': errors.photo,
															'ring-gray-300': !errors.photo,
														}"
														class="sr-only"
													/>
												</label>
												<p class="pl-1">or drag and drop</p>
											</div>
											<p class="text-xs text-gray-500">PNG, JPG up to 4MB</p>
										</div>
									</div>
								</div>
								<span v-if="errors.photo" class="text-red-500 text-sm">
									{{ errors.photo }}
								</span>
							</div>
							<div class="px-4 py-3 bg-gray-50 text-right sm:px-6 flex justify-end">
								<button
									type="submit"
									:disabled="loading"
									:class="{
										'bg-primary-600 hover:bg-primary-700': !loading,
										'cursor-default bg-gray-500 ': loading,
									}"
									class="flex justify-center items-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
								>
									<svg
										v-if="loading"
										class="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
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

									<span v-if="!onlyCreate"> Update </span>
									<span v-else> Create </span>
								</button>
							</div>
						</div>
					</Form>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { defineProps, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useDraggable } from '@vueuse/core';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { show, store, update } from '@/services/api/products';
import { createFormData, currencyFormat, handleErrors, imageToUrl } from '@/utils';

const props = defineProps({
	onlyCreate: {
		type: Boolean,
		default: false,
	},
});

const router = useRouter();
const route = useRoute();
const { id } = route.params;
const preview = ref(null);
const product = ref({
	title: '',
	price: '',
	description: '',
	photo: { path: null },
});
const loading = ref(false);
const photo = ref(null);

function getItem() {
	show(id).then(({ data }) => {
		product.value = data.product;
	});
}

function handleDrag(event) {
	console.log(event);
}

function allowDrop(ev) {
	// ev.preventDefault();
}

function drag(ev) {
	ev.dataTransfer.setData('text', ev.target.id);
}

function drop(event) {
	if (event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files[0]) {
		const file = event.dataTransfer.files[0];
		if (file) {
			photo.value = file;
			preview.value = imageToUrl(file);
		} else {
			photo.value = null;
			preview.value = null;
		}
	}
}

function updateProduct(values, actions) {
	loading.value = true;
	// const payload = photo.value
	//	? createFormData({ ...values, currency: product.value.currency, photo: photo.value })
	//	: createFormData({ ...values, currency: product.value.currency });

	const payload = { ...values };

	if (photo.value) {
		payload.photo = photo.value;
	}

	if (props.onlyCreate === false) {
		// eslint-disable-next-line no-underscore-dangle
		payload.currency = product.value.currency;
	}

	(props.onlyCreate === false ? update(product.value.slug, createFormData(payload)) : store(createFormData(payload)))
		.then(({ data }) => {
			console.log(data);
			router.push({
				name: 'Products',
			});
		})
		.catch(error => {
			handleErrors(error, errors => actions.setErrors(errors));
		})
		.finally(() => {
			loading.value = false;
		});

	// console.log(, actions);
}

if (props.onlyCreate === false) {
	getItem();
}
</script>
