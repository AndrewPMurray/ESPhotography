'use client';

import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '@state/session';
import './auth.css';
import { useRouter } from 'next/navigation';

const LogoutButton = () => {
	const router = useRouter();
	const dispatch = useDispatch();

	const onLogout = (e) => {
		dispatch(logout()).then(() => router.push('/'));
	};

	return (
		<button id='logout-button' onClick={onLogout}>
			Logout
		</button>
	);
};

export default LogoutButton;
