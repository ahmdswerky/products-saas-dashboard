export function custom() {
	return 'custom';
}

export function currencyFormat(value, currency) {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency,
		minimumFractionDigits: 0,
	}).format(value);
}
