'use client';

import type { ReactNode } from 'react';
import { Provider } from 'react-redux';

import store from '@state/index';
import * as sessionActions from '@state/session';
import { csrfFetch, restoreCSRF } from '@state/csrf';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

export default function ClientContextProvider({ children }: { children?: ReactNode }) {
	if (typeof window !== 'undefined') {
		if (process.env.NODE_ENV !== 'production') {
			restoreCSRF();

			window.csrfFetch = csrfFetch;
			window.store = store;
			window.sessionActions = sessionActions;
		} else if (window.location.protocol === 'http:') {
			window.location.href = window.location.href.replace('http:', 'https:');
		}
	}
	const persistor = persistStore(store);

	return (
		<Provider store={store}>
			<PersistGate persistor={persistor}>{children}</PersistGate>
		</Provider>
	);
}
