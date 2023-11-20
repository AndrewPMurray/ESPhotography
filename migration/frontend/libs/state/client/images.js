// import { csrfFetch } from './csrf';

import { csrfFetch } from './csrf';

const LOAD_IMAGES = 'images/LOAD_IMAGES';
const ADD_IMAGE = 'images/ADD_IMAGE';
const REMOVE_IMAGE = 'images/REMOVE_IMAGE';

const load = (images) => {
	return {
		type: LOAD_IMAGES,
		images,
	};
};

const add = (image) => {
	return {
		type: ADD_IMAGE,
		image,
	};
};

const remove = (imageId) => {
	return {
		type: REMOVE_IMAGE,
		imageId,
	};
};

export const loadImages = () => async (dispatch) => {
	const response = await fetch('/api/images');
	if (response.ok) {
		const images = await response.json();
		dispatch(load(images));
		return images;
	}
};

export const loadHomeImages = () => async (dispatch) => {
	const response = await fetch('/api/images/home');
	if (response.ok) {
		const images = await response.json();
		dispatch(load(images));
		return images;
	}
};

export const addImage = (payload) => async (dispatch) => {
	const { title, description, galleryId, isHomepageImage, image } = payload;
	const formData = new FormData();
	formData.append('image', image);
	formData.append('title', title);
	formData.append('description', description);
	formData.append('galleryId', galleryId);
	formData.append('isHomepageImage', isHomepageImage);

	const response = await csrfFetch('/api/images', {
		method: 'POST',
		headers: {
			'Content-Type': 'multipart/form-data',
		},
		body: formData,
	});
	const data = await response.json();
	dispatch(add(data));
};

export const updateImage = (image) => async (dispatch) => {
	const response = await csrfFetch(`/api/images/${image.id}`, {
		method: 'PUT',
		header: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(image),
	});
	if (response.ok) {
		const data = await response.json();
		dispatch(add(data));
	} else {
		const errors = await response.json();
		return errors;
	}
};

export const deleteImage = (imageId) => async (dispatch) => {
	const response = await csrfFetch(`/api/images/${imageId}`, {
		method: 'DELETE',
	});
	if (response.ok) {
		dispatch(remove(imageId));
	}
};

const initialState = {};

const imagesReducer = (state = initialState, action) => {
	let newState;
	switch (action.type) {
		case LOAD_IMAGES: {
			newState = {};
			action.images.forEach((image) => {
				newState[image.id] = image;
			});
			return newState;
		}
		case ADD_IMAGE: {
			newState = { ...state };
			newState[action.image.id] = action.image;
			return newState;
		}
		case REMOVE_IMAGE: {
			newState = { ...state };
			delete newState[action.imageId];
			return newState;
		}
		default:
			return state;
	}
};

export default imagesReducer;
