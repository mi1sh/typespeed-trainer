import {TypeInput} from '../TypeArea/TypeArea.styles.js';
import {TextButton} from '../ControlPanel/ControlPanel.styles.js';
import {Form} from './NameModal.styles.js';
import {useEffect} from 'react';

export const NameModal = ({setShowModal, userName}) => {

	useEffect(() => {
		console.log('useEffect called', userName);
		if (userName) {
			setShowModal(false);
		}
	}, []);

	const handleNameSubmit = ((event) => {
		event.preventDefault();
		console.log('handleNameSubmit вызван');
		const nameInput = event.currentTarget.elements.namedItem("input");
		const name = nameInput.value.trim();
		if (name.length > 0) {
			localStorage.setItem('userName', name);
			console.log('Имя пользователя сохранено:', name);
			setShowModal(false);
		} else {
			alert("Please, enter your name.");
		}
	});

	return (
		<Form onSubmit={handleNameSubmit}>
			<TypeInput maxLength="20" minLength="1" name="input" type="text"  placeholder='Enter your name...'/>
			<TextButton type="submit">Save</TextButton>
		</Form>
	);
};
