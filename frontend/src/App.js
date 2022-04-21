import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

// components
import Portfolio from './components/Portfolio';
import LoginForm from './components/auth/LoginForm';

// Utils & contexts as needed
import * as sessionActions from './store/session';

function App() {
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
	}, [dispatch]);

	return (
		<>
			{isLoaded && (
				<Switch>
					<Route exact path='/'>
						<Portfolio />
					</Route>
					<Route exact path='/login'>
						<LoginForm />
					</Route>
				</Switch>
			)}
		</>
	);
}

export default App;
