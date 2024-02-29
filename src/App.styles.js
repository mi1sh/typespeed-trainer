import styled from 'styled-components';

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 100%;
	width: 100%;
`;

export const Title = styled.h1`
	font-family: "Press Start 2P", system-ui;
	font-size: 3.5em;
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

export const BlindMode = styled.label.attrs(props => ({
	selectedWordCount: props.selectedWordCount,
}))`
	display: flex;
	justify-content: center;
	font-size: 0.7em;
	padding: 8px; 
	@media screen and (max-width: 430px) {
		${props => props.selectedWordCount ===  150 && `
    		margin-bottom: 5em !important;
  		`}
		${props => props.selectedWordCount ===  100 && `
    		margin-bottom: 5em !important;
  		`}
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
	max-width: 800px;
	max-height: 80vh;
	min-height: 8vh;
	word-wrap: break-word;
	font-size: 100%;
	${props => props.selectedWordCount ===  150 && `
    		font-size:  85%;
  	`}
`;


export const TypeArea = styled.input`
	border: 2px solid #235347FF;
	border-radius: 4px;
	margin-top: 2em;
	min-width: 160px;
	padding: 0.25em;
	width: 15vw;
	font-size: 16px;
	height: 20px;
	text-align: center;
	&:focus {
		outline: #377c6d double 0.2em;
		border-color: #235347FF;
		box-shadow: 0 0 10px #377c6d;
	}
`;

export const ButtonWrapper = styled.div`
	width: calc(100% / 3 - 13px);
	display: flex;
	justify-content: center;
`;

export const InfoPanelWrapper = styled.div`
	@media screen and (max-width: 430px) {
		font-size: 0.9em;
	}
	font-family: "hack", sans-serif;
	margin: 0.4em 0em 1em 0em;
	display: flex;
	flex-flow: row wrap;
	width: 100%;
	justify-content: space-between;

	&:after {
		width: calc(100% / 3 - 13px);
		content: '';
		display: table;
	}
`;

export const TextButton = styled.button`
	@media screen and (max-width: 430px) {
		padding: 0.6em;
		font-size: 0.8em;
	}
	font-family: "hack", sans-serif;
	font-size: 1em;
	background: none !important;
	border: none;
	margin: 0.4em;
	
	color: #377c6d;
	cursor: pointer;

	&:hover {
		color: #235347;
	}

	&.activeBtn {
		text-decoration: underline;
		color: #235347;
	}

	&.refreshBtn {
		margin: 0;
	}
`;