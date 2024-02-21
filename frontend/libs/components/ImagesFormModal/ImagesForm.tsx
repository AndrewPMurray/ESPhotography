'use client';

import { type Dispatch, type SetStateAction, useState } from 'react';
import Image from 'next/image';
import { FileUploader } from 'react-drag-drop-files';

import { addImage } from '@state/images';
import { useAppDispatch } from '@state/index';

import './ImagesForm.css';

type ImagesFormProps = {
	setShowModal: Dispatch<SetStateAction<boolean>>;
	galleryId: string;
};

type ErrorType = {
	title?: string;
};

export default function ImagesForm({ setShowModal, galleryId }: ImagesFormProps) {
	const dispatch = useAppDispatch();
	const [loading, setLoading] = useState(false);
	const [images, setImages] = useState<File[]>([]);
	const [errors, setErrors] = useState<ErrorType>({});
	const [title, setTitle] = useState<string[]>([]);
	const [description, setDescription] = useState<string[]>([]);
	const [isHomepage, setIsHomepage] = useState<boolean[]>([]);
	const [isPortrait, setIsPortrait] = useState<boolean[]>([]);
	const fileTypes = ['JPG', 'PNG', ' JPEG', 'jpg', 'jpeg'];

	const handleSubmit = async () => {
		setLoading(true);
		for (let i = 0; i < images.length; i++) {
			if (!title[i] || title[i].length === 0) {
				setErrors({ title: 'All images require a title' });
				setLoading(false);
				return;
			}
		}
		images.forEach(async (image, i) => {
			console.log(isPortrait[i]);
			await dispatch(
				addImage({
					title: title[i],
					description: description[i] ?? '',
					galleryId,
					isHomepageImage: isHomepage[i],
					isPortrait: isPortrait[i],
					orderNumber: images.length + i,
					image,
				})
			);
			if (i === images.length - 1) {
				setShowModal(false);
			}
		});
	};

	return (
		<div id='images-form-container'>
			{errors.title && (
				<p id='error' style={{ marginBottom: '5px' }}>
					{errors.title}
				</p>
			)}
			<FileUploader
				types={fileTypes}
				name='image'
				multiple={true}
				handleChange={(files: File[]) => {
					for (let i in files) {
						if (typeof files[i] === 'object') {
							setImages((prev) => [...prev, files[i]]);
							setTitle((prev) => {
								const newTitles = [...prev];
								newTitles[images.length + +i] = '';
								return newTitles;
							});
							setIsHomepage((prev) => {
								const newHomepages = [...prev];
								newHomepages[images.length + +i] = false;
								return newHomepages;
							});
							setIsPortrait((prev) => {
								const newPortraits = [...prev];
								newPortraits[images.length + +i] = false;
								return newPortraits;
							});
						}
					}
				}}
			/>
			<div id='image-preview-container'>
				{images.map((image, i) => (
					<div id='images-form' key={`file-${i}`}>
						<p
							id='delete-image-form-image'
							onClick={() => {
								setImages((prev) => {
									const newImages = [...prev];
									newImages.splice(i, 1);
									return newImages;
								});
								setTitle((prev) => {
									const newTitles = [...prev];
									newTitles.splice(i, 1);
									return newTitles;
								});
								setDescription((prev) => {
									const newDescs = [...prev];
									newDescs.splice(i, 1);
									return newDescs;
								});
								setIsHomepage((prev) => {
									const newHomepages = [...prev];
									newHomepages.splice(i, 1);
									return newHomepages;
								});
								setIsPortrait((prev) => {
									const newPortraits = [...prev];
									newPortraits.splice(i, 1);
									return newPortraits;
								});
							}}
						>
							X
						</p>
						<div id='image-preview' style={{ position: 'relative' }}>
							<Image
								src={URL.createObjectURL(image)}
								alt='preview'
								fill
								style={{ objectFit: 'cover', objectPosition: 'center' }}
							/>
						</div>
						<input
							type='text'
							placeholder='title'
							value={title[i] || ''}
							onChange={(e) =>
								setTitle((prev) => {
									const newTitles = [...prev];
									newTitles[i] = e.target.value;
									return newTitles;
								})
							}
							style={{ width: '90%', marginBottom: '2px' }}
						/>
						<textarea
							rows={6}
							cols={21}
							style={{ resize: 'none', width: '90%' }}
							placeholder='description'
							value={description[i] || ''}
							onChange={(e) =>
								setDescription((prev) => {
									const newDescs = [...prev];
									newDescs[i] = e.target.value;
									return newDescs;
								})
							}
						/>
						<div id='homepage-image-div'>
							<label htmlFor='isHomePageImage'>Homepage image: </label>
							<input
								type='checkbox'
								checked={isHomepage[i] || false}
								onChange={() =>
									setIsHomepage((prev) => {
										const newHomepages = [...prev];
										newHomepages[i] = !newHomepages[i];
										return newHomepages;
									})
								}
							/>
						</div>
						<div id='portrait-image-div'>
							<label htmlFor='isPortraitImage'>Portrait image: </label>
							<input
								type='checkbox'
								checked={isPortrait[i] || false}
								onChange={() =>
									setIsPortrait((prev) => {
										const newPortraits = [...prev];
										newPortraits[i] = !newPortraits[i];
										return newPortraits;
									})
								}
							/>
						</div>
					</div>
				))}
			</div>
			<button id='add-photos-button' onClick={handleSubmit}>
				Add photos
			</button>
			{loading && <p>Uploading images, please wait...</p>}
		</div>
	);
}
