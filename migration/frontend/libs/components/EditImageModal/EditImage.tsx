import { type Dispatch, type FormEventHandler, type SetStateAction, useState } from 'react';
import { useDispatch } from 'react-redux';

import { updateImage } from '@state/images';
import { useAppDispatch } from '@state/index';
import type { Image } from '@state/@types';

import './EditImage.css';

type ErrorType = {
	title?: string;
	description?: string;
};

export default function EditImage({
	setShowModal,
	image,
}: {
	setShowModal: Dispatch<SetStateAction<boolean>>;
	image: Image;
}) {
	const dispatch = useAppDispatch();
	const [errors, setErrors] = useState<ErrorType>({});
	const [title, setTitle] = useState(image.title);
	const [description, setDescription] = useState(image.description);
	const [isHomepage, setIsHomepage] = useState(image.isHomepageImage);

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault();
		setErrors({});
		return dispatch(
			updateImage({
				id: image.id,
				title,
				description,
				isHomepageImage: isHomepage,
				orderNumber: image.orderNumber,
				homepageOrderNumber: image.homepageOrderNumber,
			})
		)
			.then(() => {
				setShowModal(false);
			})
			.catch(async (res: any) => {
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
				<div id='edit-image-description'>
					<label htmlFor='title'>Description</label>
					{errors?.description && <p id='error'>{errors.description}</p>}
					<textarea
						rows={3}
						style={{ resize: 'none' }}
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				</div>
				<div id='is-homepage-checkbox'>
					<label htmlFor='description'>Homepage Image: </label>
					<input
						type='checkbox'
						checked={isHomepage}
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
