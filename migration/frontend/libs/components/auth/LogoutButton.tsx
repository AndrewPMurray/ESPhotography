'use client';

import type { MouseEvent } from 'react';
import { useRouter } from 'next/navigation';

import { useAppDispatch } from '@state/index';
import { logout } from '@state/session';

import './auth.css';

const LogoutButton = () => {
	const router = useRouter();
	const dispatch = useAppDispatch();

	const onLogout = (e: MouseEvent<HTMLElement>) => {
		dispatch(logout()).then(() => router.push('/'));
	};

	return (
		<button id='logout-button' onClick={onLogout}>
			Logout
		</button>
	);
};

export default LogoutButton;
