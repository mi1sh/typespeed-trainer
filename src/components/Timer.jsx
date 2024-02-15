import React, {useEffect, useState} from 'react';
import styled from 'styled-components';

const TimerWrapper = styled.div`
	justify-content: center;
	margin-bottom: 2vh;
`;

function Timer(props) {
	const {startCounting, correctWordsArray, setUserInput, setIsInputActive} = props;
	const [timeElapsed, setTimeElapsed] = useState(0);

	useEffect(() => {
		let timerId;

		if (startCounting && timeElapsed < 60) { 
			timerId = setInterval(() => {
				setTimeElapsed(oldTime => oldTime + 1);
			}, 1000);
		} else if (timeElapsed >= 60) {
			setIsInputActive(false);
			setUserInput('Time is over');
		}
		return () => clearInterval(timerId);

	}, [startCounting, timeElapsed, setUserInput, setIsInputActive]);

	const minutes = timeElapsed / 60;

		const calculateAccuracy = () => {
		if (correctWordsArray.length === 0) {
			return '0.00'
		}
		const accuracyPercentage = (correctWordsArray.filter(Boolean).length / correctWordsArray.length) * 100;
		return accuracyPercentage.toFixed(2);
	};

	return (
		<TimerWrapper>
			<p className={'counter'}>(Timer: {timeElapsed}</p>
			<p className={'counter'}>Speed: {((correctWordsArray.filter(Boolean).length / minutes) || 0).toFixed(1)} WPM</p>
			<p className={'counter'}>Accuracy: {calculateAccuracy()}%)</p>
		</TimerWrapper>
	);
}

export const MemoizedTimer = React.memo(Timer);