import Image from 'next/image';
import { Image as ImageType } from '@state/@types';
import { Dispatch, SetStateAction } from 'react';

export default function ExpandedGalleryImage({
	image,
}: {
	image: ImageType;
	setShowModal: Dispatch<SetStateAction<boolean>>;
}) {
	return (
		<div
			id='image-modal-container'
			style={{
				width: '85vw',
				height: '85vh',
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			<div
				style={{
					WebkitUserSelect: 'none',
					MozUserSelect: 'none',
					msUserSelect: 'none',
					userSelect: 'none',
					position: 'relative',
					width: '100%',
					height: '100vh',
				}}
			>
				<Image
					src={image?.url ? image.url : ''}
					alt='focused'
					style={{
						objectFit: 'cover',
						objectPosition: 'center',
						position: 'absolute',
					}}
					fill
				/>
			</div>
			<div id='title-description-container'>
				<p id='gallery-image-title'>{image?.title ?? ''}</p>
				<p id='gallery-image-description'>{image?.description ?? ''}</p>
			</div>
		</div>
	);
}
