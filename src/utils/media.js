export function imageToUrl(file) {
	const url = URL.createObjectURL(file);

	return url;
}

export function custom() {
	return 'custom';
}
