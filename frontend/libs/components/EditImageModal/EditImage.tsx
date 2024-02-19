import { type Dispatch, type FormEventHandler, type SetStateAction, useState } from 'react';
import { useDispatch } from 'react-redux';

import { updateImage } from '@state/images';
import { useAppDispatch } from '@state/index';
import type { Image as ImageType } from '@state/@types';

import './EditImage.css';
import Image from 'next/legacy/image';

type ErrorType = {
	title?: string;
	description?: string;
};

export default function EditImage({
	setShowModal,
	image,
}: {
	setShowModal: Dispatch<SetStateAction<boolean>>;
	image: ImageType;
}) {
	const dispatch = useAppDispatch();
	const [errors, setErrors] = useState<ErrorType>({});
	const [title, setTitle] = useState(image.title);
	const [description, setDescription] = useState(image.description);
	const [isHomepage, setIsHomepage] = useState(image.isHomepageImage);
	const [isPortrait, setIsPortrait] = useState(image.isPortrait);

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
				isPortrait: isPortrait,
				portraitOrderNumber: image.portraitOrderNumber,
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
			<div id='edit-image-preview'>
				<Image src={image.url ?? ''} alt='edit-preview' objectFit='contain' layout='fill' />
			</div>
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
					<label htmlFor='homepageImage'>Homepage Image: </label>
					<input
						type='checkbox'
						checked={isHomepage}
						defaultChecked={isHomepage}
						onChange={() => setIsHomepage(!isHomepage)}
					/>
				</div>
				<div id='is-portrait-checkbox'>
					<label htmlFor='portraitImage'>Portrait Image: </label>
					<input
						type='checkbox'
						checked={isPortrait}
						defaultChecked={isPortrait}
						onChange={() => setIsPortrait(!isPortrait)}
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
