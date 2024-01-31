import {useEffect, useState} from 'react';
import styled from 'styled-components';

const TimerWrapper = styled.div`
	justify-content: center;
	margin-bottom: 2vh;
`;

function Timer(props) {
	const {startCounting, correctWords, setUserInput, setIsInputActive} = props;
	const [timeElapsed, setTimeElapsed] = useState(0);

	useEffect(() => {
		let timerId;

		if (startCounting && timeElapsed < 60) {
			timerId = setInterval(() => {
				setTimeElapsed(oldTime => oldTime + 1);
			}, 1000);
		} else if (timeElapsed === 60) {
			setIsInputActive(false);
			setUserInput('Time is over');
		}
		return () => clearInterval(timerId);

	}, [startCounting, timeElapsed]);
	const minutes = timeElapsed / 60;

	return (
		<TimerWrapper>
			<p className={'counter'}>(Timer: {timeElapsed}</p>
			<p className={'counter'}>Speed: {((correctWords / minutes) || 0).toFixed(1)} WPM)</p>
		</TimerWrapper>
	);
};

export default Timer;