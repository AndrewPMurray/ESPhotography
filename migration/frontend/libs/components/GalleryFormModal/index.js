import React, { useState } from 'react';
import { Modal } from '@context/Modal';
import GalleryForm from './GalleryForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

const GalleryFormModal = ({ gallery }) => {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			{gallery ? (
				<FontAwesomeIcon
					id='edit-gallery'
					icon={faPen}
					className='fa-solid fa-pen'
					onClick={() => setShowModal(true)}
				/>
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
