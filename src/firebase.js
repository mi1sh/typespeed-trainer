import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

const firebaseConfig = {
	apiKey: 'AIzaSyD7dLW2J5CI2e4Axt2MQqCHhBLsIl8Q1JQ',
	authDomain: 'typespeed-db.firebaseapp.com',
	databaseURL: 'https://typespeed-db-default-rtdb.europe-west1.firebasedatabase.app',
	projectId: 'typespeed-db',
	storageBucket: 'typespeed-db.appspot.com',
	messagingSenderId: '641169605130',
	appId: '1:641169605130:web:4c9c7a505afb7c1ed955f3',
	measurementId: 'G-SQJ1J1RDM0'
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const db = firebase.database();
export { auth, db };

