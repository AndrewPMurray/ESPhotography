import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';

import storage from './storage';

import session from './session';
import galleries from './galleries';
import images from './images';
import { useDispatch } from 'react-redux';

const persistConfig = {
	key: 'session',
	storage,
	whiteList: ['user', 'currentRoute'],
	timeout: 100,
};

const reducer = combineReducers({
	session: persistReducer(persistConfig, session),
	galleries,
	images,
});

const store = configureStore({
	reducer,
	devTools: process.env.NODE_ENV !== 'production',
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
