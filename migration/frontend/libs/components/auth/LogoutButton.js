'use client';

import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '@state/client/session';
import './auth.css';
import { useNavigation } from 'react-router-dom';

const LogoutButton = () => {
	const navigate = useNavigation();
	const dispatch = useDispatch();

	const onLogout = async (e) => {
		dispatch(logout()).then(() => navigate('/'));
	};

	return (
		<button id='logout-button' onClick={onLogout}>
			Logout
		</button>
	);
};

export default LogoutButton;
