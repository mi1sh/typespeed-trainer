import './App.css';
import {useEffect, useRef, useState} from 'react';

import styled from 'styled-components';
import Word from './components/Word.jsx';
import {MemoizedTimer} from './components/Timer.jsx';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Footer from './components/Footer.jsx';

const TextAreaWrapper = styled.div`
	width: auto;
	min-width: 25vw;
	max-width: 800px;
	height: auto;
	min-height: 8vh;
	border: 4px solid rgb(35, 83, 71);
	border-radius: 10px;
	padding: 10px;
	margin-bottom: 25px;
`;

const Text = styled.p`
	height: 100%;
	width: 100%;
	overflow: hidden;
	font-size: calc(12px + 1vh);
	font-family: "Hack", serif;
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

const App = () => {
	const [randomWords, setRandomWords] = useState([]);
	const [userInput, setUserInput] = useState('');
	const [startCounting, setStartCounting] = useState(false);
	const [activeWordIndex, setActiveWordIndex] = useState(0);
	const [correctWordsArray, setCorrectWordsArray] = useState([]);
	const [isInputActive, setIsInputActive] = useState(true);

	const inputRef = useRef();

	useEffect(() => {
		const fetchRandomWords = async () => {
			try {
				const response = await axios.get('https://random-word-api.vercel.app/api?words=45');
				const wordsArray = response.data;
				setRandomWords(wordsArray);
			} catch (error) {
				console.error('Error fetching random words: ', error);
			}
		};

		fetchRandomWords();
	}, []);

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
				setUserInput('Completed');
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

	const handleChangeMode = () => {
		const inputType = inputRef.current.type;
		inputRef.current.type = inputType === 'text' ? 'password' : 'text';
	};

	return (
		<>
			<h1 className="title">typespeed - test</h1>
			<MemoizedTimer
				startCounting={startCounting}
				correctWordsArray={correctWordsArray}
				setUserInput={setUserInput}
				setIsInputActive={setIsInputActive}
			/>
			<TextAreaWrapper>
				<Text>
					{randomWords.map((word, index) => {
						return <Word
							key={index}
							text={word}
							active={index === activeWordIndex}
							correct={correctWordsArray[index]}
						/>;
					})}
				</Text>
			</TextAreaWrapper>
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
