import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './GalleryForm.css';
import { addGallery, editGallery, deleteGallery } from '../../store/galleries';

export default function GalleryForm({ setShowModal, gallery }) {
	const dispatch = useDispatch();
	const galleries = useSelector((state) => Object.values(state.galleries.list));
	const [loading, setLoading] = useState();
	const [errors, setErrors] = useState({});
	const [title, setTitle] = useState(gallery?.title || '');
	const [deleteText, setDeleteText] = useState('');
	const [description, setDescription] = useState(gallery?.description || '');

	const handleSubmit = async (e) => {
		e.preventDefault();
		return dispatch(
			addGallery({
				title,
				description,
				orderNumber: galleries.length,
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

	const handleEdit = async (e) => {
		e.preventDefault();
		return dispatch(
			editGallery({
				id: gallery.id,
				title,
				description,
				orderNumber: gallery.orderNumber,
			})
		)
			.then(() => setShowModal(false))
			.catch(async (res) => {
				const data = await res.json();
				if (data && data.errors) {
					setErrors(data.errors);
				}
			});
	};

	const handleDelete = async (e) => {
		setLoading(true);
		e.preventDefault();
		return dispatch(deleteGallery(gallery.id))
			.then(() => setShowModal(false))
			.catch(() => {
				setLoading(false);
				setErrors({
					delete: `Unable to delete?! Uhhh you're not supposed to see this. Pay no attention to the man behind the curtain. Hey, so uh... Completely unrelated, but contact me and let me know about this? kthx.`,
				});
			});
	};

	return (
		<div
			id='gallery-form-container'
			style={gallery ? { height: '60vh', minHeight: '450px' } : null}
		>
			<form id='gallery-form' onSubmit={gallery ? handleEdit : handleSubmit}>
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
						{gallery ? 'Save edits' : 'Submit'}
					</button>
				</div>
			</form>
			{gallery && (
				<div id='delete-gallery'>
					<h3 style={{ marginBottom: '10px' }}>Delete gallery {gallery.title}</h3>
					<p id='error' style={{ lineHeight: '20px', marginBottom: '20px' }}>
						Warning: Deleting this gallery will delete all images in the gallery as
						well! This action cannot be undone. To delete, please type in the name of
						the gallery below then click the delete button.
					</p>
					<input
						type='text'
						value={deleteText}
						onChange={(e) => setDeleteText(e.target.value)}
						style={{ marginRight: '5px' }}
					/>
					<button onClick={handleDelete} disabled={deleteText !== gallery.title}>
						Delete
					</button>
					{errors.delete && (
						<p id='error' style={{ marginTop: '10px' }}>
							{errors.delete}
						</p>
					)}
					{loading && (
						<p style={{ marginTop: '10px' }}>Deleting gallery, please wait...</p>
					)}
				</div>
			)}
		</div>
	);
}
