import { useState } from 'react';
import { useDispatch } from 'react-redux';
import './GalleryForm.css';
import { addGallery } from '../../store/galleries';

export default function GalleryForm({ setShowModal }) {
	const dispatch = useDispatch();
	const [errors, setErrors] = useState({});
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		return dispatch(
			addGallery({
				title,
				description,
			})
		)
			.then((res) => {
				setShowModal(false);
			})
			.catch(async (res) => {
				const data = await res.json();
				if (data && data.errors) {
					setErrors(data.errors);
				}
			});
	};

	return (
		<div id='gallery-form-container'>
			<form id='gallery-form' onSubmit={handleSubmit}>
				<div>
					<label htmlFor='title'>Title</label>
					{errors?.title && <p id='error'>{errors.title}</p>}
					<input value={title} onChange={(e) => setTitle(e.target.value)} />
				</div>
				<div>
					<label htmlFor='description'>Description</label>
					<textarea
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				</div>
				<div>
					<button id='submit-gallery-button' type='submit'>
						Submit
					</button>
				</div>
			</form>
		</div>
	);
}
