import styled from 'styled-components';

export const TypeAreaWrapper = styled.div`
	margin-top: 2em;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: auto;
`

export const TypeInput = styled.input`
	border: 2px solid #235347FF;
	border-radius: 4px;
	min-width: 160px;
	margin: 0.2em;
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
`;