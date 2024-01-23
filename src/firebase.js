import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { firebaseConfig } from './constant/firebaseConfig.js';

const app = initializeApp(firebaseConfig);
const messaging = getMessaging();

export const requestForToken = async () => {
    try {
        const currentToken = await getToken(messaging, { vapidKey: 'BIhrwto18-5m6W6OJqg93h4wBJ9_RpwXSj6wQQoxBMq2umJqo0fXfmrH0YL4oYurahFgOSi6cnjdsHZHiIyjxTM' });
        console.log('current token for client:', currentToken || 'No registration token available.');
        localStorage.setItem('fcm_token', currentToken);
    } catch (err) {
        console.log('An error occurred while retrieving token:', err);
    }
};

export const onMessageListener = () =>
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            console.log("payload", payload)
            resolve(payload);
        });
    });