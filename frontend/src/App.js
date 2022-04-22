import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

// components
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import LoginForm from './components/auth/LoginForm';
import GalleryList from './components/GalleryList';
import Gallery from './components/Gallery';

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
				<>
					<NavBar />
					<Switch>
						<Route exact path='/'>
							<HomePage />
						</Route>
						<Route exact path='/login'>
							<LoginForm />
						</Route>
						<Route exact path='/galleries'>
							<GalleryList />
						</Route>
						<Route exact path='/galleries/:galleryId'>
							<Gallery />
						</Route>
					</Switch>
				</>
			)}
		</>
	);
}

export default App;
