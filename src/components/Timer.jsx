import React, {useEffect, useState} from 'react';
import styled from 'styled-components';

const TimerWrapper = styled.div`
	justify-content: center;
	margin-bottom: 2vh;
`;

const Timer = (props) => {
	let {startCounting, correctWordsArray, setUserInput, setIsInputActive, timeElapsed, setTimeElapsed, setStartCounting, calculateSpeed, updateBestRecord} = props;

	useEffect(() => {
		let timerId;

		if (startCounting && timeElapsed < 60) {
			timerId = setInterval(() => {
				setTimeElapsed(oldTime => oldTime + 1);
			}, 1000);
		} else if (timeElapsed >= 60) {
			setStartCounting(false);
			setIsInputActive(false);
			setUserInput('Time is over');
			const speed = calculateSpeed();
			updateBestRecord(speed);
		}
		return () => clearInterval(timerId);

	}, [startCounting, timeElapsed, setUserInput, setIsInputActive]);

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
			<p className={'counter'}>Speed: {calculateSpeed()} WPM</p>
			<p className={'counter'}>Accuracy: {calculateAccuracy()}%)</p>
		</TimerWrapper>
	);
}

export default Timer;