import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons';
import {faTelegram} from '@fortawesome/free-brands-svg-icons';
import {faGithub} from '@fortawesome/free-brands-svg-icons';
import {FooterButton, FooterWrapper} from './Footer.styles.js';
function Footer() {

	return (
		<FooterWrapper>
			<FooterButton target="blank" href="https://github.com/mi1sh/typespeed-test"><FontAwesomeIcon className={'footerBtn'} icon={faGithub}/></FooterButton>
			<FooterButton target="blank" href="https://t.me/m1ish"><FontAwesomeIcon className={'footerBtn'} icon={faTelegram}/></FooterButton>
			<FooterButton target="blank" href="mailto:mikhail.pelt@gmail.com"><FontAwesomeIcon className={'footerBtn'} icon={faEnvelope}/></FooterButton>
		</FooterWrapper>

	);
}

export default Footer;
