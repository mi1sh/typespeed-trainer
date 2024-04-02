import styled from 'styled-components';

export const TypeInput = styled.input`
	border: 2px solid #235347FF;
	border-radius: 4px;
	margin-top: 1.5em;
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

export const BlindMode = styled.label`
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
`;