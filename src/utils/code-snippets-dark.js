import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import html from 'highlight.js/lib/languages/vbscript-html';
import xml from 'highlight.js/lib/languages/xml';
import json from 'highlight.js/lib/languages/json';
import http from 'highlight.js/lib/languages/http';
import 'highlight.js/styles/github-dark.css';

export function convertToDarkCode(code, language) {
	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('html', html);
	hljs.registerLanguage('xml', xml);
	hljs.registerLanguage('json', json);
	hljs.registerLanguage('http', http);

	return hljs.highlight(code, { language }).value;
}

export function custom() {}
