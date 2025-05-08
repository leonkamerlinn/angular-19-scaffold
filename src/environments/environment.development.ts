import { Environment } from '@environments/environment.interface';

export const environment: Environment = {
  baseUrl: 'http://localhost:4200',
  production: false,
  apiUrl: '',
  firebaseConfig: {
    apiKey: 'AIzaSyAZGpJbmtzJm7Kps1QkDCE-c-wMrzxz-3s',
    authDomain: 'crypto-98352.firebaseapp.com',
    databaseURL: 'https://crypto-98352-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'crypto-98352',
    storageBucket: 'crypto-98352.appspot.com',
    messagingSenderId: '1069215389165',
    appId: '1:1069215389165:web:e7d868884754793d9b43e4',
    measurementId: 'G-4LQCR9KM2R',
  },
};
