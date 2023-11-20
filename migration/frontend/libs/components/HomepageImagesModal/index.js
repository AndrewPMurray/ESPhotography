'use client';

import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import HomepageImages from './HomepageImages';

import './HomepageImages.css';

const HomepageImagesModal = ({ images }) => {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<button id='sort-homepage-images-button' onClick={() => setShowModal(true)}>
				Sort homepage images
			</button>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<HomepageImages images={images} setShowModal={setShowModal} />
				</Modal>
			)}
		</>
	);
};

export default HomepageImagesModal;
