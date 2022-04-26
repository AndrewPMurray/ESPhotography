// import { csrfFetch } from './csrf';

import { csrfFetch } from './csrf';

const LOAD_GALLERIES = 'galleries/LOAD_GALLERIES';
const ADD_GALLERY = 'galleries/ADD_GALLERY';
const REMOVE_GALLERY = 'galleries/REMOVE_GALLERY';
const UPDATE_ORDER = 'galleries/UPDATE_ORDER';

const load = (galleries) => {
	return {
		type: LOAD_GALLERIES,
		galleries,
	};
};

const add = (gallery) => {
	return {
		type: ADD_GALLERY,
		gallery,
	};
};

const remove = (galleryId) => {
	return {
		type: REMOVE_GALLERY,
		galleryId,
	};
};

export const updateOrder = (galleries) => {
	return {
		type: UPDATE_ORDER,
		galleries,
	};
};

export const loadGalleries = () => async (dispatch) => {
	const response = await fetch('/api/galleries');
	if (response.ok) {
		const galleries = await response.json();
		dispatch(load(galleries));
		return galleries;
	}
};

export const loadSingleGallery = (galleryId) => async (dispatch) => {
	const response = await fetch(`/api/galleries/${galleryId}`);
	if (response.ok) {
		const gallery = await response.json();
		dispatch(add(gallery));
		return gallery;
	}
};

export const addGallery = (payload) => async (dispatch) => {
	const response = await csrfFetch('/api/galleries', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(payload),
	});
	if (response.ok) {
		const gallery = await response.json();
		dispatch(add(gallery));
		return gallery;
	}
};

export const updateGalleryKey = (galleryId, url) => async (dispatch) => {
	const response = await csrfFetch(`/api/galleries/${galleryId}/key`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ url }),
	});
	if (response.ok) {
		const gallery = await response.json();
		dispatch(add(gallery));
		return gallery;
	}
};

export const editGallery = (gallery) => async (dispatch) => {
	const response = await csrfFetch(`/api/galleries/${gallery.id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(gallery),
	});
	if (response.ok) {
		const updatedGallery = await response.json();
		dispatch(add(updatedGallery));
		return updatedGallery;
	}
};

export const deleteGallery = (galleryId) => async (dispatch) => {
	const response = await csrfFetch(`/api/galleries/${galleryId}`, {
		method: 'DELETE',
	});
	if (response.ok) {
		dispatch(remove(galleryId));
	}
};

const orderGalleries = (galleries) => {
	return galleries
		.filter((gallery) => !Array.isArray(gallery))
		.sort((galA, galB) => {
			return galA.orderNumber - galB.orderNumber;
		});
};

const initialState = { list: [] };

const galleriesReducer = (state = initialState, action) => {
	let newState;
	switch (action.type) {
		case LOAD_GALLERIES: {
			newState = { list: [] };
			action.galleries.forEach((gallery) => {
				newState[gallery.id] = gallery;
			});
			newState.list = orderGalleries(action.galleries);
			return newState;
		}
		case ADD_GALLERY: {
			newState = {
				...state,
				[action.gallery.id]: action.gallery,
			};
			return newState;
		}
		case UPDATE_ORDER: {
			newState = { ...state, list: orderGalleries(action.galleries) };
			return newState;
		}
		case REMOVE_GALLERY: {
			newState = { ...state };
			delete newState[action.galleryId];
			return newState;
		}
		default:
			return state;
	}
};

export default galleriesReducer;
