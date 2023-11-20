import { useEffect } from 'react';
import './NotFound.css';

export default function NotFound({ setCurrentRoute }) {
	useEffect(() => {
		setCurrentRoute('');
	}, [setCurrentRoute]);

	return <h2>This page is, like, totally not found.</h2>;
}
