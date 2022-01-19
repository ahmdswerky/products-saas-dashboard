import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import html from 'highlight.js/lib/languages/vbscript-html';
import xml from 'highlight.js/lib/languages/xml';
import json from 'highlight.js/lib/languages/json';
// import 'highlight.js/styles/github.css';
import { computed } from 'vue';
// import { useStore } from 'vuex';
import store from '@/store';

const css = computed(() => {
	const theme = store.getters['config/codeTheme'];
	const darkExt = theme === 'dark' ? '-dark' : '';
	return `highlight.js/styles/github${darkExt}.css`;
});

import('highlight.js/styles/github.css');

export function convertToCode(code, language) {
	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('html', html);
	hljs.registerLanguage('xml', xml);
	hljs.registerLanguage('json', json);

	return hljs.highlight(code, { language }).value;
}

export function custom() {}
