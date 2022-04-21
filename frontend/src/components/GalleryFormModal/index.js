import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import GalleryForm from './GalleryForm';

const GalleryFormModal = () => {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<button id='add-gallery-button' onClick={() => setShowModal(true)}>
				Add Gallery
			</button>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<GalleryForm setShowModal={setShowModal} />
				</Modal>
			)}
		</>
	);
};

export default GalleryFormModal;
