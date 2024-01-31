import './App.css';
import {useRef, useState} from 'react';

import styled from 'styled-components';
import Word from './components/Word.jsx';
import Timer from './components/Timer.jsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons'

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

const getCloud = () => `
fish second life heart love girlfriend massive react development production movement application about a side of the universe adopt console grand mom hear speak useless alone big first time change i feel falling fall us we you me they our homeless work study education lesson house country politics president society them ministry project javascript typescript refactoring format place spot silk property practice
`.split(' ').sort(() => Math.random() > 0.5 ? 1 : -1);


const App = () => {
	const [userInput, setUserInput] = useState('');
	const cloud = useRef(getCloud());
	const [startCounting, setStartCounting] = useState(false);
	const [activeWordIndex, setActiveWordIndex] = useState(0);
	const [correctWordsArray, setCorrectWordsArray] = useState([]);
	const [isInputActive, setIsInputActive] = useState(true);

	const inputRef = useRef();

	const proceesInput = (value) => {
		if (activeWordIndex === cloud.current.length) {
			// стоп
			return;
		}

		if (!startCounting) {
			setStartCounting(true);
		}

		if (value.endsWith(' ')) {

			if (activeWordIndex === cloud.current.length - 1) {
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
				newResult[activeWordIndex] = word === cloud.current[activeWordIndex];
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
			<Timer
				startCounting={startCounting}
				correctWordsArray={correctWordsArray}
				setUserInput={setUserInput}
				setIsInputActive={setIsInputActive}
			/>
			<TextAreaWrapper>
				<Text>
					{cloud.current.map((word, index) => {
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
				<input id='checkbox' onChange={handleChangeMode} type="checkbox"/>
				<FontAwesomeIcon style={{fontSize: '12px', margin: '2.7px 2.5px 0px 0px'}} icon={faEyeSlash} /> Blind mode
			</label>
		</>
	);
};

export default App;
