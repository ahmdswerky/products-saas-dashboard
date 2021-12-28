import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import '@/plugins';
import 'tailwindcss/tailwind.css';
import '@/assets/style/main.scss';

createApp(App).use(store).use(router).mount('#app');
