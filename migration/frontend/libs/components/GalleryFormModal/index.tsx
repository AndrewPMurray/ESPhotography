import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

import { Modal } from '@context/Modal';
import { Gallery } from '@state/@types/galleries';

import GalleryForm from './GalleryForm';

const GalleryFormModal = ({ gallery }: { gallery?: Gallery }) => {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			{gallery ? (
				<FontAwesomeIcon
					id='edit-gallery'
					icon={faPen}
					className='fa-solid fa-pen fa-outline'
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
