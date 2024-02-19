'use client';
import { useEffect } from 'react';
import './Portrait.css';
import { RootState, useAppDispatch } from '@state/index';
import { setCurrentRoute } from '@state/session';
import { loadPortraitImages } from '@state/images';
import { useSelector } from 'react-redux';
import Image from 'next/legacy/image';

export default function Portraits() {
	const dispatch = useAppDispatch();
	const images = useSelector((state: RootState) => Object.values(state.images)) ?? [];

	useEffect(() => {
		dispatch(loadPortraitImages());
		dispatch(setCurrentRoute());
	}, [dispatch]);

	return (
		<div id='portrait-container'>
			{images.map((image, i) => (
				<div id='portrait-image' key={`portrait-image-${i}`}>
					<Image src={image.url ?? ''} alt='portrait' layout='fill' />
				</div>
			))}
		</div>
	);
}
