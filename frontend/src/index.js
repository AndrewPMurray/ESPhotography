import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import { ModalProvider } from './context/Modal';
import { restoreCSRF, csrfFetch } from './store/csrf';

import configureStore from './store';
import * as sessionActions from './store/session';

import './index.css';

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
	restoreCSRF();

	window.csrfFetch = csrfFetch;
	window.store = store;
	window.sessionActions = sessionActions;
}
// else if (window.location.protocol === 'http:') {
// 	window.location.href = window.location.href.replace('http:', 'https:');
// }

function Root() {
	return (
		<Provider store={store}>
			<ModalProvider>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</ModalProvider>
		</Provider>
	);
}

ReactDOM.render(
	<React.StrictMode>
		<Root />
	</React.StrictMode>,
	document.getElementById('root')
);
