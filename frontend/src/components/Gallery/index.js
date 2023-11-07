import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { scrollTo, scrollIntoView } from 'seamless-scroll-polyfill';

import ImagesFormModal from '../ImagesFormModal';
import EditImageModal from '../EditImageModal';
import DescriptionModal from './DescriptionModal';

import { loadSingleGallery, updateGalleryKey } from '../../store/galleries';
import { updateImage, deleteImage } from '../../store/images';

import './Gallery.css';

export default function Gallery({ setCurrentRoute }) {
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
	const [imagesLength, setImagesLength] = useState(0);

	useEffect(() => {
		dispatch(loadSingleGallery(galleryId))
			.then((res) => {
				if (!res?.images || res?.images?.length === 0) {
					if (!user) {
						history.push('/not-found');
					}
					setNoImages(true);
				} else setNoImages(false);
			})
			.catch(() => {
				history.push('/not-found');
			});
	}, [dispatch, galleryId, history, user, imageState]);

	useEffect(() => {
		const updateLength = () => {
			setTimeout(setWindowLength(window.innerWidth), 500);
		};
		window.addEventListener('resize', updateLength);
		window.addEventListener('orientationchange', updateLength);

		return () => {
			window.removeEventListener('resize', updateLength);
			window.removeEventListener('orientationchange', updateLength);
		};
	}, []);

	useEffect(() => {
		setCurrentRoute(window.location.href);
	}, [setCurrentRoute]);

	const handleDelete = (image, i) => {
		dispatch(deleteImage(image.id));
		if (image.url === gallery.keyImageURL) {
			dispatch(updateGalleryKey(galleryId, null));
		}
		if (i === activeImage) setActiveImage(0);
	};

	const updateKeyImage = (url) => {
		dispatch(updateGalleryKey(galleryId, url));
	};

	const updateImageOrder = async ({ source, destination }) => {
		const newImages = [...images];
		const [reorderedImage] = newImages.splice(source.index, 1);
		newImages.splice(destination.index, 0, reorderedImage);

		newImages.forEach(async (image, i) => {
			if (image.orderNumber !== i) {
				await dispatch(
					updateImage({
						id: image.id,
						title: image.title,
						isHomepageImage: image.isHomepageImage,
						orderNumber: i,
						homepageOrderNumber: image.homepageOrderNumber,
					})
				);
			}
		});
	};

	return (
		<div id='gallery-images-container'>
			{user && <ImagesFormModal galleryId={galleryId} />}
			{noImages ? (
				<h2>No images in this gallery</h2>
			) : (
				<div id='gallery-slideshow' className='fade-in-slide-up'>
					<div id='gallery-slide-container'>
						<i
							id='slide-left'
							className='fa-solid fa-chevron-left'
							onClick={() => {
								if (activeImage === 0) {
									setActiveImage(images?.length - 1);
									scrollIntoView(
										document.querySelector(
											`.slider-preview-${images?.length - 1}`
										),
										{
											block: 'end',
											inline: 'nearest',
											behavior: 'smooth',
										}
									);
								} else {
									setActiveImage((prev) => prev - 1);
									scrollIntoView(
										document.querySelector(
											`.slider-preview-${activeImage - 1}`
										),
										{
											block: 'end',
											inline: 'nearest',
											behavior: 'smooth',
										}
									);
								}
							}}
						></i>
						<i
							id='slide-right'
							className='fa-solid fa-chevron-right'
							onClick={() => {
								if (activeImage === images?.length - 1) {
									setActiveImage(0);
									scrollIntoView(document.querySelector(`.slider-preview-0`), {
										block: 'end',
										inline: 'nearest',
										behavior: 'smooth',
									});
								} else {
									setActiveImage((prev) => prev + 1);
									scrollIntoView(
										document.querySelector(
											`.slider-preview-${activeImage + 1}`
										),
										{
											block: 'end',
											inline: 'nearest',
											behavior: 'smooth',
										}
									);
								}
							}}
						></i>
					</div>
					{gallery?.images?.map((image, i) => (
						<div id='gallery-image-container' key={`gallery-image-${i}`}>
							<img
								id='gallery-image'
								src={image.url}
								alt='focused'
								style={
									activeImage === i ? { opacity: 1, zIndex: 5 } : { opacity: 0 }
								}
							/>
							<div id='title-description-container'>
								<p
									id='gallery-image-title'
									style={
										activeImage === i
											? { opacity: 1, zIndex: 5 }
											: { opacity: 0 }
									}
								>
									{image.title}
								</p>
								<p
									id='gallery-image-description'
									style={
										activeImage === i
											? { opacity: 1, zIndex: 5 }
											: { opacity: 0 }
									}
								>
									{image.description?.length > 300 ? (
										<DescriptionModal description={image.description} />
									) : (
										image.description
									)}
								</p>
							</div>
						</div>
					))}
				</div>
			)}
			{imagesLength > windowLength && (
				<>
					<div id='sliders'>
						<i
							id='slider-slide-left'
							className='fa-solid fa-chevron-left'
							onClick={() => {
								scrollTo(document.querySelector('#images-slider'), {
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
								scrollTo(document.querySelector('#images-slider'), {
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
			{user ? (
				<DragDropContext onDragEnd={updateImageOrder}>
					<Droppable droppableId='images' direction='horizontal'>
						{(provided) => (
							<div
								id='images-slider'
								{...provided.droppableProps}
								ref={provided.innerRef}
								style={{ overflowX: 'scroll' }}
							>
								{gallery?.images?.map((image, i) => (
									<Draggable
										key={`slider-preview-${i}`}
										draggableId={`${image.title}-${i}`}
										index={i}
									>
										{(provided) => (
											<div
												id='slider-div'
												ref={provided.innerRef}
												{...provided.draggableProps}
												{...provided.dragHandleProps}
											>
												{user && (
													<div>
														<p
															id='delete-image'
															onClick={() => handleDelete(image, i)}
														>
															x
														</p>
														<i
															id='set-key-image'
															className='fa-solid fa-key'
															onClick={() =>
																updateKeyImage(image.url)
															}
															style={
																image.url === gallery.keyImageURL
																	? {
																			color: 'gold',
																			visibility: 'visible',
																	  }
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
													onLoad={() =>
														setImagesLength(
															images?.length *
																document.querySelector(
																	'#slider-preview'
																)?.clientWidth +
																100
														)
													}
													className={`slider-preview-${i} fade-in`}
													style={
														activeImage === i
															? {
																	border: '5px solid #C0C0C0',
																	animationDuration: '500ms',
															  }
															: { animationDuration: '500ms' }
													}
												/>
											</div>
										)}
									</Draggable>
								))}
								{provided.placeholder}
							</div>
						)}
					</Droppable>
				</DragDropContext>
			) : (
				<div id='images-slider'>
					{gallery?.images?.map((image, i) => (
						<div id='slider-div' key={`slider-preview-${i}`}>
							{user && (
								<div>
									<p id='delete-image' onClick={() => handleDelete(image, i)}>
										x
									</p>
									<i
										id='set-key-image'
										className='fa-solid fa-key'
										onClick={() => updateKeyImage(image.url)}
										style={
											image.url === gallery.keyImageURL
												? {
														color: 'gold',
														visibility: 'visible',
												  }
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
								onLoad={() =>
									setImagesLength(
										images?.length *
											document.querySelector('#slider-preview')?.clientWidth +
											100
									)
								}
								onClick={() => setActiveImage(i)}
								className={`slider-preview-${i} fade-in`}
								style={
									activeImage === i
										? {
												border: '5px solid #C0C0C0',
												animationDuration: '500ms',
										  }
										: { animationDuration: '500ms' }
								}
							/>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
