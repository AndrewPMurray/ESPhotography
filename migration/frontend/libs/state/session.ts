import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { csrfFetch } from './csrf';
import { User } from './@types';

export const restoreUser = createAsyncThunk('session/restoreUser', async () => {
	const response = await csrfFetch('/api/session');
	const data = await response.json();
	return data.user;
});

export const login = createAsyncThunk(
	'session/setUser',
	async (user: User, { rejectWithValue }) => {
		const { credential, password } = user;
		try {
			const response = await csrfFetch('/api/session', {
				method: 'POST',
				body: JSON.stringify({
					credential,
					password,
				}),
			});
			const data = await response.json();
			return data.user;
		} catch (e: any) {
			const errors = await e.json();
			return rejectWithValue(errors);
		}
	}
);

export const signup = createAsyncThunk(
	'session/signUpUser',
	async (user: User, { rejectWithValue }) => {
		const { username, email, password, confirmPassword } = user;

		try {
			const response = await csrfFetch('/api/users', {
				method: 'POST',
				body: JSON.stringify({
					username,
					email,
					password,
					confirmPassword,
				}),
			});
			const data = await response.json();
			return data;
		} catch (e: any) {
			const errors = await e.json();
			return rejectWithValue(errors);
		}
	}
);

export const logout = createAsyncThunk('session/logout', async () => {
	const response = await csrfFetch('/api/session', {
		method: 'DELETE',
	});
	const data = await response.json();
	return data;
});

export const setCurrentRoute = createAsyncThunk('session/route', async () => {
	if (typeof window === 'undefined') throw new Error('no window object on server-side');
	return window.location.href;
});

type initialStateProps = { user: User | null; currentRoute: string };

const initialState: initialStateProps = { user: null, currentRoute: '/' };

const sessionSlice = createSlice({
	name: 'session',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(login.fulfilled, (state, action) => {
				state.user = action.payload;
			})
			.addCase(restoreUser.fulfilled, (state, action) => {
				state.user = action.payload;
			})
			.addCase(signup.fulfilled, (state, action) => {
				state.user = action.payload;
			})
			.addCase(logout.fulfilled, () => {
				return initialState;
			})
			.addCase(setCurrentRoute.fulfilled, (state, action) => {
				state.currentRoute = action.payload;
			});
	},
});

export default sessionSlice.reducer;
