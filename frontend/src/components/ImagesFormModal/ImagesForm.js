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
				multiple={true}
				handleChange={(files) => {
					for (let file of files) {
						setImages((prev) => [...prev, file]);
					}
				}}
			/>
			<div id='image-preview-container'>
				{images.map((image, i) => (
					<div id='images-form' key={`file-${i}`}>
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
