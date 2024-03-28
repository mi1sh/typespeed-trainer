import './index.css';
import {useEffect, useRef, useState} from 'react';
import {TypeArea} from './components/TypeArea/TypeArea.jsx';
import {InfoPanel} from './components/Timer/InfoPanel.jsx';
import {ControlPanel} from './components/ControlPanel/ControlPanel.jsx';
import Word from './components/Word/Word.jsx';
import axios from 'axios';
import Footer from './components/Footer/Footer.jsx';
import {
	TextAreaWrapper,
	Wrapper,
	Text,
	Title
} from './App.styles.js';
import SquareLoader from 'react-spinners/SquareLoader';
import PropTypes from 'prop-types';
import {NameModal} from './components/NameModal/NameModal.jsx';

const App = () => {
	const [showModal, setShowModal] = useState(true);
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

	const userName = localStorage.getItem('userName');

	if (navigator.userAgent.indexOf('iPhone') > -1) {
		document
			.querySelector('[name=viewport]')
			.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1');
	}

	const inputRef = useRef();
	const minutes = timeElapsed / 60;

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

	const updateBestRecord = (newRecord) => {
		if (newRecord > bestRecord) {
			setBestRecord(newRecord);
			// cохранение рекорда в localStorage
			localStorage.setItem('bestRecord', newRecord.toString());
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
			<Wrapper>
				<Title>typespeed - test</Title>
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
				<TextAreaWrapper>
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
					<NameModal userName={userName} setShowModal={setShowModal}/>
				) : (
					<>
						<ControlPanel handleRefreshWords={handleRefreshWords} setSelectedWordCount={setSelectedWordCount}/>
						<TypeArea inputRef={inputRef} isInputActive={isInputActive} userInput={userInput} selectedWordCount={selectedWordCount} processInput={processInput} handleRefreshWords={handleRefreshWords}/>
					</>
				)}
				<Footer/>
			</Wrapper>
		</>
	);
};

App.propTypes = {
	selectedWordCount: PropTypes.number
};

export default App;