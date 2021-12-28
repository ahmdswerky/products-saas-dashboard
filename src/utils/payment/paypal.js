// export function loadScript(callback) {
//	let js;
//	const ref = document.getElementsByTagName('script')[0];
//	const exists = document.getElementById('paypal-js');
//	if (!exists) {
//		js = document.createElement('script');
//		js.id = 'paypal-js';
//		js.async = true;
//		js.src = 'https://www.paypal.com/webapps/merchantboarding/js/lib/lightbox/partner.js';
//		ref.parentNode.insertBefore(js, ref);

//		js.onload = () => callback();
//		// js.onerror = errors => reject(errors, js);
//	} else {
//		callback();
//	}
// }

export function loadScript() {
	return new Promise((resolve, reject) => {
		let js;
		const ref = document.getElementsByTagName('script')[0];
		const exists = document.getElementById('paypal-js');
		if (!exists) {
			js = document.createElement('script');
			js.id = 'paypal-js';
			js.async = true;
			js.src = 'https://www.paypal.com/webapps/merchantboarding/js/lib/lightbox/partner.js';
			ref.parentNode.insertBefore(js, ref);

			js.onload = () => resolve();
			js.onerror = errors => reject(errors, js);
		} else {
			resolve(exists);
		}
	});
}

export function custom() {}
