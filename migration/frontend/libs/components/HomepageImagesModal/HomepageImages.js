'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { updateImage } from '@state/client/images';

export default function HomepageImages({ setShowModal, images }) {
	const dispatch = useDispatch();
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
					<div id='homepage-image-card'>
						<img id='homepage-sort-image' src={image.url} alt='homepage' />
						<input
							type='number'
							placeholder='order'
							value={orders[i].orderNumber}
							onChange={(e) =>
								setOrders((prev) => {
									const newOrders = [...prev];
									newOrders[i] = { ...newOrders[i], orderNumber: e.target.value };
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
