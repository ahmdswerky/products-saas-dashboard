export function ucFirst(string) {
	const parts = string.split('');

	return parts.splice(0, 1)[0].toUpperCase() + parts.join('');
}

export function custom() {}
