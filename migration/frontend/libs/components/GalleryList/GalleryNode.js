import Link from 'next/link';
import GalleryFormModal from '../GalleryFormModal';

export default function GalleryNode({ gallery, user, provided, i }) {
	return (
		<div
			ref={provided?.innerRef || null}
			{...(provided?.draggableProps || null)}
			{...(provided?.dragHandleProps || null)}
		>
			<div
				id='gallery-node'
				onLoad={(e) =>
					setTimeout(() => {
						e.target.style.opacity = 1;
					}, i * 50)
				}
			>
				<Link href={`/galleries/${gallery.id}`}>
					<img
						id='gallery-node-image'
						src={
							gallery.keyImageURL
								? gallery.keyImageURL
								: 'https://minio.domainofaka.app/esphotography/placeholder-image.png'
						}
						alt={gallery.title}
						style={{
							opacity: 0,
						}}
					/>
					<p id='gallery-title'>{gallery.title}</p>
				</Link>
				{user && <GalleryFormModal gallery={gallery} />}
			</div>
		</div>
	);
}
