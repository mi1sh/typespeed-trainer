import {useRef} from 'react';
import Word from './Word.jsx';
import styled from 'styled-components';

const getCloud = () => `fish second life heart love girlfriend massive react development production movement application about a side of the universe adopt console grand mom hear speak useless alone big first time change i feel falling fall us we you me they our homeless work study education lesson house country politics president society them ministry project javascript typescript refactoring format place spot silk property practice`.split(' ');

//.sort(() => Math.random() > 0.5 ? 1 : -1);
const TextAreaWrapper = styled.div`
	min-width: 400px;
	width: 50vw;
	height: 40vh;
	border: 1px solid white;
	border-radius: 10px;
	padding: 10px;
	margin-bottom: 25px;
`

const TextArea = ({activeWordIndex}) => {
	const cloud = useRef(getCloud());
	return (
		<TextAreaWrapper>
			<p style={{
				height: '100%',
				width: '100%',
				overflow: 'hidden',
				fontSize: 'calc(12px + 1vh)',
			}}>
				{cloud.current.map((word, index) => {
					return <Word
						key={index}
						text={word}
						active={index === activeWordIndex}
						correct={null}
					/>;
				})}
			</p>
		</TextAreaWrapper>

	);
};

export default TextArea;
