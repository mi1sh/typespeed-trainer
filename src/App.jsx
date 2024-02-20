import './App.css';
import {useEffect, useRef, useState} from 'react';

import styled from 'styled-components';
import Word from './components/Word.jsx';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowsRotate, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Footer from './components/Footer.jsx';
import Timer from './components/Timer.jsx';

const TextAreaWrapper = styled.div`
	width: auto;
	min-width: 25vw;
	max-width: 800px;
	max-height: 50vh;
	min-height: 8vh;
	height: auto;
	border: 4px solid rgb(35, 83, 71);
	border-radius: 10px;
	padding: 10px;
	margin-bottom: 0.4em;
	word-wrap: break-word;
`;

const Text = styled.p`
	overflow: hidden;
	font-family: "Hack", serif;
	max-font-size: 1.5em;
	min-width: 25vw;
	max-width: 800px;
	max-height: 50vh;
	min-height: 8vh;
	word-wrap: break-word;
	font-size: 1.2em;
`;


const TypeArea = styled.input`
	margin-top: 1vh;
	border: 2px solid #235347FF;
	border-radius: 4px;
	min-width: 160px;
	width: 15vw;
	height: 20px;
	text-align: center;
`;

const ButtonWrapper = styled.div`
	margin-bottom: 2em;
	text-align: left;
`;

const TextButton = styled.button`
	background: none !important;
	border: none;
	font-size: 1em;
	color: #377c6d;
	cursor: pointer;
	padding: 0px 0px 0px 10px;
	margin-left: 10px;

	&:hover {
		color: #235347;
	}

	&.activeBtn {
		text-decoration: underline;
		color: #235347;
	}

	&.refreshBtn {
		margin-left: 12.2vw;
	}
`;


const App = () => {
	const [randomWords, setRandomWords] = useState([]);
	const [userInput, setUserInput] = useState('');
	const [startCounting, setStartCounting] = useState(false);
	const [activeWordIndex, setActiveWordIndex] = useState(0);
	const [correctWordsArray, setCorrectWordsArray] = useState([]);
	const [isInputActive, setIsInputActive] = useState(true);
	const [timeElapsed, setTimeElapsed] = useState(0);
	const [selectedWordCount, setSelectedWordCount] = useState(50);
	const [bestRecord, setBestRecord] = useState(0);

	const inputRef = useRef();
	const minutes = timeElapsed / 60;

	const fetchRandomWords = async () => {
		try {
			const response = await axios.get(`https://random-word-form.herokuapp.com/random/noun/?count=${selectedWordCount}`);
			const wordsArray = response.data;
			setRandomWords(wordsArray);
		} catch (error) {
			console.error('Error fetching random words: ', error);
		}
	};

	useEffect(() => {
		fetchRandomWords();
	}, [selectedWordCount]); // запрос отправляется при изменении выбранного количества слов

	const calculateSpeed = () => {
		return ((correctWordsArray.filter(Boolean).length / minutes) || 0).toFixed(1);
	};

	const updateBestRecord = (newRecord) => {
		if (newRecord > bestRecord) {
			setBestRecord(newRecord);
		}
	};

	const handleWordCountChange = (count) => {
		setSelectedWordCount(count);
	};

	const handleChangeMode = () => {
		const inputType = inputRef.current.type;
		inputRef.current.type = inputType === 'text' ? 'password' : 'text';
	};

	const handleRefreshWords = () => {
		fetchRandomWords();
		setStartCounting(false);
		setIsInputActive(true);
		setActiveWordIndex(0);
		setUserInput('');
		setTimeElapsed(0);
		setCorrectWordsArray([]);
		setBestRecord(0);
	};

	const proceesInput = (value) => {
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
			<h1 className="title">typespeed - test</h1>
			<Timer
				startCounting={startCounting}
				correctWordsArray={correctWordsArray}
				setUserInput={setUserInput}
				setIsInputActive={setIsInputActive}
				timeElapsed={timeElapsed}
				setTimeElapsed={setTimeElapsed}
				setStartCounting={setStartCounting}
				calculateSpeed={calculateSpeed}
			/>
			<TextAreaWrapper>
				<Text>
					{randomWords.map((word, index) => {
						const wordKey = `word-${index}-${word}`
						return <Word
							key={wordKey}
							text={word}
							active={index === activeWordIndex}
							correct={correctWordsArray[index]}
						/>;
					})}
				</Text>
			</TextAreaWrapper>
			<ButtonWrapper>
				<TextButton className={selectedWordCount === 50 ? 'activeBtn' : ''}
							onClick={() => handleWordCountChange(50)}>50</TextButton>
				<TextButton className={selectedWordCount === 100 ? 'activeBtn' : ''}
							onClick={() => handleWordCountChange(100)}>100</TextButton>
				<TextButton className={selectedWordCount === 150 ? 'activeBtn' : ''}
							onClick={() => handleWordCountChange(150)}>150</TextButton>
				<TextButton className={'refreshBtn'} onClick={() => handleRefreshWords()}><FontAwesomeIcon
					style={{paddingRight: '3px', marginLeft: '-3px'}} icon={faArrowsRotate}/>Refresh</TextButton>
				<p style={{color: '#377c6d', float: 'right', paddingRight: '3em'}}>Best record: {bestRecord} WPM</p>
			</ButtonWrapper>
			<TypeArea
				type="text"
				ref={inputRef}
				disabled={!isInputActive}
				value={userInput}
				onChange={(e) => proceesInput(e.target.value)}
			/>
			<label style={{display: 'flex', justifyContent: 'center', fontSize: '80%', margin: '8px'}}>
				<input id="checkbox" onChange={handleChangeMode} type="checkbox"/>
				<FontAwesomeIcon style={{fontSize: '12px', margin: '2.7px 2.5px 0px 0px'}} icon={faEyeSlash}/> Blind
				mode
			</label>
			<Footer/>
		</>
	);
};

export default App;