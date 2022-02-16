<template>
	<div class="relative w-2/3">
		<img
			draggable="false"
			src="@/assets/images/integrations.png"
			alt="Integrations"
			class="h-screen select-none opacity-30 fixed right-0 top-0 bottom-0 transform translate-x-1/2 z-0"
		/>

		<div class="space-y-8 relative z-1">
			<h1 class="text-xl text-gray-600 mb-4 flex items-center space-x-3">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
					/>
				</svg>
				<span>Add-ons</span>
			</h1>

			<div class="space-y-3">
				<h3 class="text-gray-600 font-semibold flex space-x-2">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
						/>
					</svg>
					<span> API</span>
				</h3>
				<IntegrationCard
					title="API"
					description="Connect Your UI With Our API to Gain Full Control Over Your Business"
					class="w-2/3"
					:toogleable="false"
					:requires-keys="false"
					route-name="Api"
				>
					<template v-slot:icon>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-8 w-8"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
							/>
						</svg>
					</template>
				</IntegrationCard>
			</div>

			<div class="space-y-3 pb-6">
				<h3 class="text-gray-600 font-semibold flex space-x-2">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z"
						/>
					</svg>
					<span> Integrations</span>

					<span class="text-sm bg-orange-100 text-orange-500 px-2 rounded-full">soon</span>
				</h3>

				<div class="grid grid-cols-3 gap-4 relative p-6s">
					<div class="bg-white bg-opacity-60 absolute top-0 right-0 bottom-0 rounded-lg left-0 z-40"></div>
					<IntegrationCard
						v-for="({ title, description, icon, url, enabled, key, secret, requiresKeys }, index) in integrations"
						:key="index"
						:title="title"
						:description="description"
						:enabled="enabled"
						:url="url"
						:usage-key="key"
						:usage-secret="secret"
						:requires-keys="requiresKeys"
						@change="handleIntegrationUpdate"
					>
						<template v-slot:icon>
							<img
								v-if="icon"
								class="h-full w-full object-fit rounded-full"
								:src="require(`@/assets/images/integrations/${icon}`)"
								:alt="title"
							/>
						</template>
					</IntegrationCard>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import IntegrationCard from '@/components/IntegrationCard.vue';

const integrations = [
	{
		title: 'Google Analytics',
		description: 'Keep track of your users activites on Google Analytics.',
		url: 'https://analytics.google.com/analytics/web/',
		icon: 'google-analytics.png',
		requiresKeys: true,
		key: 'KJHASDGG',
		secret: 'KJGNADGLASDOMWAIKERKQADSM',
	},
	{
		title: 'hotjar',
		description: 'Get heatmap for of your users.',
		url: 'https://www.hotjar.com/',
		icon: 'hotjar.svg',
		requiresKeys: true,
	},
	{
		title: 'Intercom',
		description: 'Provide Chat Support for your users.',
		url: 'https://www.intercom.com/',
		icon: 'intercom.svg',
		requiresKeys: true,
	},
	{
		title: 'Logrocket',
		description: 'Analyize your users experience through session video recording.',
		url: 'https://www.logrocket.com/',
		icon: 'logrocket.svg',
		requiresKeys: true,
	},
	{
		title: 'Crips',
		description: 'Provide Chat Support for your users.',
		url: 'https://crisp.chat/en/',
		icon: 'crisp.svg',
		requiresKeys: true,
	},
	{
		title: 'Slack',
		description: 'Get notified about events in your store.',
		url: 'https://slack.com',
		icon: 'slack.svg',
		requiresKeys: true,
	},
	{
		title: 'Mailchimp',
		description: 'Promote products and offers by email.',
		url: 'https://mailchimp.com/',
		icon: 'mailchimp.png',
		requiresKeys: true,
	},
	{
		title: 'freshworks',
		description: 'Provide Chat Support for your users.',
		url: 'https://freshworks.com/',
		icon: 'freshworks.svg',
		requiresKeys: true,
	},
	{
		title: 'HelpDesk',
		description: 'Provide Chat Support for your users.',
		url: 'https://www.helpdesk.com/',
		icon: 'helpdesk.svg',
		requiresKeys: true,
	},
	{
		title: 'HelpScout',
		description: 'Provide Chat Support for your users.',
		url: 'https://helpscout.com/',
		icon: 'helpscout.svg',
		requiresKeys: true,
	},
	{
		title: 'Zendesk',
		description: 'Build software to meet customer needs.',
		url: 'https://zendesk.com/',
		icon: 'zendesk.svg',
		requiresKeys: true,
	},
	{
		title: 'Chatbot',
		description: 'Provide Chat Support for your users.',
		url: 'https://www.chatbot.com/',
		icon: 'chatbot.svg',
		requiresKeys: true,
	},
];

function handleIntegrationUpdate(value) {
	//
}
</script>
