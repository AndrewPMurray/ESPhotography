import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

// components
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import LoginForm from './components/auth/LoginForm';
import GalleryList from './components/GalleryList';
import Gallery from './components/Gallery';
import Footer from './components/Footer';

// Utils & contexts as needed
import * as sessionActions from './store/session';
import About from './components/About';
import Contact from './components/Contact';
import NotFound from './components/NotFound';

function App() {
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);
	const [currentRoute, setCurrentRoute] = useState(window.location.href);

	useEffect(() => {
		dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
	}, [dispatch]);

	useLayoutEffect(() => {
		window.scrollTo(0, 0);
	});

	return (
		isLoaded && (
			<>
				<NavBar currentRoute={currentRoute} />
				<Switch>
					<Route exact path='/'>
						<HomePage setCurrentRoute={setCurrentRoute} />
					</Route>
					<Route exact path='/login'>
						<LoginForm setCurrentRoute={setCurrentRoute} />
					</Route>
					<Route exact path='/galleries'>
						<GalleryList setCurrentRoute={setCurrentRoute} />
					</Route>
					<Route exact path='/galleries/:galleryId(\d+)'>
						<Gallery setCurrentRoute={setCurrentRoute} />
					</Route>
					<Route exact path='/about'>
						<About setCurrentRoute={setCurrentRoute} />
					</Route>
					<Route exact path='/contact'>
						<Contact setCurrentRoute={setCurrentRoute} />
					</Route>
					<Route>
						<NotFound setCurrentRoute={setCurrentRoute} />
					</Route>
				</Switch>
				<Footer />
			</>
		)
	);
}

export default App;
