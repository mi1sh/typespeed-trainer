import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowsRotate} from '@fortawesome/free-solid-svg-icons';
import {BestRecord, ButtonWrapper, ControlPanelWrapper, TextButton} from './ControlPanel.styles.js';
import {auth} from '../../firebase.js';
import {useEffect} from 'react';
import firebase from 'firebase/compat/app';

export const ControlPanel = ({selectedWordCount, handleRefreshWords, bestRecord, setSelectedWordCount, isAuthenticated, bestAuthRecord, setBestAuthRecord}) => {

	useEffect(() => {
		const currentUser = auth.currentUser;
		if (currentUser) {
			const userRef = firebase.database().ref('users/' + currentUser.uid);
			userRef.once('value', snapshot => {
				const userData = snapshot.val();
				if (userData && userData.bestRecord) {
					setBestAuthRecord(userData.bestRecord);
				}
			});
		}
	}, [isAuthenticated, bestAuthRecord]);
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
					style={{paddingRight: '3px', marginLeft: '-1.5vw'}} icon={faArrowsRotate}/>Refresh<span
					style={{
						fontSize: '0.7em',
						position: 'absolute',
						padding: '0.4em 0em 0em 0.15em'
					}}>(R)</span></TextButton>
			</ButtonWrapper>
			<ButtonWrapper>
				<BestRecord>{isAuthenticated ? `Best
					record: ${bestAuthRecord}` : `Best record: ${bestRecord}`} WPM</BestRecord>
			</ButtonWrapper>
		</ControlPanelWrapper>
	);
};