import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import * as sessionActions from '../../store/session';
import './auth.css';

const LoginForm = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const [credential, setCredential] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState({});
	const user = useSelector((state) => state.session.user);

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors({});
		return dispatch(sessionActions.login({ credential, password })).catch(async (res) => {
			const data = await res.json();
			if (data && data.errors) setErrors(data.errors);
		});
	};

	useEffect(() => {
		if (user) {
			history.push('/');
		}
	}, [user, history]);

	return (
		<div id='login-page-container'>
			<div id='login-form-container'>
				{errors.invalid && <li id='errors'>{errors.invalid}</li>}
				<h2>Login</h2>
				<form id='login-form' onSubmit={handleSubmit}>
					<div className='form-field'>
						<input
							type='text'
							value={credential}
							onChange={(e) => setCredential(e.target.value)}
							placeholder='Email or Username'
						/>
					</div>
					<div className='form-field'>
						<input
							type='password'
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
