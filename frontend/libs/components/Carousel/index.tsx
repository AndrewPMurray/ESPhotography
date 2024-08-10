'use client';
import { Image as ImageType } from '@state/@types';
import Image from 'next/image';

import './Carousel.css';

type CardDetail = {
	imgUrl: string;
	imgTitle: string;
};

export default function Carousel({ images }: { images: ImageType[] }) {
	const cardDetails: CardDetail[] = images.map((img) => ({
		imgUrl: img?.url ?? '',
		imgTitle: img.title,
	}));
	return (
		<div className='carousel-container' style={{ height: '250px' }}>
			<div
				className='carousel-track'
				style={{
					animation: `slide ${cardDetails.length * 2}s linear infinite`,
					width: `${cardDetails.length * 900}px`,
				}}
			>
				{cardDetails.map((card, i) => {
					return (
						<div
							className='carousel-card'
							key={`${card.imgTitle}-${i}`}
							style={{ position: 'relative' }}
						>
							<Image
								src={card.imgUrl}
								alt={card.imgTitle}
								style={{
									position: 'absolute',
									objectFit: 'cover',
									objectPosition: 'center',
								}}
								fill
							/>
						</div>
					);
				})}
				{cardDetails.map((card, i) => {
					return (
						<div
							className='carousel-card'
							key={`${card.imgTitle}-${i}`}
							style={{ position: 'relative' }}
						>
							<Image
								src={card.imgUrl}
								alt={card.imgTitle}
								style={{
									position: 'absolute',
									objectFit: 'cover',
									objectPosition: 'center',
								}}
								fill
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
}
