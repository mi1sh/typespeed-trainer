import './index.css';
import {TWallpaper} from '@twallpaper/react';
import {useEffect, useRef, useState} from 'react';
import {TypeArea} from './components/TypeArea/TypeArea.jsx';
import {InfoPanel} from './components/InfoPanel/InfoPanel.jsx';
import {ControlPanel} from './components/ControlPanel/ControlPanel.jsx';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Word from './components/Word/Word.jsx';
import axios from 'axios';
import Footer from './components/Footer/Footer.jsx';
import {
	TextAreaWrapper,
	Wrapper,
	Text,
	Title, FooterModalButton
} from './App.styles.js';
import SquareLoader from 'react-spinners/SquareLoader';
import PropTypes from 'prop-types';
import {AuthModal} from './components/AuthModal/AuthModal.jsx';
import {RatingTable} from './components/RatingTable/RatingTable.jsx';
import {FooterAppWrapper, FooterWrapper} from './components/Footer/Footer.styles.js';
import {TextButton} from './components/ControlPanel/ControlPanel.styles.js';
import {auth} from './firebase.js';
import firebase from 'firebase/compat/app';

const App = () => {
	const [bestAuthRecord, setBestAuthRecord] = useState(0);
	const [displayName, setDisplayName] = useState('');
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [randomWords, setRandomWords] = useState([]);
	const [userInput, setUserInput] = useState('');
	const [startCounting, setStartCounting] = useState(false);
	const [activeWordIndex, setActiveWordIndex] = useState(0);
	const [correctWordsArray, setCorrectWordsArray] = useState([]);
	const [isInputActive, setIsInputActive] = useState(true);
	const [timeElapsed, setTimeElapsed] = useState(0);
	const [selectedWordCount, setSelectedWordCount] = useState(() => {
		const savedSelectedWordCount = localStorage.getItem('selectedWordCount');
		return savedSelectedWordCount ? parseFloat(savedSelectedWordCount) : 50;
	});
	const [bestRecord, setBestRecord] = useState(() => {
		const savedBestRecord = localStorage.getItem('bestRecord');
		return savedBestRecord ? parseFloat(savedBestRecord) : 0;
	});

	const updateDisplayName = (newDisplayName) => {
		setDisplayName(newDisplayName);
	};

	if (navigator.userAgent.indexOf('iPhone') > -1) {
		document
			.querySelector('[name=viewport]')
			.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1');
	}

	const inputRef = useRef();
	const minutes = timeElapsed / 60;

	useEffect(() => {
		if (isAuthenticated) {
			auth.onAuthStateChanged(user => {
				const userRef = firebase.database().ref('users/' + user.uid);
				userRef.once('value').then(snapshot => {
					const userData = snapshot.val();
					if (userData && userData.bestRecord) {
						setBestAuthRecord(parseFloat(userData.bestRecord));
					}
				});
			})
		}
	}, [bestAuthRecord, isAuthenticated]);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(user => {
			if (user) {
				setDisplayName(user.displayName);
			} else {
				setDisplayName('');
			}
			console.log('Auth state changed:', user ? 'Authenticated' : 'Not authenticated');
			setIsAuthenticated(!!user);
		});

		return () => unsubscribe();
	}, []);

	useEffect(() => {
		fetchRandomWords();
	}, [selectedWordCount]);

	const fetchRandomWords = async () => {
		setIsLoading(true);
		try {
			const response = await axios.get(`https://random-word-form.herokuapp.com/random/noun/?count=${selectedWordCount}`);
			const wordsArray = response.data;
			setRandomWords(wordsArray);
		} catch (error) {
			console.error('Error fetching random words: ', error);
		} finally {
			setIsLoading(false);
		}
	};

	const calculateSpeed = () => {
		return ((correctWordsArray.filter(Boolean).length / minutes) || 0).toFixed(1);
	};

	const saveBestRecord = (newRecord) => {
		const userId = auth.currentUser.uid;
		const userRef = firebase.database().ref('users/' + userId);
		userRef.update({
			bestRecord: newRecord
		}).then(() => {
			console.log('Record saved:', newRecord);
		}).catch((error) => {
			console.error('Error saving best record:', error);
		});
	};

	const updateBestRecord = (newRecord) => {
		if (isAuthenticated) {
			if (newRecord > bestAuthRecord) {
				setBestAuthRecord(newRecord);
				saveBestRecord(newRecord);
			} else {
				console.log('Record error:', newRecord);
			}
		} else {
			if (newRecord > bestRecord) {
				setBestRecord(newRecord);
				localStorage.setItem('bestRecord', newRecord.toString());
			}
		}
	};

	const handleRefreshWords = () => {
		fetchRandomWords();
		setStartCounting(false);
		setIsInputActive(true);
		setActiveWordIndex(0);
		setUserInput('');
		setTimeElapsed(0);
		setCorrectWordsArray([]);
		// загрузка рекорда из localStorage
		const savedBestRecord = localStorage.getItem('bestRecord');
		setBestRecord(savedBestRecord ? parseFloat(savedBestRecord) : 0);
	};

	const signOut = () => {
		auth.signOut().then(() => {
			console.log('User signed out');
			setIsAuthenticated(false);
		}).catch((error) => {
			console.error('Error logging out user:', error);
		});
	};

	const processInput = (value) => {
		if (activeWordIndex === randomWords.length) {
			// стоп
			return;
		}

		if (!startCounting) {
			setStartCounting(true);
		}

		if (value.endsWith(' ')) {
			if (activeWordIndex === randomWords.length - 1) {
				setStartCounting(false);
				setIsInputActive(false);
				setUserInput('Completed');
				const speed = calculateSpeed();
				updateBestRecord(speed);
			} else {
				setUserInput('');
			}
			// юзер закончил слово
			setActiveWordIndex(index => index + 1);

			setCorrectWordsArray(data => {
				// правильное слово
				const word = value.trim();
				const newResult = [...data];
				newResult[activeWordIndex] = word === randomWords[activeWordIndex];
				return newResult;
			});
		} else {
			setUserInput(value);
		}
	};

	return (
		<>
			<TWallpaper options={{
				colors: [
					'#272f2f',
					'#2c3d38',
					'#272f2f',
					'#283835'
				],
				fps: 13,
				tails: 80
			}}/>
			<ToastContainer
				position="top-center"
				autoClose={2500}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="colored"
				transition: Bounce
			/>
			<Wrapper>
				<Title selectedWordCount={selectedWordCount}>typespeed - test</Title>
				<InfoPanel
					startCounting={startCounting}
					correctWordsArray={correctWordsArray}
					setUserInput={setUserInput}
					setIsInputActive={setIsInputActive}
					timeElapsed={timeElapsed}
					setTimeElapsed={setTimeElapsed}
					setStartCounting={setStartCounting}
					calculateSpeed={calculateSpeed}
					updateBestRecord={updateBestRecord}
				/>
				<TextAreaWrapper selectedWordCount={selectedWordCount}>
					{isLoading ? <SquareLoader
							className={'loader'}
							color="#377c6d"
							loading
							speedMultiplier={1}
							size={50}
						/> :
						<Text selectedWordCount={selectedWordCount}>
							{randomWords.map((word, index) => {
								const wordKey = `word-${index}-${word}`;
								return <Word
									key={wordKey}
									text={word}
									active={index === activeWordIndex}
									correct={correctWordsArray[index]}
								/>;
							})}
						</Text>}
				</TextAreaWrapper>
				{showModal ? (
					<AuthModal updateDisplayName={updateDisplayName} bestAuthRecord={bestAuthRecord} updateBestRecord={updateBestRecord} displayName={displayName} setDisplayName={setDisplayName} setIsAuthenticated={setIsAuthenticated} setShowModal={setShowModal} isAuthenticated={isAuthenticated}/>
				) : (
					<>
						<ControlPanel setBestAuthRecord={setBestAuthRecord} bestAuthRecord={bestAuthRecord} isAuthenticated={isAuthenticated} handleRefreshWords={handleRefreshWords} setSelectedWordCount={setSelectedWordCount} bestRecord={bestRecord} selectedWordCount={selectedWordCount}/>
						<TypeArea displayName={displayName} inputRef={inputRef} isInputActive={isInputActive} userInput={userInput} selectedWordCount={selectedWordCount} processInput={processInput} handleRefreshWords={handleRefreshWords}/>
						<RatingTable bestAuthRecord={bestAuthRecord}/>
					</>
				)}
				<FooterAppWrapper>
					{showModal ? (
						<FooterModalButton>
							<TextButton className='footerTextButton' onClick={() => setShowModal(false)}>Home</TextButton>
						</FooterModalButton>
					) : !isAuthenticated && (
						<FooterModalButton>
							<TextButton className='footerTextButton' onClick={() => setShowModal(true)}>SignUp | SignIn</TextButton>
						</FooterModalButton>
					)}
					{isAuthenticated && (
						<FooterModalButton>
							<TextButton className='footerTextButton' onClick={signOut}>Sign Out</TextButton>
						</FooterModalButton>
					)}
					<Footer/>
				</FooterAppWrapper>
			</Wrapper>
		</>
	);
};

App.propTypes = {
	selectedWordCount: PropTypes.number
};

export default App;