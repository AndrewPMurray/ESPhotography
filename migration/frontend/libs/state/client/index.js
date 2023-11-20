import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import session from './session';
import galleries from './galleries';
import images from './images';

const reducer = combineReducers({
	session,
	galleries,
	images,
});

const store = configureStore({
	reducer,
});

export default store;
