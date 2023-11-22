import React, { useState } from 'react';
import { Modal } from '@context/Modal';
import Description from './Description';

const DescriptionModal = ({ description }) => {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<p onClick={() => setShowModal(true)} style={{ cursor: 'pointer' }}>
				{description.slice(0, 300)}... (click to read more)
			</p>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<Description setShowModal={setShowModal} description={description} />
				</Modal>
			)}
		</>
	);
};

export default DescriptionModal;
