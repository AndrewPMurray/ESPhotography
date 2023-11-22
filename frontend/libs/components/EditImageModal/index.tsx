import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditImage from './EditImage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

import type { Image } from '@state/@types';

const EditImageModal = ({ image }: { image: Image }) => {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<FontAwesomeIcon
				id='edit-image'
				icon={faPen}
				className='fa-solid fa-pen fa-outline'
				onClick={() => setShowModal(true)}
			/>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<EditImage setShowModal={setShowModal} image={image} />
				</Modal>
			)}
		</>
	);
};

export default EditImageModal;
