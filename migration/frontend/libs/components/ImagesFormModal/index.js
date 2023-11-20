import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import ImagesForm from './ImagesForm';

const ImagesFormModal = ({ galleryId }) => {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<button id='add-images-button' onClick={() => setShowModal(true)}>
				Add Images
			</button>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<ImagesForm setShowModal={setShowModal} galleryId={galleryId} />
				</Modal>
			)}
		</>
	);
};

export default ImagesFormModal;
