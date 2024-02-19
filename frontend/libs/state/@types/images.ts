export type Image = {
	id?: string;
	title: string;
	description?: string;
	url?: string;
	galleryId?: string;
	isHomepageImage: boolean;
	isPortrait: boolean;
	portraitOrderNumber?: number;
	orderNumber: number;
	homepageOrderNumber?: number;
	image?: File;
};
