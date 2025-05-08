export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}
export interface Environment {
  baseUrl: string;
  production: boolean;
  apiUrl: string;
  firebaseConfig: FirebaseConfig;
}
