import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import html from 'highlight.js/lib/languages/vbscript-html';
import xml from 'highlight.js/lib/languages/xml';
import 'highlight.js/styles/github.css';

export function convertToCode(code, language) {
	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('html', html);
	hljs.registerLanguage('xml', xml);

	return hljs.highlight(code, { language }).value;
}

export function custom() {}
