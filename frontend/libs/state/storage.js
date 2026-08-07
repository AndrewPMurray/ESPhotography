import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

const createNoopStorage = () => {
	return {
		getItem(_key) {
			return Promise.resolve(null);
		},
		setItem(_key, value) {
			return Promise.resolve(value);
		},
		removeItem(_key) {
			return Promise.resolve();
		},
	};
};

const storageInitializer =
	typeof createWebStorage === 'function' ? createWebStorage : createWebStorage.default;

const storage = typeof window !== 'undefined' ? storageInitializer('local') : createNoopStorage();

export default storage;
