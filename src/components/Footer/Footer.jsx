import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons';
import {faTelegram} from '@fortawesome/free-brands-svg-icons';
import {faGithub} from '@fortawesome/free-brands-svg-icons';
import {FooterWrapper} from './Footer.styles.js';

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
