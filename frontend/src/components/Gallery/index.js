import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import ImagesFormModal from '../ImagesFormModal';
import { loadSingleGallery } from '../../store/galleries';
import { deleteImage } from '../../store/images';
import './Gallery.css';

export default function Gallery() {
	const dispatch = useDispatch();
	const history = useHistory();
	const { galleryId } = useParams();
	const images = useSelector((state) => state.images);
	const user = useSelector((state) => state.session.user);
	const gallery = useSelector((state) => state.galleries[galleryId]);

	useEffect(() => {
		dispatch(loadSingleGallery(galleryId)).catch(() => {
			history.push('/not-found');
		});
	}, [dispatch, galleryId, history, images]);

	const handleDelete = (imageId) => {
		dispatch(deleteImage(imageId));
	};

	return (
		<div id='gallery-images-container'>
			{user && <ImagesFormModal galleryId={galleryId} />}
			<div id='gallery-slideshow'>
				<i className='fa-solid fa-chevron-left'></i>
				<i className='fa-solid fa-chevron-right'></i>
				{gallery.images.length > 0 && (
					<img id='gallery-image' src={gallery?.images[0]?.url} alt='focused' />
				)}
			</div>
			<div id='images-slider'>
				{gallery?.images?.map((image) => (
					<div>
						{user && (
							<p id='delete-image' onClick={() => handleDelete(image.id)}>
								X
							</p>
						)}
						<img id='slider-preview' src={image.url} alt='slider-preview' />
					</div>
				))}
			</div>
		</div>
	);
}
