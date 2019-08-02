self.addEventListener('activate', async () => {
	console.log('Service Worker activated!');

	// try {
	// 	console.log('Registering push...');
	// 	const publicVapidKey = 'BOjMUvVojL2dVyhTZ1qmkqcZtwVDAlg4EyCboqQT8chu2djD9HfOaO-EKtLGv453LcynpR1amk7dan7kZLXZdJ8';
	// 	const options = { 
	// 		applicationServerKey: urlBase64ToUint8Array(publicVapidKey), 
	// 		userVisibleOnly: true 
	// 	};
	// 	const subscription = await self.registration.pushManager.subscribe(options);
	// 	console.log('Registered push!');

	// 	console.log('Sending subscription...');
	//   await fetch('/subscribe', {
	//     method: 'POST',
	//     body: JSON.stringify(subscription),
	//     headers: {
	//       'content-type': 'application/json'
	//     }
	//   });
	//   console.log('Sent subscription!');
	// } catch(err) {
	// 	console.error(err);
	// }
})

self.addEventListener('push', ev => {
  const data = ev.data.json();
  console.log('Got push', data);
  self.registration.showNotification(data.title, {
    body: data.content,
    icon: 'https://media.licdn.com/dms/image/C4D0BAQHrslYgB2_VFg/company-logo_200_200/0?e=2159024400&v=beta&t=9ZPXVTuL0vDPC68QsbqCheY2EYvG0K2rtvCzqhRIwi4'
  });
});

// Boilerplate borrowed from https://www.npmjs.com/package/web-push#using-vapid-key-for-applicationserverkey
const urlBase64ToUint8Array = (base64String) => {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}