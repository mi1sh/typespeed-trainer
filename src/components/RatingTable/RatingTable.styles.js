import styled from 'styled-components';

export const TableWrapper = styled.div`
	@media screen and (max-width: 430px) {
		margin-top: 4.5vh;
	}
	display: flex;
	flex-direction: row;
	justify-content: center;
	max-height: 7.7em;
	overflow-y: auto;
	margin-top: 6vh;
	margin-bottom: 5em;
`

export const TableHeaderCell = styled.th`
	@media screen and (max-width: 430px) {
		font-size: 0.65em;
	}
	font-size: 0.8em;
	padding: 0em 1.3em 0em 1.3em;
	color: #235347;
	font-weight: normal;
`

export const TableDataCell = styled.td`
	@media screen and (max-width: 430px) {
		font-size: 0.45em;
	}
	font-size: 0.55em;
`