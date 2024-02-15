'use client';

import { WheelEvent, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { scrollTo, scrollIntoView } from 'seamless-scroll-polyfill';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faKey } from '@fortawesome/free-solid-svg-icons';

import { loadSingleGallery, updateGalleryKey } from '@state/galleries';
import { updateImage, deleteImage } from '@state/images';
import { RootState, useAppDispatch } from '@state/index';
import { setCurrentRoute } from '@state/session';
import type { Image as ImageType } from '@state/@types';

import ImagesFormModal from '../ImagesFormModal';
import EditImageModal from '../EditImageModal';
import DescriptionModal from './DescriptionModal';

import './Gallery.css';
import Image from 'next/legacy/image';

export default function Gallery({ params }: { params: { galleryId: string } }) {
	const gallerySliderRef = useRef<HTMLDivElement>(null);
	const dispatch = useAppDispatch();
	const router = useRouter();
	const { galleryId } = params ?? {};

	const user = useSelector((state: RootState) => state.session.user);
	const imageState = useSelector((state: RootState) => state.images);
	const gallery = useSelector((state: RootState) =>
		state.galleries.find((g) => g.id === Number(galleryId))
	);
	const images = gallery?.images;

	const [noImages, setNoImages] = useState(false);
	const [activeImage, setActiveImage] = useState(0);
	const [windowLength, setWindowLength] = useState(window.innerWidth);
	const [imagesLength, setImagesLength] = useState(0);

	useEffect(() => {
		dispatch(loadSingleGallery(galleryId))
			.then((res) => {
				if (!res?.payload?.images || res?.payload?.images?.length === 0) {
					if (!user) {
						router.push('/not-found');
					}
					setNoImages(true);
				} else setNoImages(false);
			})
			.catch(() => {
				router.push('/not-found');
			});
	}, [dispatch, galleryId, router, user, imageState]);

	useEffect(() => {
		const updateLength = () => {
			setTimeout(() => setWindowLength(window.innerWidth), 500);
		};
		window.addEventListener('resize', updateLength);
		window.addEventListener('orientationchange', updateLength);

		return () => {
			window.removeEventListener('resize', updateLength);
			window.removeEventListener('orientationchange', updateLength);
		};
	}, []);

	useEffect(() => {
		dispatch(setCurrentRoute());
	}, [dispatch]);

	const handleDelete = (image: ImageType, i: number) => {
		if (!image.id) return;
		dispatch(deleteImage(image.id));
		if (image.url === gallery?.keyImageURL && galleryId) {
			dispatch(updateGalleryKey({ galleryId, url: null }));
		}
		if (i === activeImage) setActiveImage(0);
	};

	const updateKeyImage = (url: string) => {
		if (galleryId) dispatch(updateGalleryKey({ galleryId, url }));
	};

	const updateImageOrder = async ({ source, destination }: { source: any; destination: any }) => {
		if (!images || !images.length) return;
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

	const handleScroll = (e: WheelEvent<HTMLDivElement>) => {
		e.stopPropagation();

		const container = gallerySliderRef.current;
		if (container) {
			container.scrollLeft += e.deltaY;
			window.scrollY += 0;
		}
	};

	return (
		<div id='gallery-images-container'>
			{user && <ImagesFormModal galleryId={galleryId} />}
			{noImages ? (
				<h2>No images in this gallery</h2>
			) : (
				<div id='gallery-slideshow' className='fade-in-slide-up'>
					<div id='gallery-slide-container'>
						<FontAwesomeIcon
							id='slide-left'
							icon={faChevronLeft}
							className='fa-solid fa-chevron-left'
							onClick={() => {
								if (activeImage === 0 && images?.length) {
									const sliderPreviewElement = document.querySelector(
										`.slider-preview-${images.length - 1}`
									);
									setActiveImage(images.length - 1);
									if (sliderPreviewElement)
										scrollIntoView(sliderPreviewElement, {
											block: 'end',
											inline: 'nearest',
											behavior: 'smooth',
										});
								} else {
									const sliderPreviewElement = document.querySelector(
										`.slider-preview-${activeImage - 1}`
									);
									setActiveImage((prev) => prev - 1);
									if (sliderPreviewElement)
										scrollIntoView(sliderPreviewElement, {
											block: 'end',
											inline: 'nearest',
											behavior: 'smooth',
										});
								}
							}}
						/>
						<FontAwesomeIcon
							id='slide-right'
							icon={faChevronRight}
							className='fa-solid fa-chevron-right'
							onClick={() => {
								if (activeImage === (images?.length ?? 0) - 1) {
									const sliderPreviewElement =
										document.querySelector(`.slider-preview-0`);
									setActiveImage(0);
									if (sliderPreviewElement)
										scrollIntoView(sliderPreviewElement, {
											block: 'end',
											inline: 'nearest',
											behavior: 'smooth',
										});
								} else {
									const sliderPreviewElement = document.querySelector(
										`.slider-preview-${activeImage + 1}`
									);
									setActiveImage((prev) => prev + 1);
									if (sliderPreviewElement)
										scrollIntoView(sliderPreviewElement, {
											block: 'end',
											inline: 'nearest',
											behavior: 'smooth',
										});
								}
							}}
						/>
					</div>
					{gallery?.images?.map((image, i) => (
						<div id='gallery-image-container' key={`gallery-image-${i}`}>
							<div id='gallery-image'>
								<Image
									id='gallery-image'
									src={image?.url ? image.url : ''}
									alt='focused'
									style={
										activeImage === i
											? { opacity: 1, zIndex: 5 }
											: { opacity: 0 }
									}
									layout='fill'
									objectFit='contain'
									objectPosition='bottom'
								/>
							</div>
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
								<div
									id='gallery-image-description'
									style={
										activeImage === i
											? { opacity: 1, zIndex: 5 }
											: { opacity: 0 }
									}
								>
									{image.description?.length && image.description.length > 300 ? (
										<DescriptionModal description={image.description} />
									) : (
										image.description
									)}
								</div>
							</div>
						</div>
					))}
				</div>
			)}
			{imagesLength > windowLength && (
				<>
					<div id='sliders'>
						<div
							id='slider-slide-left'
							onClick={() => {
								const imagesSlider = document.querySelector('#images-slider');
								if (imagesSlider) {
									scrollTo(imagesSlider, {
										left: imagesSlider.scrollLeft - windowLength + 100,
										behavior: 'smooth',
									});
								}
							}}
							onMouseEnter={(e) => (document.body.style.overflow = 'hidden')}
							onMouseLeave={(e) => (document.body.style.overflow = '')}
							style={{ zIndex: 100 }}
						>
							<FontAwesomeIcon
								icon={faChevronLeft}
								style={{
									fontSize: '80px',
									textAlign: 'center',
									transform: 'translateY(30%)',
								}}
								className='fa-solid fa-chevron-left'
							/>
						</div>
						<div
							id='slider-slide-right'
							onClick={() => {
								const imagesSlider = document.querySelector('#images-slider');
								if (imagesSlider) {
									scrollTo(imagesSlider, {
										left: imagesSlider.scrollLeft + windowLength - 100,
										behavior: 'smooth',
									});
								}
							}}
							onMouseEnter={(e) => (document.body.style.overflow = 'hidden')}
							onMouseLeave={(e) => (document.body.style.overflow = '')}
							style={{ zIndex: 100 }}
						>
							<FontAwesomeIcon
								icon={faChevronRight}
								style={{
									fontSize: '80px',
									textAlign: 'center',
									transform: 'translateY(30%)',
								}}
								className='fa-solid fa-chevron-right'
							/>
						</div>
					</div>
				</>
			)}
			{user ? (
				<DragDropContext onDragEnd={updateImageOrder}>
					<Droppable droppableId={`images-${Date.now()}`} direction='horizontal'>
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
												style={{ position: 'relative' }}
											>
												{user && (
													<div
														style={{
															zIndex: 25,
															height: '100%',
															width: '100%',
															position: 'absolute',
															cursor: 'pointer',
														}}
														onClick={() => setActiveImage(i)}
													>
														<p
															id='delete-image'
															onClick={() => handleDelete(image, i)}
														>
															x
														</p>
														<FontAwesomeIcon
															id='set-key-image'
															icon={faKey}
															className='fa-solid fa-key fa-outline'
															onClick={() =>
																updateKeyImage(image.url ?? '')
															}
															style={
																image.url === gallery.keyImageURL
																	? {
																			color: 'gold',
																			visibility: 'visible',
																			filter: 'none',
																	  }
																	: undefined
															}
														/>
														<EditImageModal image={image} />
													</div>
												)}
												<div
													id='slider-preview'
													className={`slider-preview-${i} fade-in`}
													style={
														activeImage === i
															? {
																	border: '5px solid #C0C0C0',
																	animationDuration: '500ms',
															  }
															: { animationDuration: '500ms' }
													}
												>
													<Image
														className={`slider-preview-${i} fade-in`}
														id='slider-image'
														src={image?.url ? image.url : ''}
														alt='slider-preview'
														onLoad={() =>
															images?.length
																? setImagesLength(
																		images.length *
																			(document.querySelector(
																				'#slider-preview'
																			)?.clientWidth ?? 0) +
																			100
																  )
																: undefined
														}
														layout='fill'
														objectFit='cover'
														objectPosition='center'
														style={{ zIndex: 0 }}
													/>
												</div>
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
				<div
					id='images-slider'
					ref={gallerySliderRef}
					onWheel={handleScroll}
					onMouseEnter={(e) => (document.body.style.overflow = 'hidden')}
					onMouseLeave={(e) => (document.body.style.overflow = '')}
				>
					{gallery?.images?.map((image, i) => (
						<div id='slider-div' key={`slider-preview-${i}`}>
							{user && (
								<div>
									<p id='delete-image' onClick={() => handleDelete(image, i)}>
										x
									</p>
									<FontAwesomeIcon
										id='set-key-image'
										icon={faKey}
										className='fa-solid fa-key fa-outline'
										onClick={() => updateKeyImage(image.url ?? '')}
										style={
											image.url === gallery.keyImageURL
												? {
														color: 'gold',
														visibility: 'visible',
														filter: 'none',
												  }
												: undefined
										}
									/>
									<EditImageModal image={image} />
								</div>
							)}
							<div
								id='slider-preview'
								className={`slider-preview-${i} fade-in`}
								style={
									activeImage === i
										? {
												border: '3px solid #606060',
												animationDuration: '500ms',
										  }
										: { animationDuration: '500ms' }
								}
							>
								<Image
									id='slider-preview'
									className={`slider-preview-${i} fade-in`}
									src={image?.url ? image.url : ''}
									alt='slider-preview'
									onLoad={() =>
										images?.length
											? setImagesLength(
													images.length *
														(document.querySelector('#slider-preview')
															?.clientWidth ?? 0) +
														100
											  )
											: undefined
									}
									onClick={() => setActiveImage(i)}
									layout='fill'
									objectFit='cover'
									objectPosition='center'
								/>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
