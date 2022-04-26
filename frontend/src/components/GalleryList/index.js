import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { editGallery, updateOrder } from '../../store/galleries';

import GalleryFormModal from '../GalleryFormModal';
import GalleryNode from './GalleryNode';

import { loadGalleries } from '../../store/galleries';

import './GalleryList.css';

export default function GalleryList() {
	const dispatch = useDispatch();
	const galleries = useSelector((state) => state.galleries.list);
	const user = useSelector((state) => state.session.user);

	useEffect(() => {
		dispatch(loadGalleries());
	}, [dispatch]);

	const updateGalleryOrder = async ({ source, destination }) => {
		const newGalleries = [...galleries.list];
		const [reorderedGallery] = newGalleries.splice(source.index, 1);
		newGalleries.splice(destination.index, 0, reorderedGallery);

		newGalleries.forEach(async (gallery, i) => {
			if (gallery.orderNumber !== i) {
				gallery.orderNumber = i;
				await dispatch(
					editGallery({
						id: gallery.id,
						title: gallery.title,
						description: gallery.description,
						orderNumber: i,
					})
				);
			}
		});
		await dispatch(updateOrder(newGalleries));
	};

	return (
		<div id='gallery-list-container'>
			<div id='gallery-list-header'>
				{user && <GalleryFormModal />}
				<h2>Galleries</h2>
				<p>
					For fine art print inquiries, please contact{' '}
					<a href='mailto:info@elmarschimttou.com'>info@elmarschmittou.com</a>
				</p>
			</div>
			{user ? (
				<DragDropContext onDragEnd={updateGalleryOrder}>
					<Droppable droppableId='galleries' direction='horizontal'>
						{(provided) => (
							<div
								id='gallery-node-container'
								{...provided.droppableProps}
								ref={provided.innerRef}
								style={{ flexWrap: user ? 'nowrap' : 'wrap' }}
							>
								{galleries.map(
									(gallery, i) =>
										(gallery.images?.length > 0 || user) && (
											<Draggable
												key={gallery.id}
												draggableId={`${gallery.title}-${i}`}
												index={i}
											>
												{(provided) => (
													<GalleryNode
														gallery={gallery}
														user={user}
														provided={user ? provided : null}
														i={i}
													/>
												)}
											</Draggable>
										)
								)}
								{provided.placeholder}
							</div>
						)}
					</Droppable>
				</DragDropContext>
			) : (
				<div id='gallery-node-container' style={{ flexWrap: user ? 'nowrap' : 'wrap' }}>
					{galleries.map(
						(gallery, i) =>
							(gallery.images?.length > 0 || user) && (
								<GalleryNode key={gallery.id} gallery={gallery} user={user} i={i} />
							)
					)}
				</div>
			)}
		</div>
	);
}
