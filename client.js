
const main = async () => {
  console.log('Checking support...');
  checkSupport();

  console.log('Registering Service Worker...');
  const swRegistration = await registerServiceWorker();
  console.log('Registered Service Worker!');

  console.log('Requesting Notification Permission...');
  const permission = await requestNotificationPermission();

  console.log('Registering push...');
  const publicVapidKey = 'BOjMUvVojL2dVyhTZ1qmkqcZtwVDAlg4EyCboqQT8chu2djD9HfOaO-EKtLGv453LcynpR1amk7dan7kZLXZdJ8';
  const options = { 
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey), 
    userVisibleOnly: true 
  };
  const subscription = await swRegistration.pushManager.subscribe(options);
  console.log('Registered push!');

  console.log('Sending subscription...');
  await fetch('/subscribe', {
    method: 'POST',
    body: JSON.stringify(subscription),
    headers: {
      'content-type': 'application/json'
    }
  });
  console.log('Sent subscription!');
}

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