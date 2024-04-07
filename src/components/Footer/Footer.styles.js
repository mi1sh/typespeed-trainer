import styled from 'styled-components';

export const FooterWrapper = styled.div`
	position: fixed;
	left: 0;
	width: 100%;
	align-items: center;
	height: auto;
`

export const FooterAppWrapper = styled.div`
	@media screen and (max-width: 650px) {
		background-color: rgb(39, 44, 43); 
		bottom: 0;
	}
	position: fixed;
	left: 0;
	width: 100%;
	bottom: 1em;
	height: 4em;
`

export const FooterButton = styled.a`
	font-size: 1.2em;
	color: #d7d7d7;
	max-width: 300px;
	margin: 0em 2em 0em 2em;
	padding: 10px 15px 10px 15px;
	transition: transform .1s ease-in-out;

	&:hover {
		transform: scale(1.3)
	}
	
	&:active {
		color: #377c6d;
	}
`