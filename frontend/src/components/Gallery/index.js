import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Link } from 'react-scroll';
import ImagesFormModal from '../ImagesFormModal';
import EditImageModal from '../EditImageModal';
import { loadSingleGallery, updateGalleryKey } from '../../store/galleries';
import { deleteImage } from '../../store/images';
import './Gallery.css';

export default function Gallery() {
	const dispatch = useDispatch();
	const history = useHistory();
	const { galleryId } = useParams();

	const user = useSelector((state) => state.session.user);
	const imageState = useSelector((state) => state.images);
	const gallery = useSelector((state) => state.galleries[galleryId]);
	const images = useSelector((state) => state.galleries[galleryId]?.images);

	const [activeImage, setActiveImage] = useState(0);

	useEffect(() => {
		if (!gallery) {
			dispatch(loadSingleGallery(galleryId))
				.then((res) => {
					if ((!res?.images || res?.images?.length === 0) && !user)
						history.push('/not-found');
				})
				.catch(() => {
					history.push('/not-found');
				});
		}
	}, [dispatch, gallery, galleryId, history, user]);

	useEffect(() => {
		dispatch(loadSingleGallery(galleryId));
	}, [imageState, dispatch, galleryId]);

	const handleDelete = (image) => {
		dispatch(deleteImage(image.id));
		if (image.url === gallery.keyImageURL) {
			dispatch(updateGalleryKey(galleryId, null));
		}
	};

	const updateKeyImage = (url) => {
		dispatch(updateGalleryKey(galleryId, url));
	};

	if (!gallery?.images || gallery?.images?.length === 0) {
		return (
			<div id='gallery-images-container'>
				{user && <ImagesFormModal galleryId={galleryId} />}
				<h2>No images in this gallery</h2>
			</div>
		);
	}

	return (
		<div id='gallery-images-container'>
			{user && <ImagesFormModal galleryId={galleryId} />}
			<div id='gallery-slideshow'>
				<i
					id='gallery-slide-left'
					className='fa-solid fa-chevron-left'
					onClick={() => {
						if (activeImage === 0) setActiveImage(images.length - 1);
						else setActiveImage(activeImage - 1);
					}}
				></i>
				<i
					id='gallery-slide-right'
					className='fa-solid fa-chevron-right'
					onClick={() => {
						if (activeImage === images.length - 1) setActiveImage(0);
						else setActiveImage(activeImage + 1);
					}}
				></i>
				{gallery?.images?.map((image, i) => (
					<div id='gallery-image-container' key={`gallery-image-${i}`}>
						<img
							id='gallery-image'
							src={image.url}
							alt='focused'
							style={activeImage === i ? { opacity: 1 } : { opacity: 0 }}
						/>
						<p
							id='gallery-image-title'
							style={activeImage === i ? { opacity: 1 } : { opacity: 0 }}
						>
							{image.title}
						</p>
					</div>
				))}
			</div>
			{document.querySelector('#images-slider')?.scrollWidth > window.innerWidth && (
				<>
					<div id='sliders'>
						<i
							id='slider-slide-left'
							className='fa-solid fa-chevron-left'
							onClick={() => {
								document.querySelector('#images-slider').scrollTo({
									left:
										document.querySelector('#images-slider').scrollLeft -
										window.innerWidth -
										1,
									behavior: 'smooth',
								});
							}}
						></i>
						<i
							id='slider-slide-right'
							className='fa-solid fa-chevron-right'
							onClick={() => {
								document.querySelector('#images-slider').scrollTo({
									left:
										document.querySelector('#images-slider').scrollLeft +
										window.innerWidth +
										1,
									behavior: 'smooth',
								});
							}}
						></i>
					</div>
				</>
			)}
			<div id='images-slider'>
				{gallery?.images?.map((image, i) => (
					<div id='slider-div' key={`slider-preview-${i}`}>
						{user && (
							<div>
								<p id='delete-image' onClick={() => handleDelete(image)}>
									x
								</p>
								<i
									id='set-key-image'
									className='fa-solid fa-key'
									onClick={() => updateKeyImage(image.url)}
									style={
										image.url === gallery.keyImageURL
											? { color: 'gold', visibility: 'visible' }
											: null
									}
								></i>
								<EditImageModal image={image} />
							</div>
						)}
						<img
							id='slider-preview'
							src={image?.url}
							alt='slider-preview'
							onClick={() => setActiveImage(i)}
						/>
					</div>
				))}
			</div>
		</div>
	);
}
