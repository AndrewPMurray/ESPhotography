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
		<div className='login-signup-form-container'>
			{errors.invalid && <li id='errors'>{errors.invalid}</li>}
			<h2>Login</h2>
			<form className='login-signup-form' onSubmit={handleSubmit}>
				<div className='form-field'>
					<input
						type='text'
						value={credential}
						onChange={(e) => setCredential(e.target.value)}
						placeholder='Email or Username'
					/>
					{errors.credential && <li id='errors'>{errors.credential}</li>}
				</div>
				<div className='form-field'>
					<input
						type='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder='Password'
					/>
					{errors.password && <li id='errors'>{errors.password}</li>}
				</div>
				<div id='login-demo-buttons'>
					<button className='login-signup-button' type='submit'>
						Log In
					</button>
				</div>
			</form>
		</div>
	);
};

export default LoginForm;
