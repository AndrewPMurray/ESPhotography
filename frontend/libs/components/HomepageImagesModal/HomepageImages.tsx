'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import Image from 'next/image';

import { updateImage } from '@state/images';
import { useAppDispatch } from '@state/index';
import type { Image as ImageType } from '@state/@types';

type HomepageImagesProps = {
	setShowModal: Dispatch<SetStateAction<boolean>>;
	images: ImageType[];
};

export default function HomepageImages({ setShowModal, images }: HomepageImagesProps) {
	const dispatch = useAppDispatch();
	const [orders, setOrders] = useState(images);

	const handleSubmit = () => {
		orders.forEach((order, i) => {
			dispatch(updateImage(order));
			if (i === orders.length - 1) setShowModal(false);
		});
	};

	if (images.length === 0)
		return (
			<p>
				No homepage images. Please mark images as homepage images before changing sort order
			</p>
		);
	return (
		<>
			<div id='homepage-images-container'>
				{images.map((image, i) => (
					<div id='homepage-image-card' key={`homepage-image-${i}`}>
						<div id='homepage-sort-image'>
							<Image
								src={image.url ?? ''}
								alt='homepage'
								fill
								style={{ objectFit: 'cover', objectPosition: 'center' }}
							/>
						</div>
						<input
							type='number'
							placeholder='order'
							value={orders[i].orderNumber}
							onChange={(e) =>
								setOrders((prev) => {
									const newOrders = [...prev];
									newOrders[i] = {
										...newOrders[i],
										orderNumber: Number(e.target.value),
									};
									return newOrders;
								})
							}
						/>
					</div>
				))}
				<button id='submit-homepage-order-change' onClick={handleSubmit}>
					Update Order
				</button>
			</div>
		</>
	);
}
