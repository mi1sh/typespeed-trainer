import './App.css';
import {useEffect, useRef, useState} from 'react';
import Word from './components/Word/Word.jsx';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowsRotate, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Footer from './components/Footer/Footer.jsx';
import Timer from './components/Timer/Timer.jsx';
import {
	ButtonWrapper,
	InfoPanelWrapper,
	TextAreaWrapper,
	TextButton,
	TypeArea,
	Wrapper,
	Text,
	Title, BlindMode
} from './App.styles.js';
import SquareLoader from 'react-spinners/SquareLoader';

const App = () => {
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

	if(navigator.userAgent.indexOf('iPhone') > -1 )
	{
		document
			.querySelector("[name=viewport]")
			.setAttribute("content","width=device-width, initial-scale=1, maximum-scale=1");
	}

	const inputRef = useRef();
	const minutes = timeElapsed / 60;

	useEffect(() => {
		fetchRandomWords();
	}, [selectedWordCount]);

	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key === 'r' || e.key === 'R') {
				if (document.activeElement !== inputRef.current) {
					handleRefreshWords();
				}
			}
		};

		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, []);

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

	const handleWordCountChange = (count) => {
		setSelectedWordCount(count);
		localStorage.setItem('selectedWordCount', count.toString());
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
		// загрузка рекорда из localStorage
		const savedBestRecord = localStorage.getItem('bestRecord');
		setBestRecord(savedBestRecord ? parseFloat(savedBestRecord) : 0);
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
			<Wrapper>
				<Title>typespeed - test</Title>
				<Timer
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
				<InfoPanelWrapper>
					<ButtonWrapper>
						<TextButton className={selectedWordCount === 50 ? 'activeBtn' : ''}
									onClick={() => handleWordCountChange(50)}>50</TextButton>
						<TextButton className={selectedWordCount === 100 ? 'activeBtn' : ''}
									onClick={() => handleWordCountChange(100)}>100</TextButton>
						<TextButton className={selectedWordCount === 150 ? 'activeBtn' : ''}
									onClick={() => handleWordCountChange(150)}>150</TextButton>
					</ButtonWrapper>
					<ButtonWrapper>
						<TextButton className={'refreshBtn'} onClick={() => handleRefreshWords()}><FontAwesomeIcon
							style={{paddingRight: '3px', marginLeft: '-3px'}} icon={faArrowsRotate}/>Refresh<span
							style={{
								fontSize: '0.7em',
								position: 'absolute',
								padding: '0.4em 0em 0em 0.15em'
							}}>(R)</span></TextButton>
					</ButtonWrapper>
					<ButtonWrapper>
						<p style={{color: '#377c6d', float: 'right', paddingRight: '3em', fontSize: '0.8em'}}>Best
							record: {bestRecord} WPM</p>
					</ButtonWrapper>
				</InfoPanelWrapper>
				<TypeArea
					type="text"
					ref={inputRef}
					disabled={!isInputActive}
					value={userInput}
					onChange={(e) => proceesInput(e.target.value)}
				/>
				<BlindMode selectedWordCount={selectedWordCount}>
					<input id="checkbox" onChange={handleChangeMode} type="checkbox"/>
					<FontAwesomeIcon style={{fontSize: '12px', margin: '2.7px 2.5px 0px 0px'}} icon={faEyeSlash}/> Blind
					mode
				</BlindMode>
				<Footer/>
			</Wrapper>
		</>
	);
};

export default App;