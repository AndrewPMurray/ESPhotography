import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { csrfFetch } from './csrf';
import { Image } from './@types';

export const loadImages = createAsyncThunk('images/loadImages', async () => {
	const response = await fetch('/api/images');
	if (response.ok) {
		const images = await response.json();
		return images;
	}
});

export const loadHomeImages = createAsyncThunk('images/loadHomeImages', async () => {
	const response = await fetch('/api/images/home');
	if (response.ok) {
		const images = await response.json();
		return images;
	}
});

export const addImage = createAsyncThunk('images/addImage', async (payload: Image) => {
	const { title, description, galleryId, isHomepageImage, image } = payload;
	const formData = new FormData();
	formData.append('image', image);
	formData.append('title', title);
	formData.append('description', description);
	formData.append('galleryId', galleryId);
	formData.append('isHomepageImage', String(isHomepageImage));

	const response = await csrfFetch('/api/images', {
		method: 'POST',
		headers: {
			'Content-Type': 'multipart/form-data',
		},
		body: formData,
	});
	const data = await response.json();
	return data;
});

export const updateImage = createAsyncThunk('images/updateImage', async (image: Image) => {
	const response = await csrfFetch(`/api/images/${image.id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(image),
	});
	if (response.ok) {
		const data = await response.json();
		return data;
	} else {
		const errors = await response.json();
		return errors;
	}
});

export const deleteImage = createAsyncThunk('images/deleteImage', async (imageId: string) => {
	const response = await csrfFetch(`/api/images/${imageId}`, {
		method: 'DELETE',
	});
	if (response.ok) {
		return imageId;
	}
});

const initialState: Image[] = [];

const imagesSlice = createSlice({
	name: 'images',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(loadImages.fulfilled, (_state, action) => {
				const newState = [...action.payload];
				return newState;
			})
			.addCase(loadHomeImages.fulfilled, (_state, action) => {
				const newState = [...action.payload];
				return newState;
			})
			.addCase(addImage.fulfilled, (state, action) => {
				state = [...state, action.payload];
			})
			.addCase(updateImage.fulfilled, (state, action) => {
				const newState = [...state];
				const updatedImageIndex = newState.findIndex(
					(image) => image.id === action.payload.id
				);
				newState[updatedImageIndex] = action.payload;
				return newState;
			})
			.addCase(deleteImage.fulfilled, (state, action) => {
				const newState = [...state];
				const updatedImageIndex = newState.findIndex(
					(image) => image.id === action.payload
				);
				newState.splice(updatedImageIndex, 1);
				return newState;
			});
	},
});

export default imagesSlice.reducer;
