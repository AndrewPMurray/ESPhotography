'use client';

import React, { FormEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

import { RootState, useAppDispatch } from '@state/index';
import * as sessionActions from '@state/session';
import './auth.css';

type ErrorType = {
	invalid?: string;
};

const LoginForm = () => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const [credential, setCredential] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState<ErrorType>({});
	const user = useSelector((state: RootState) => state.session.user);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setErrors({});
		return dispatch(sessionActions.login({ credential, password })).catch(async (res) => {
			const data = await res.json();
			if (data && data.errors) setErrors(data.errors);
		});
	};

	useEffect(() => {
		if (user) {
			router.push('/');
		}
	}, [user]);

	useEffect(() => {
		dispatch(sessionActions.setCurrentRoute());
	}, []);

	return (
		<div id='login-page-container'>
			<div id='login-form-container'>
				{errors.invalid && <li id='errors'>{errors.invalid}</li>}
				<h2>Login</h2>
				<form id='login-form' onSubmit={handleSubmit}>
					<div className='form-field'>
						<input
							type='text'
							name='username'
							value={credential}
							onChange={(e) => setCredential(e.target.value)}
							placeholder='Email or Username'
						/>
					</div>
					<div className='form-field'>
						<input
							type='password'
							name='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder='Password'
						/>
					</div>
					<button className='login-button' type='submit'>
						Log In
					</button>
				</form>
			</div>
		</div>
	);
};

export default LoginForm;
