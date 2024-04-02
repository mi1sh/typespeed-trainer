import {TypeInput} from '../TypeArea/TypeArea.styles.js';
import {TextButton} from '../ControlPanel/ControlPanel.styles.js';
import {Form} from './AuthModal.styles.js';
import {auth} from '../../firebase.js';
import {useState} from 'react';

export const AuthModal = ({setShowModal, setIsAuthenticated}) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isRegistering, setIsRegistering] = useState(false);

	const handleSubmit = (event) => {
		event.preventDefault();
		if (isRegistering) {
			registerUser(email, password);
		} else {
			loginUser(email, password);
		}
	};

	const registerUser = (email, password) => {
		console.log("Registering user...");
		auth.createUserWithEmailAndPassword(email, password)
			.then((userCredential) => {
				console.log("User registered:", userCredential.user);
				setIsAuthenticated(true);
				setShowModal(false);
			})
			.catch((error) => {
				if (error.code === 'auth/email-already-in-use') {
					alert('The email address is already use by another account');
				} else {
					console.error("Error registering user:", error);
				}
			});
	};

	const loginUser = (email, password) => {
		console.log("Logging in user...");
		auth.signInWithEmailAndPassword(email, password)
			.then((userCredential) => {
				console.log("User logged in:", userCredential.user);
				setIsAuthenticated(true);
				setShowModal(false);
			})
			.catch((error) => {
				console.error("Error logging in user:", error);
			});
	};

	return (
		<>
			<Form onSubmit={handleSubmit}>
				<TypeInput maxLength="35" minLength="10" type="email"  placeholder='Enter your email' value={email} onChange={(event) => setEmail(event.target.value)}/>
				<TypeInput style={{marginTop: '0.8em'}} maxLength="20" minLength="6" type="password"  placeholder='Enter your password' value={password} onChange={(event) => setPassword(event.target.value)}/>
				<TextButton type="submit">{isRegistering ? 'Sign Up' : 'Sign In'}</TextButton>
				<TextButton type='button' onClick={() => setIsRegistering(!isRegistering)}>Switch to {isRegistering ? 'Sign In' : 'Sign Up'}</TextButton>
			</Form>
		</>
);
};
