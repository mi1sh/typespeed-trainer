import firebase from 'firebase/compat/app';
import {useEffect, useState} from 'react';
import {TableDataCell, TableHeaderCell, TableWrapper} from './RatingTable.styles.js';

export const RatingTable = ({bestAuthRecord}) => {
	const [userRecords, setUserRecords] = useState([]);

	useEffect(() => {
		const usersRef = firebase.database().ref('users');
		usersRef.once('value', (snapshot) => {
			const userData = snapshot.val();
			const users = [];
			for (const userId in userData) {
				if (Object.hasOwnProperty.call(userData, userId)) {
					const username = userData[userId].username;
					const bestRecord = userData[userId].bestRecord || 0;
					users.push({username, bestRecord});
				}
			}
			users.sort((a, b) => b.bestRecord - a.bestRecord);
			setUserRecords(users);
		});
	}, [bestAuthRecord]);

	return (
		<TableWrapper>
			<table>
				<thead>
					<tr>
						<TableHeaderCell>Username</TableHeaderCell>
						<TableHeaderCell>Best Record</TableHeaderCell>
					</tr>
				</thead>
				<tbody>
					{userRecords.map((user, index) => (
						<tr key={index}>
							<TableDataCell>{user.username}</TableDataCell>
							<TableDataCell>{user.bestRecord} WPM</TableDataCell>
						</tr>
					))}
				</tbody>
			</table>
		</TableWrapper>
	);
};