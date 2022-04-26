import { useState } from 'react';
import { useDispatch } from 'react-redux';
import './EditImage.css';
import { updateImage } from '../../store/images';

export default function EditImage({ setShowModal, image }) {
	const dispatch = useDispatch();
	const [errors, setErrors] = useState({});
	const [title, setTitle] = useState(image.title);
	const [isHomepage, setIsHomepage] = useState(image.isHomepageImage || false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrors({});
		return dispatch(
			updateImage({
				id: image.id,
				title,
				isHomepageImage: isHomepage,
				orderNumber: image.orderNumber,
				homepageOrderNumber: image.homepageOrderNumber,
			})
		)
			.then(() => {
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
		<div id='edit-image-form-container'>
			<img id='edit-image-preview' src={image.url} alt='edit-preview' />
			<form id='edit-image-form' onSubmit={handleSubmit}>
				<div id='edit-image-title'>
					<label htmlFor='title'>Title</label>
					{errors?.title && <p id='error'>{errors.title}</p>}
					<input value={title} onChange={(e) => setTitle(e.target.value)} />
				</div>
				<div id='is-homepage-checkbox'>
					<label htmlFor='description'>Homepage Image: </label>
					<input
						type='checkbox'
						value={isHomepage}
						defaultChecked={isHomepage}
						onChange={() => setIsHomepage(!isHomepage)}
					/>
				</div>
				<div id='submit-image-button-container'>
					<button id='submit-image-button' type='submit'>
						Submit
					</button>
				</div>
			</form>
		</div>
	);
}
