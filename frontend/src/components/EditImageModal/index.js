import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditImage from './EditImage';

const EditImageModal = ({ image }) => {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<i id='edit-image' className='fa-solid fa-pen' onClick={() => setShowModal(true)}></i>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<EditImage setShowModal={setShowModal} image={image} />
				</Modal>
			)}
		</>
	);
};

export default EditImageModal;
