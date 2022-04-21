import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { loadImages } from '../../store/images';
import './HomePage.css';

export default function HomePage() {
	const dispatch = useDispatch();
	const [imageURL, setImageURL] = useState(null);

	useEffect(() => {
		dispatch(loadImages());
	}, [dispatch]);

	useEffect(() => {
		const changePhoto = setInterval(() => {}, 5000);
	});

	return (
		<div id='landing-container'>
			{imageURL && (
				<div id='slideshow'>
					<i className='fa-solid fa-chevron-left'></i>
					<i className='fa-solid fa-chevron-right'></i>
					<img id='homepage-image' src={imageURL} />
				</div>
			)}
		</div>
	);
}
