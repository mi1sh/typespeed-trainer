import styled from 'styled-components';

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 100%;
	width: 100%;
`;

export const Title = styled.h1`
	@media screen and (max-width: 900px) {
		font-size: 4.5vw;
	}
	font-family: "Press Start 2P", system-ui;
	font-size: 2.9vw;
	position: relative;
	margin: 2em 0em 0.8em 0em;
	&::after {
		content: '';
		position: absolute;
		left: 0;
		z-index: -1;
		bottom: 5px;
		width: 100%;
		height: 3px;
		background-color: #235347;
		display: block;
	}
	@media screen and (max-width: 430px) {
		&::after {
			bottom: 1px !important;
		}
		font-size: 2.3em !important;
		margin: 1em 0em 0.8em 0em !important;
	}
`

export const TextAreaWrapper = styled.div`
	@media screen and (max-width: 430px) {
		min-width: 94vw;
		min-height: 18vh;
		margin: 5px;
		padding: 3px;
	}
	width: auto;
	min-width: 42vw;
	max-width: 800px;
	max-height: 80vh;
	min-height: 13vh;
	height: 100%;
	border: 4px solid rgb(35, 83, 71);
	border-radius: 10px;
	padding: 10px;
	margin: 0.5em 0em 0em 0em;
	word-wrap: break-word;
`;

export const Text = styled.p.attrs(props => ({
	selectedWordCount: props.selectedWordCount,
}))`
	overflow: hidden;
	font-family: "hack", sans-serif;
	min-width: 25vw;
	margin: auto;
	max-width: 800px;
	max-height: 80vh;
	min-height: 8vh;
	word-wrap: break-word;
	font-size: 100%;
	${props => props.selectedWordCount ===  150 && `
    		font-size:  85%;
  	`}
`;

