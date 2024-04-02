import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowsRotate} from '@fortawesome/free-solid-svg-icons';
import {ButtonWrapper, ControlPanelWrapper, TextButton} from './ControlPanel.styles.js';

export const ControlPanel = ({selectedWordCount, handleRefreshWords, bestRecord, setSelectedWordCount}) => {

	const handleWordCountChange = (count) => {
		setSelectedWordCount(count);
		localStorage.setItem('selectedWordCount', count.toString());
	};

	return (
		<ControlPanelWrapper>
			<ButtonWrapper>
				<TextButton className={selectedWordCount === 50 ? 'activeBtn' : ''}
							onClick={() => handleWordCountChange(50)}>50</TextButton>
				<TextButton className={selectedWordCount === 100 ? 'activeBtn' : ''}
							onClick={() => handleWordCountChange(100)}>100</TextButton>
				<TextButton className={selectedWordCount === 150 ? 'activeBtn' : ''}
							onClick={() => handleWordCountChange(150)}>150</TextButton>
			</ButtonWrapper>
			<ButtonWrapper>
				<TextButton className={'refreshBtn'} onClick={() => handleRefreshWords()}><FontAwesomeIcon
					style={{paddingRight: '3px', marginLeft: '-3px'}} icon={faArrowsRotate}/>Refresh<span
					style={{
						fontSize: '0.7em',
						position: 'absolute',
						padding: '0.4em 0em 0em 0.15em'
					}}>(R)</span></TextButton>
			</ButtonWrapper>
			<ButtonWrapper>
				<p style={{color: '#377c6d', float: 'right', paddingRight: '3em', fontSize: '1em'}}>Best
					record: {bestRecord} WPM</p>
			</ButtonWrapper>
		</ControlPanelWrapper>
	);
};