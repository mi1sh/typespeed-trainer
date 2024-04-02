import {TypeInput} from '../TypeArea/TypeArea.styles.js';
import {TextButton} from '../ControlPanel/ControlPanel.styles.js';
import {Form} from './AuthModal.styles.js';
import {auth} from '../../firebase.js';
import {useState} from 'react';
import firebase from 'firebase/compat/app';

export const AuthModal = ({setShowModal, setIsAuthenticated}) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [displayName, setDisplayName] = useState('');
	const [isRegistering, setIsRegistering] = useState(false);


	const handleSubmit = (event) => {
		event.preventDefault();
		if (isRegistering) {
			registerUser(email, password, displayName);
		} else {
			loginUser(email, password);
		}
	};

	const saveUsername = (username, userId) => {
		const userRef = firebase.database().ref('users/' + userId);
		userRef.update({
			username: username
		}).then(() => {
			console.log("Username saved to database:", username);
		}).catch((error) => {
			console.error("Error saving username to database:", error);
		});
	};

	const registerUser = (email, password, displayName) => {
		console.log("Registering user...");
		auth.createUserWithEmailAndPassword(email, password)
			.then((userCredential) => {
				console.log("User registered:", userCredential.user);
				userCredential.user.updateProfile({
					displayName: displayName
				}).then(() => {
					console.log("User profile updated with displayName:", displayName);
					setIsAuthenticated(true);
					setShowModal(false);
					saveUsername(displayName, userCredential.user.uid);
				}).catch((error) => {
					console.error("Error updating user profile:", error);
				});
			})
			.catch((error) => {
				if (error.code === 'auth/email-already-in-use') {
					alert('The email address is already used by another account');
				} else {
					console.error("Error registering user:", error);
				}
			});
	};

	const loginUser = (email, password) => {
		console.log('Logging in user...');
		auth.signInWithEmailAndPassword(email, password)
			.then((userCredential) => {
				console.log('User logged in:', userCredential.user);
				setIsAuthenticated(true);
				setShowModal(false);
			})
			.catch((error) => {
				console.error('Error logging in user:', error);
			});
	};

	return (
		<>
			<Form onSubmit={handleSubmit}>
				{isRegistering && (
					<TypeInput maxLength="35" minLength="2" type="text" placeholder="Enter your username" value={displayName} onChange={(event) => setDisplayName(event.target.value)}  autocomplete="new-password"/>
				)}
				<TypeInput style={{marginTop: '0.8em'}} maxLength="35" minLength="10" type="email" placeholder="Enter your email" value={email} onChange={(event) => setEmail(event.target.value)}/>
				<TypeInput style={{marginTop: '0.8em'}} maxLength="20" minLength="6" type="password" placeholder="Enter your password" value={password} onChange={(event) => setPassword(event.target.value)}/>
				<TextButton type="submit">{isRegistering ? 'Sign Up' : 'Sign In'}</TextButton>
				<TextButton type="button" onClick={() => setIsRegistering(!isRegistering)}>Switch
					to {isRegistering ? 'Sign In' : 'Sign Up'}</TextButton>
			</Form>
		</>
	);
};