import { useEffect } from 'react';

import { useAppDispatch } from '@state/index';
import { setCurrentRoute } from '@state/session';

import './NotFound.css';

export default function NotFound() {
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(setCurrentRoute());
	}, [setCurrentRoute]);

	return <h2>This page is, like, totally not found.</h2>;
}
