import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import GalleryForm from './GalleryForm';

const GalleryFormModal = ({ gallery }) => {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			{gallery ? (
				<i
					id='edit-gallery'
					className='fa-solid fa-pen'
					onClick={() => setShowModal(true)}
				></i>
			) : (
				<button id='add-gallery-button' onClick={() => setShowModal(true)}>
					Add Gallery
				</button>
			)}
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<GalleryForm setShowModal={setShowModal} gallery={gallery} />
				</Modal>
			)}
		</>
	);
};

export default GalleryFormModal;
