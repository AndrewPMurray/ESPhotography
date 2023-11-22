import Link from 'next/link';
import GalleryFormModal from '../GalleryFormModal';
import { Gallery, User } from '@state/@types';
import { DraggableProvided } from 'react-beautiful-dnd';

type GalleryNodeProps = {
	gallery: Gallery;
	user?: User;
	provided?: DraggableProvided;
	i: number;
};

export default function GalleryNode({ gallery, user, provided, i }: GalleryNodeProps) {
	return (
		<div
			ref={provided?.innerRef || null}
			{...(provided?.draggableProps || null)}
			{...(provided?.dragHandleProps || null)}
		>
			<div
				id='gallery-node'
				onLoad={(e) => {
					const target = e.target as HTMLDivElement;
					setTimeout(() => {
						target.style.opacity = '1';
					}, i * 50);
				}}
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
