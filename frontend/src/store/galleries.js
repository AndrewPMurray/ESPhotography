// import { csrfFetch } from './csrf';

import { csrfFetch } from './csrf';

const LOAD_GALLERIES = 'images/LOAD_GALLERIES';
const ADD_GALLERY = 'images/ADD_GALLERY';
const REMOVE_GALLERY = 'images/REMOVE_GALLERY';

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

const initialState = {};

const galleriesReducer = (state = initialState, action) => {
	let newState;
	switch (action.type) {
		case LOAD_GALLERIES: {
			newState = {};
			action.galleries.forEach((gallery) => {
				newState[gallery.id] = gallery;
			});
			return newState;
		}
		case ADD_GALLERY: {
			newState = { ...state, [action.gallery.id]: action.gallery };
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