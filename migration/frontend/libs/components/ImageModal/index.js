import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '../../context/Modal';
import { deleteImage } from '../../store/images';
import Image from './Image';

const ImageModal = ({ image }) => {
	const user = useSelector((state) => state.session.user);
	const dispatch = useDispatch();
	const [showModal, setShowModal] = useState(false);

	const handleDelete = async (imageId) => {
		dispatch(deleteImage(imageId));
	};

	return (
		<div id='img-div'>
			{user && (
				<p id='delete-img' onClick={() => handleDelete(image.id)}>
					x
				</p>
			)}
			<img
				id='portfolio-img'
				src={image.url}
				alt='thumbnail'
				onClick={() => setShowModal(true)}
			/>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<Image setShowModal={setShowModal} imageURL={image.url} />
				</Modal>
			)}
		</div>
	);
};

export default ImageModal;
