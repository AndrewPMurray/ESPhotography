import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FileUploader } from 'react-drag-drop-files';
import { addImage } from '../../store/images';
import './ImagesForm.css';

export default function ImagesForm({ setShowModal, galleryId }) {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const [images, setImages] = useState([]);
	const [errors, setErrors] = useState({});
	const [title, setTitle] = useState([]);
	const [isHomepage, setIsHomepage] = useState([]);
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
			await dispatch(
				addImage({
					title: title[i],
					galleryId,
					isHomepageImage: isHomepage[i] || false,
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
				handleChange={(files) => {
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
								setIsHomepage((prev) => {
									const newHomepages = [...prev];
									newHomepages.splice(i, 1);
									return newHomepages;
								});
							}}
						>
							X
						</p>
						<img id='image-preview' src={URL.createObjectURL(image)} alt='preview' />
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
						/>
						<div id='homepage-image-div'>
							<label htmlFor='isHomePageImage'>Homepage image: </label>
							<input
								type='checkbox'
								value={isHomepage[i] || false}
								onChange={(e) =>
									setIsHomepage((prev) => {
										const newHomepages = [...prev];
										newHomepages[i] = !newHomepages[i];
										return newHomepages;
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
