const checkSupport = () => {
	if(!('serviceWorker' in navigator)) {
		throw new Error('No Service Worker support!');
	}

	if(!('PushManager' in window)) {
		throw new Error('No Push API support!');
	}
};

const registerServiceWorker = async () => {
	const swRegistration = await navigator.serviceWorker.register('worker.js');

	return swRegistration;
};

const requestNotificationPermission = async () => {
	const permission = await Notification.requestPermission();

	if(permission !== 'granted') {
		throw new Error('Permission not granted for Notification!');
	} else {
		console.log('Notification Permission granted!')
	}
};