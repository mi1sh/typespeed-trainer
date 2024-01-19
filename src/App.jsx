import './App.css';
import {useState} from 'react';

import TextArea from './components/TextArea.jsx';

const App = () => {
	const [userInput, setUserInput] = useState('');
	const [activeWordIndex, setActiveWordIndex] = useState(0);

	const proceesInput = (value) => {
		if (value.endsWith(' ')) {
			// юзер закончил слово
			setActiveWordIndex(index => index + 1);
			setUserInput('');
		} else {
			setUserInput(value);
		}
	};

	return (
		<>
			<h1 className="title">typespeed - test</h1>
			<TextArea activeWordIndex={activeWordIndex}/>
			<input
				type="text"
				value={userInput}
				onChange={(e) => proceesInput(e.target.value)}
			/>
		</>
	);
}

export default App;
