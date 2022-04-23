import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
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

	const [noImages, setNoImages] = useState(false);
	const [activeImage, setActiveImage] = useState(0);
	const [windowLength, setWindowLength] = useState(window.innerWidth);

	useEffect(() => {
		dispatch(loadSingleGallery(galleryId))
			.then((res) => {
				if (!res?.images || res?.images?.length === 0) {
					if (!user) {
						history.push('/not-found');
					}
					setNoImages(true);
				}
			})
			.catch(() => {
				history.push('/not-found');
			});
	}, [dispatch, galleryId, history, user, imageState]);

	useEffect(() => {
		const updateLength = () => {
			setWindowLength(window.innerWidth);
		};
		window.addEventListener('resize', updateLength);

		return () => window.removeEventListener('resize', updateLength);
	}, []);

	const handleDelete = (image) => {
		dispatch(deleteImage(image.id));
		if (image.url === gallery.keyImageURL) {
			dispatch(updateGalleryKey(galleryId, null));
		}
	};

	const updateKeyImage = (url) => {
		dispatch(updateGalleryKey(galleryId, url));
	};

	return (
		<div id='gallery-images-container'>
			{user && <ImagesFormModal galleryId={galleryId} />}
			{noImages ? (
				<h2>No images in this gallery</h2>
			) : (
				<div id='gallery-slideshow' className='fade-in-slide-up'>
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
			)}
			{document.querySelector('#images-slider')?.scrollWidth > windowLength && (
				<>
					<div id='sliders'>
						<i
							id='slider-slide-left'
							className='fa-solid fa-chevron-left'
							onClick={() => {
								document.querySelector('#images-slider').scrollTo({
									left:
										document.querySelector('#images-slider').scrollLeft -
										windowLength +
										100,
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
										windowLength -
										100,
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
							className='fade-in'
							style={
								activeImage === i
									? { border: '5px solid #C0C0C0', animationDuration: '500ms' }
									: { animationDuration: '500ms' }
							}
						/>
					</div>
				))}
			</div>
		</div>
	);
}
