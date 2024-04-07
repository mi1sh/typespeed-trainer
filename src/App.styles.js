import styled from 'styled-components';
export const Wrapper = styled.div`
	height: 100%;
	width: 100%;
`;

export const FooterModalButton = styled.div`
	@media screen and (max-width: 650px) {
		.footerTextButton {
			color: #d7d7d7;
		} :active {
			  color: #377c6d;
		  }
	}
	width: 100%;
	align-items: center;
	bottom: 2.7em;
	height: auto;
`

export const Title = styled.h1.attrs(props => ({
	selectedWordCount: props.selectedWordCount,
}))`
	@media screen and (max-width: 900px) {
		font-size: 4.5vw;
	};
	@media screen and (max-width: 430px) {
		&::after {
			bottom: 1px !important;
		}
		font-size: 1.5em !important;
	}
	@media screen and (max-width: 385px) {
		font-size: 6vw !important;
	};
	font-family: "Press Start 2P", system-ui;
	font-size: 2.9vw;
	margin: 2.5em 0em 0.4em 0em;
	transition: margin 0.3s ease-in-out;
	${props => props.selectedWordCount ===  100 && `
    		margin: 1em 0em 0.35em 0em;
  	`}
	${props => props.selectedWordCount ===  150 && `
    		margin: 0.3em 0em 0.2em 0em;
  	`}
`

export const TextAreaWrapper = styled.div.attrs(props => ({
	selectedWordCount: props.selectedWordCount,
}))`
	@media screen and (max-width: 430px) {
		min-width: 94vw;
		min-height: 13vh;
		margin: 5px;
		padding: 3px;
		${props => props.selectedWordCount === 100 && `
    		min-height: 31vh;
  	`}
		${props => props.selectedWordCount === 150 && `
    		min-height: 31vh;
  	`}
	}
	transition: 0.3s ease-in-out;
	overflow: hidden;
	position: relative;
	background-color: rgb(39, 44, 43) !important;
	border: 4px solid rgb(35, 83, 71);
	border-radius: 10px;
	width: auto;
	height: auto;
	min-width: 42vw;
	max-width: 800px;
	min-height: 16vh;
	margin: auto;
	word-wrap: break-word;
	${props => props.selectedWordCount === 100 && `
    		min-height: 31vh;
  	`}
	${props => props.selectedWordCount === 150 && `
    		min-height: 31vh;
  	`}
`;

export const Text = styled.p.attrs(props => ({
	selectedWordCount: props.selectedWordCount,
}))`
	@media screen and (max-width: 430px) {
		font-size: 0.7em !important;
		padding: 5px;
		${props => props.selectedWordCount === 150 && `
    		font-size:  85%;
  	`}
	}
	transition: 0.3s ease-in-out;
	padding: 10px;
	overflow: hidden;
	color: #6f8d86;
	font-family: "hack", sans-serif;
	min-width: 25vw;
	margin: auto 0;
	max-width: 800px;
	max-height: 80vh;
	min-height: 8vh;
	word-wrap: break-word;
	font-size: 100%;
	${props => props.selectedWordCount === 150 && `
    		font-size:  85%;
  	`}
`;

