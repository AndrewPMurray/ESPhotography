import React, { Dispatch, SetStateAction, useState } from 'react';
import Image from 'next/image';
import { Modal } from '@context/Modal';
import Description from './ExpandedGalleryImage';
import { Image as ImageType } from '@state/@types';

type GalleryImageModalProps = {
	modifiedImageHeight: string | number | undefined;
	image: ImageType;
	i: number;
	setImageTarget: Dispatch<SetStateAction<HTMLImageElement | null>>;
	updateImageDimensions: (
		target: HTMLImageElement | null
	) => { width: number; height: number } | undefined;
	imageWidth: number;
};

const GalleryImageModal = ({
	modifiedImageHeight,
	image,
	i,
	setImageTarget,
	updateImageDimensions,
	imageWidth,
}: GalleryImageModalProps) => {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<div
				id='gallery-image-container'
				className='fade-in'
				style={{
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					maxHeight: '80vh',
					cursor: 'pointer',
				}}
				onClick={() => setShowModal(true)}
			>
				<div
					id='gallery-image'
					style={{
						WebkitUserSelect: 'none',
						MozUserSelect: 'none',
						msUserSelect: 'none',
						userSelect: 'none',
						width: '95vw',
						height: modifiedImageHeight,
						maxHeight: '60vh',
					}}
				>
					<Image
						id='gallery-image-inner'
						className={`gallery-image-${i}`}
						src={image?.url ? image.url : ''}
						alt='focused'
						style={{
							objectFit: 'contain',
							objectPosition: 'center',
						}}
						fill
						sizes='m'
						onLoad={(e: any) => {
							const target = e.target as HTMLImageElement;
							setImageTarget(() => target);
							updateImageDimensions(target);
						}}
						priority
					/>
				</div>
				<div id='title-description-container' style={{ width: imageWidth ?? '100vw' }}>
					<p
						id='gallery-image-title'
						style={{
							zIndex: 5,
							WebkitUserSelect: 'none',
							MozUserSelect: 'none',
							msUserSelect: 'none',
							userSelect: 'none',
						}}
					>
						{image.title}
					</p>
					<div
						id='gallery-image-description'
						style={{
							zIndex: 5,
							WebkitUserSelect: 'none',
							MozUserSelect: 'none',
							msUserSelect: 'none',
							userSelect: 'none',
							minWidth: '550px',
						}}
					>
						{image.description?.length && image.description.length > 100
							? `${image.description.slice(100)}...`
							: image.description}
					</div>
				</div>
			</div>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<Description setShowModal={setShowModal} image={image} />
				</Modal>
			)}
		</>
	);
};

export default GalleryImageModal;
