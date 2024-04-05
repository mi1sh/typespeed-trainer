import {TypeInput} from '../TypeArea/TypeArea.styles.js';
import {TextButton} from '../ControlPanel/ControlPanel.styles.js';
import {Form} from './AuthModal.styles.js';
import {auth} from '../../firebase.js';
import {useState} from 'react';
import firebase from 'firebase/compat/app';
import {Bounce, toast} from 'react-toastify';

export const AuthModal = ({setShowModal, setIsAuthenticated, updateBestRecord, bestAuthRecord, displayName, setDisplayName, updateDisplayName}) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isRegistering, setIsRegistering] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const handleSubmit = (event) => {
		event.preventDefault();
		if (!isValidEmail(email)) {
			setErrorMessage('Please enter a valid email address.');
			return;
		} else {
			setErrorMessage('');
		}
		if (isRegistering) {
			registerUser(email, password, displayName);
		} else {
			loginUser(email, password);
		}
	};

	const registerUser = (email, password, displayName) => {
		console.log("Registering user...");
		auth.createUserWithEmailAndPassword(email, password)
			.then((userCredential) => {
				updateDisplayName(displayName);
				userCredential.user.updateProfile({
					displayName: displayName
				}).then(() => {
					saveUsername(displayName, userCredential.user.uid);
					toast.success(`User registered: ${userCredential.user.displayName}`, {
						position: "top-center",
						autoClose: 2500,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: "colored",
						transition: Bounce,
						className: "toastSuccess",
					});
					console.log("User profile updated with displayName:", displayName);
					updateBestRecord(0);
					setIsAuthenticated(true);
					setShowModal(false);
				}).catch((error) => {
					console.error("Error updating user profile:", error);
				});
			})
			.catch((error) => {
				if (error.code === 'auth/email-already-in-use') {
					toast.error('The email address is already used by another account', {
						position: "top-center",
						autoClose: 3000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: "colored",
						transition: Bounce,
						className: "toastError",
					});
				} else {
					console.error("Error registering user:", error);
				}
			});
	};

	const loginUser = (email, password) => {
		console.log('Logging in user...');
		auth.signInWithEmailAndPassword(email, password)
			.then((userCredential) => {
				updateDisplayName(userCredential.user.displayName);
				setDisplayName(userCredential.user.displayName);
				updateBestRecord(parseFloat(bestAuthRecord));
				toast.success(`User logged in: ${userCredential.user.displayName}`, {
					position: "top-center",
					autoClose: 2500,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "colored",
					transition: Bounce,
					className: "toastSuccess",
				});
				setIsAuthenticated(true);
				setShowModal(false);
			})
			.catch((error) => {
				if (error.code === 'auth/invalid-credential') {
					toast.error('The email or password incorrect, please check and try again', {
						position: "top-center",
						autoClose: 3000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: "colored",
						transition: Bounce,
						className: "toastError",
					});
				}
				console.error('Error logging in user:', error);
			});
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

	const isValidEmail = (email) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	return (
		<>
			{errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
			<Form onSubmit={handleSubmit}>
				{isRegistering && (
					<TypeInput maxLength="35" minLength="2" type="text" placeholder="Enter your username" value={displayName} onChange={(event) => setDisplayName(event.target.value)} autoComplete="new-password"/>
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