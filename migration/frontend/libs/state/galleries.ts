import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { csrfFetch } from './csrf';
import { Gallery } from './@types';

export const loadGalleries = createAsyncThunk('galleries/loadGalleries', async () => {
	const response = await fetch('/api/galleries');
	if (response.ok) {
		const galleries = await response.json();
		return galleries;
	}
});

export const loadSingleGallery = createAsyncThunk(
	'galleries/loadGallery',
	async (galleryId: string) => {
		const response = await fetch(`/api/galleries/${galleryId}`);
		if (response.ok) {
			const gallery = await response.json();
			return gallery;
		}
	}
);

export const addGallery = createAsyncThunk('galleries/addGallery', async (gallery: Gallery) => {
	const response = await csrfFetch('/api/galleries', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(gallery),
	});
	if (response.ok) {
		const gallery = await response.json();
		return gallery;
	}
});

export const updateGalleryKey = createAsyncThunk(
	'galleries/updateGalleryKey',
	async (galleryId, url) => {
		const response = await csrfFetch(`/api/galleries/${galleryId}/key`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ url }),
		});
		if (response.ok) {
			const gallery = await response.json();
			return gallery;
		}
	}
);

export const editGalleryOrder = createAsyncThunk(
	'galleries/editGalleryOrder',
	async (gallery: Gallery) => {
		const response = await csrfFetch(`/api/galleries/${gallery.id}/order`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(gallery),
		});
		if (response.ok) {
			const updatedGallery = await response.json();
			return updatedGallery;
		}
	}
);

export const editGallery = createAsyncThunk('galleries/editGallery', async (gallery: Gallery) => {
	const response = await csrfFetch(`/api/galleries/${gallery.id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(gallery),
	});
	if (response.ok) {
		const updatedGallery = await response.json();
		return updatedGallery;
	}
});

export const deleteGallery = createAsyncThunk(
	'galleries/deleteGallery',
	async (galleryId: string) => {
		const response = await csrfFetch(`/api/galleries/${galleryId}`, {
			method: 'DELETE',
		});
		if (response.ok) {
			return galleryId;
		}
	}
);

const orderGalleries = (galleries: Gallery[]) => {
	return galleries
		.filter((gallery) => !Array.isArray(gallery))
		.sort((galA, galB) => {
			return galA.orderNumber - galB.orderNumber;
		});
};

const initialState: Gallery[] = [];

const galleriesSlice = createSlice({
	name: 'galleries',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(loadGalleries.fulfilled, (state, action) => {
				return orderGalleries(action.payload);
			})
			.addCase(loadSingleGallery.fulfilled, (state, action) => {
				return orderGalleries(action.payload);
			})
			.addCase(addGallery.fulfilled, (state, action) => {
				return orderGalleries([...state, action.payload]);
			})
			.addCase(updateGalleryKey.fulfilled, (state, action) => {
				const newState = [...state];
				const ind = newState.findIndex((gallery) => gallery.id === action.payload.id);
				newState.splice(ind, 1);
				return orderGalleries([...newState, action.payload]);
			})
			.addCase(editGalleryOrder.fulfilled, (state, action) => {
				const newState = [...state];
				const ind = newState.findIndex((gallery) => gallery.id === action.payload.id);
				newState.splice(ind, 1);
				return orderGalleries([...newState, action.payload]);
			})
			.addCase(editGallery.fulfilled, (state, action) => {
				const newState = [...state];
				const ind = newState.findIndex((gallery) => gallery.id === action.payload.id);
				newState.splice(ind, 1);
				return orderGalleries([...newState, action.payload]);
			})
			.addCase(deleteGallery.fulfilled, (state, action) => {
				if (action.payload) {
					const newState = [...state];
					const ind = newState.findIndex((gallery) => gallery.id === action.payload);
					newState.splice(ind, 1);
					return newState;
				}
				return state;
			});
	},
});

export default galleriesSlice.reducer;
