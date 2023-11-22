'use client';

import Cookies from 'js-cookie';

type fetchOptionsType = {
	method?: string;
	body?: string | FormData;
	headers?: Record<string, string> & { 'XSRF-Token'?: string | undefined };
};

export async function csrfFetch(url: string, options: fetchOptionsType = {}) {
	options.method = options.method || 'GET';
	options.headers = options.headers || {};

	if (options.method.toUpperCase() !== 'GET') {
		if (options.headers['Content-Type'] === 'multipart/form-data') {
			delete options.headers['Content-Type'];
		} else {
			options.headers['Content-Type'] = options.headers['Content-Type'] || 'application/json';
		}
		options.headers['XSRF-Token'] = Cookies.get('XSRF-TOKEN');
	}

	const res = await window.fetch(url, options);

	if (res.status >= 400) throw res;

	return res;
}

export function restoreCSRF() {
	return csrfFetch('/api/csrf/restore');
}
