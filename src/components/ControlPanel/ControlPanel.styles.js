import styled from 'styled-components';

export const ButtonWrapper = styled.div`
	width: calc(100% / 3 - 13px);
	display: flex;
	justify-content: center;
`;

export const BestRecord = styled.p`
	@media screen and (max-width: 430px) {
		font-size: 0.75em;
	}
	color: #377c6d; 
	float: right; 
	padding-right: 3em; 
	font-size: 1em
`

export const ControlPanelWrapper = styled.div`
	@media screen and (max-width: 430px) {
		font-size: 0.9em;
	}
	font-family: "hack", sans-serif;
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
		font-size: 0.8em;
		margin: 0.2em;
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