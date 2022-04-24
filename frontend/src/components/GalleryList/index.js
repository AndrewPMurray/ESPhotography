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
				<h2>Galleries</h2>
				<p>
					For fine art print inquiries, please contact{' '}
					<a href='mailto:info@elmarschimttou.com'>info@elmarschmittou.com</a>
				</p>
			</div>
			<div id='gallery-node-container'>
				{galleries.map(
					(gallery, i) =>
						(gallery.images?.length > 0 || user) && (
							<div
								id='gallery-node'
								key={`gallery-${gallery.id}`}
								onLoad={(e) =>
									setTimeout(() => {
										e.target.style.opacity = 1;
									}, i * 50)
								}
							>
								<Link to={`/galleries/${gallery.id}`}>
									<img
										id='gallery-node-image'
										src={
											gallery.keyImageURL
												? gallery.keyImageURL
												: 'https://esphotography.s3.us-east-2.amazonaws.com/placeholder-image.png'
										}
										alt={gallery.title}
										style={{ opacity: 0 }}
									/>
									<p id='gallery-title'>{gallery.title}</p>
								</Link>
								{user && <GalleryFormModal gallery={gallery} />}
							</div>
						)
				)}
			</div>
		</div>
	);
}
