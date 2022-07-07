import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadHomeImages } from '../../store/images';
import './HomePage.css';

export default function HomePage() {
	const dispatch = useDispatch();
	const images = useSelector((state) => Object.values(state.images));
	const [activeImage, setActiveImage] = useState(0);
	const [imageChanged, setImageChanged] = useState(false);

	useEffect(() => {
		dispatch(loadHomeImages());
	}, [dispatch]);

	const timer = () => {
		setTimeout(() => setImageChanged(false), 5000);
	};

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
					{images?.map((image, i) => (
						<div id='home-image-container' key={`gallery-image-${i}`}>
							<img
								id='home-image'
								src={image.url}
								alt='focused'
								style={
									activeImage === i ? { opacity: 1, zIndex: 5 } : { opacity: 0 }
								}
							/>
							<i
								id='home-slide-left'
								className='fa-solid fa-chevron-left'
								onClick={() => {
									setImageChanged(true);
									if (activeImage === 0) setActiveImage(images.length - 1);
									else setActiveImage(activeImage - 1);
									timer();
								}}
							></i>
							<i
								id='home-slide-right'
								className='fa-solid fa-chevron-right'
								onClick={() => {
									setImageChanged(true);
									if (activeImage === images.length - 1) setActiveImage(0);
									else setActiveImage(activeImage + 1);
									timer();
								}}
							></i>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
