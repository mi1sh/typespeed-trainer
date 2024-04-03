import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import {BlindMode, TypeInput} from './TypeArea.styles.js';
import PropTypes from 'prop-types';
import {useEffect} from 'react';
import firebase from 'firebase/compat/app';

export const TypeArea = ({inputRef, isInputActive, userInput, selectedWordCount, processInput, handleRefreshWords, displayName}) => {

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
	const handleChangeMode = () => {
		const inputType = inputRef.current.type;
		inputRef.current.type = inputType === 'text' ? 'password' : 'text';
	};

	return (
		<>
			{displayName && (
				<span style={{color: '#235347', fontSize: '0.7em'}}>{displayName}</span>
			)}
			<TypeInput
				type="text"
				ref={inputRef}
				disabled={!isInputActive}
				value={userInput}
				onChange={(e) => processInput(e.target.value)}
				autocomplete="new-password"
			/>
			<BlindMode selectedWordCount={selectedWordCount}>
				<input id="checkbox" onChange={handleChangeMode} type="checkbox"/>
				<FontAwesomeIcon style={{fontSize: '12px', margin: '2px 5px 0px 0px'}} icon={faEyeSlash}/> Blind
				mode
			</BlindMode>
		</>
	);
};

TypeArea.propTypes = {
	userInput: PropTypes.string,
	isInputActive: PropTypes.bool,
	selectedWordCount: PropTypes.number,
	inputRef: PropTypes.object,
	processInput: PropTypes.func,
	handleChangeMode: PropTypes.func,
	handleRefreshWords: PropTypes.func,
	userName: PropTypes.string,
}