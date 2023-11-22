import { Image } from './images';

export type Gallery = {
	id?: number;
	title: string;
	description?: string;
	keyImageURL?: string;
	orderNumber: number;
	images?: Image[];
};
