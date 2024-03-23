import Gallery from '@components/Gallery';

import store from '@state/index';
import { loadSingleGallery } from '@state/galleries';
import { Gallery as GalleryType } from '@state/@types';

export default async function GalleryNode({ params }: { params: { galleryId: string } }) {
	// dispatch(loadSingleGallery(galleryId))
	// .then((res) => {
	//     if (!res?.payload?.images || res?.payload?.images?.length === 0) {
	//         if (!user) {
	//             router.push('/not-found');
	//         }
	//         setNoImages(true);
	//     } else setNoImages(false);
	// })
	// .catch(() => {
	//     router.push('/not-found');
	// });

	let gallery: GalleryType = { title: '', orderNumber: 0 };

	const response = await fetch(`localhost:5000/api/galleries/${params.galleryId}`);
	if (response.ok) {
		gallery = await response.json();
	}

	return <Gallery params={params} gallery={gallery} />;
}
