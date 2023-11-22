import Gallery from '@components/Gallery';
import { Gallery as GalleryType } from '@state/@types';

export async function generateStaticParams() {
	const galleries = await fetch('https://elmarschmittou.com/api/galleries').then((res) =>
		res.json()
	);

	return galleries.map((gallery: GalleryType) => ({
		galleryId: String(gallery.id) ?? '',
	}));
}

export default Gallery;
