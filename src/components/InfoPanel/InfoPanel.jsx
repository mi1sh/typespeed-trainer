import React, {useEffect} from 'react';
import {InfoWrapper} from './InfoPanel.styles.js';
import PropTypes from 'prop-types';

export const InfoPanel = ({startCounting, correctWordsArray, setUserInput, setIsInputActive, timeElapsed, setTimeElapsed, setStartCounting, calculateSpeed, updateBestRecord}) => {

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
		<InfoWrapper>
			<p className={'counter'}>(Timer: {timeElapsed}</p>
			<p className={'counter'}>Speed: {calculateSpeed()} WPM</p>
			<p className={'counter'}>Accuracy: {calculateAccuracy()}%)</p>
		</InfoWrapper>
	);
}

InfoPanel.propTypes = {
	startCounting: PropTypes.bool,
	correctWordsArray: PropTypes.array,
	timeElapsed: PropTypes.number,
	setUserInput: PropTypes.func,
	setIsInputActive: PropTypes.func,
	setTimeElapsed: PropTypes.func,
	setStartCounting: PropTypes.func,
	calculateSpeed: PropTypes.func,
	updateBestRecord: PropTypes.func
}