import React, {useEffect, useRef} from 'react';

function Word({text, active, correct}) {

	const rerender = useRef(0);

	useEffect(() => {
		rerender.current += 1;
		console.log('Rerender')
	});

	if (correct === true) {
		return <span className='correct'>{text} </span>
	}
	if (correct === false) {
		return <span className='incorrect'>{text} </span>
	}
	if (active) {
		return <span className='active'>{text} </span>
	}

	return <span>{text} </span>
};

// eslint-disable-next-line no-func-assign
Word = React.memo(Word);

export default Word;