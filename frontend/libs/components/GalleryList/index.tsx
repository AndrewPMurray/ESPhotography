'use client';

import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { editGalleryOrder } from '@state/galleries';

import GalleryFormModal from '../GalleryFormModal';
import GalleryNode from './GalleryNode';

import { loadGalleries } from '@state/galleries';
import { type RootState, useAppDispatch } from '@state/index';
import { setCurrentRoute } from '@state/session';

import './GalleryList.css';

export default function GalleryList() {
	const dispatch = useAppDispatch();
	const galleries = useSelector((state: RootState) => state.galleries);
	const user = useSelector((state: RootState) => state.session.user);

	const [isBrowser, setIsBrowser] = useState(false);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			setIsBrowser(true);
		}
	}, []);

	useEffect(() => {
		dispatch(loadGalleries());
	}, [dispatch]);

	useEffect(() => {
		dispatch(setCurrentRoute());
	}, [dispatch]);

	const updateGalleryOrder = async ({
		source,
		destination,
	}: {
		source: any;
		destination: any;
	}) => {
		const newGalleries = [...galleries];
		const [reorderedGallery] = newGalleries.splice(source.index, 1);
		newGalleries.splice(destination.index, 0, reorderedGallery);

		newGalleries.forEach(async (gallery, i) => {
			if (gallery.orderNumber !== i) {
				dispatch(
					editGalleryOrder({
						id: gallery.id,
						title: gallery.title,
						description: gallery.description,
						orderNumber: i,
					})
				);
			}
		});
	};

	return (
		<div id='gallery-list-container'>
			<div id='header'>
				{user && <GalleryFormModal />}
				<h2>Galleries</h2>
				<p>
					For fine art print inquiries, please contact{' '}
					<a href='mailto:info@elmarschimttou.com'>info@elmarschmittou.com</a>
				</p>
			</div>
			{user && isBrowser ? (
				<DragDropContext onDragEnd={updateGalleryOrder}>
					<Droppable droppableId={`galleries-${Date.now()}`} direction='horizontal'>
						{(provided) => (
							<div
								id='gallery-node-container'
								{...provided.droppableProps}
								ref={provided.innerRef}
								style={{
									flexWrap: user ? 'nowrap' : 'wrap',
									justifyContent: user ? 'flex-start' : undefined,
								}}
							>
								{galleries.map(
									(gallery, i) =>
										((gallery.images && gallery.images.length > 0) || user) && (
											<Draggable
												key={gallery.id}
												draggableId={`${gallery.title}-${i}`}
												index={i}
											>
												{(provided) => (
													<GalleryNode
														gallery={gallery}
														user={user}
														provided={user ? provided : undefined}
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
				<div
					id='gallery-node-container'
					style={{
						flexWrap: user ? 'nowrap' : 'wrap',
						justifyContent: user ? 'flex-start' : undefined,
					}}
				>
					{galleries.map(
						(gallery, i) =>
							((gallery.images && gallery.images.length > 0) || user) && (
								<GalleryNode
									key={gallery.id}
									gallery={gallery}
									user={user ?? undefined}
									i={i}
								/>
							)
					)}
				</div>
			)}
		</div>
	);
}
