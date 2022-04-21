import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import GalleryFormModal from '../GalleryFormModal';
import './GalleryList.css';
import { loadGalleries } from '../../store/galleries';

export default function GalleryList() {
	const dispatch = useDispatch();
	const galleries = useSelector((state) => Object.values(state.galleries));
	const user = useSelector((state) => state.session.user);

	useEffect(() => {
		dispatch(loadGalleries());
	}, [dispatch]);

	return (
		<div id='gallery-list-container'>
			<div id='gallery-list-header'>
				{user && <GalleryFormModal />}
				<h2>GALLERIES</h2>
				<p>
					For fine art print inquiries, please contact{' '}
					<a href='mailto:info@elmarschimttou.com'>info@elmarschmittou.com</a>
				</p>
			</div>
			<div id='gallery-node-container'>
				{galleries.map(
					(gallery) =>
						(gallery.images?.length || user) && (
							<div id='gallery-node' key={`gallery-${gallery.id}`}>
								<Link to={`/galleries/${gallery.id}`}>
									<img
										id='gallery-node-image'
										src={
											gallery.keyImageURL
												? gallery.keyImageURL
												: 'https://esphotography.s3.us-east-2.amazonaws.com/placeholder-image.png'
										}
										alt={gallery.title}
									/>
									<p id='gallery-title'>{gallery.title}</p>
								</Link>
							</div>
						)
				)}
			</div>
		</div>
	);
}
