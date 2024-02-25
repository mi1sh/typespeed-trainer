import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons';
import {faTelegram} from '@fortawesome/free-brands-svg-icons';
import {faGithub} from '@fortawesome/free-brands-svg-icons';

const FooterWrapper = styled.div`
	@media screen and (max-width: 430px) {
		height: 5%;
		display: flex;
		flex-direction: row;
	}
	position: fixed;
	left: 0;
	bottom: 0;
	width: 100%;
	text-align: center;
`

function Footer() {
	return (
		<FooterWrapper>
			<a target='blank' href='https://github.com/mi1sh'><FontAwesomeIcon className={'footerBtn'} icon={faGithub} /></a>
			<a target='blank' href='https://t.me/m1ish'><FontAwesomeIcon className={'footerBtn'} icon={faTelegram} /></a>
			<a target='blank' href='mailto:mikhail.pelt@gmail.com'><FontAwesomeIcon className={'footerBtn'} icon={faEnvelope} /></a>
		</FooterWrapper>
	);
}

export default Footer;
