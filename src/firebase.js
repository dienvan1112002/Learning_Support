import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { firebaseConfig } from './constant/firebaseConfig.js';

const app = initializeApp(firebaseConfig);
const messaging = getMessaging();

export const requestForToken = async () => {
    try {
        const currentToken = await getToken(messaging, { vapidKey: 'BDrFWvK5_HYBNNEXVNYuwNkvwH6e7rakjgeHrE2gqBsI3aPjt9GJfmCKmFI09Xx6hLv5zji9rjPa-gbIXBFZ7YQ' });
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