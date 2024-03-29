'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Image from 'next/image';

import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { loadHomeImages } from '@state/images';
import { useAppDispatch, type RootState } from '@state/index';
import { setCurrentRoute } from '@state/session';

import HomepageImagesModal from '../HomepageImagesModal';

import './HomePage.css';

export default function HomePage() {
	const dispatch = useAppDispatch();
	const images = useSelector((state: RootState) => Object.values(state.images)) ?? [];
	const sortedImages = images.sort((a, b) => a.orderNumber - b.orderNumber);
	const user = useSelector((state: RootState) => state.session.user);
	const [activeImage, setActiveImage] = useState(0);
	const [imageChanged, setImageChanged] = useState(false);

	useEffect(() => {
		dispatch(loadHomeImages());
		dispatch(setCurrentRoute());
	}, [dispatch]);

	const timer = () => setTimeout(() => setImageChanged(false), 5000);

	useEffect(() => {
		const changePhoto = setInterval(() => {
			if (imageChanged) return;
			setActiveImage(activeImage === images.length - 1 ? 0 : activeImage + 1);
		}, 5000);

		return () => {
			clearInterval(changePhoto);
			clearTimeout(timer());
		};
	});

	return (
		<div id='landing-container'>
			{images?.length > 0 && (
				<div
					id='home-slideshow'
					className='fade-in-slide-up'
					style={{ animationDuration: '2000ms' }}
				>
					{sortedImages?.map((image, i) => (
						<div id='home-image-container' key={`gallery-image-${i}`}>
							<div id='home-image'>
								<Image
									src={image.url ?? ''}
									id='home-image'
									alt='focused'
									style={
										activeImage === i
											? {
													opacity: 1,
													zIndex: 5,
													objectFit: 'cover',
													objectPosition: 'center',
											  }
											: {
													opacity: 0,
													objectFit: 'cover',
													objectPosition: 'center',
											  }
									}
									fill
									priority
								/>
							</div>
							<FontAwesomeIcon
								id='slide-left'
								icon={faChevronLeft}
								className='fa-solid fa-chevron-left'
								onClick={() => {
									setImageChanged(true);
									if (activeImage === 0) setActiveImage(images.length - 1);
									else setActiveImage(activeImage - 1);
									timer();
								}}
							/>
							<FontAwesomeIcon
								id='slide-right'
								icon={faChevronRight}
								className='fa-solid fa-chevron-right'
								onClick={() => {
									setImageChanged(true);
									if (activeImage === images.length - 1) setActiveImage(0);
									else setActiveImage(activeImage + 1);
									timer();
								}}
							/>
						</div>
					))}
				</div>
			)}
			{user && sortedImages.length > 0 && <HomepageImagesModal images={sortedImages} />}
		</div>
	);
}
