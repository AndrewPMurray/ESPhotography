'use client';

import { useEffect } from 'react';
import Image from 'next/image';

import { useAppDispatch } from '@state/index';
import { setCurrentRoute } from '@state/session';

import aboutImage from '../../../public/images/about-image.jpg';
import midImage1 from '../../../public/images/mid-image-1.jpg';
import midImage2 from '../../../public/images/mid-image-2.jpg';

import './About.css';

export default function About() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(setCurrentRoute());
	}, [dispatch]);

	return (
		<div id='about-container'>
			<div id='about-header'>
				<Image
					src={aboutImage}
					fill
					alt='about'
					style={{ objectFit: 'cover', objectPosition: 'center' }}
				/>
				<p>About</p>
			</div>
			<h1 id='text-header'>My name is Elmar, and I am based in Indianapolis, Indiana.</h1>
			<p id='text'>
				My love for photography sprouts from seeds planted at an early age by my late
				grandfather, Carroll. He was an amateur historian and genealogist, a commercial
				artist, and an immense talent with a pen, a watercolor brush, and chief of all, a
				camera. From the family portraits arranged by Carroll every Christmas, to the many
				thousands of photographs artistically chronicling the customary flow of his
				picturesque family life, it was clear to me that photography was much more than just
				a hobby to him. I would watch him with ever-growing fascination throughout my youth,
				not realizing the impact that my grandfather’s passion for photography was having
				upon my own.
			</p>
			<p id='text'>
				At the age of 17, I used my high school graduation money to buy my first camera, and
				from that moment on, I was hopelessly in love. Although it was a crude and
				inexpensive device intended for only the most novice photographer, it was this
				camera that enabled me to realize my infatuation with the prosaic – the ordinary
				people and places I encountered every day. Wherever my life or travels have taken me
				since then, there has always been something or someone nearby to catch my eye and my
				lens.
			</p>
			<p id='text'>
				I am an ardent documentarian, an archivist of memories, and authenticity is my
				philosophy. I am fervent about recording truthful, personal history. I believe that
				the grandest times of our lives are made up of the little things, and my purpose is
				to immortalize those details which define the human experience. I create real
				photographs to preserve real moments, and this is how I offer your future self the
				opportunity to look back and see the past just as it was.
			</p>
			<div id='about-mid-images'>
				<div id='mid-image-1'>
					<Image
						src={midImage1}
						fill
						alt='about'
						style={{ objectFit: 'cover', objectPosition: 'center' }}
					/>
				</div>
				<div id='mid-image-2'>
					<Image
						src={midImage2}
						fill
						alt='about'
						style={{ objectFit: 'cover', objectPosition: 'center' }}
					/>
				</div>
			</div>
			<p id='text'>
				I offer my services all over Greater Indianapolis, but I will happily travel to you.
				Please reach out to me with any inquiries.
			</p>
			<p id='text'>
				I don’t just love photography – I also enjoy reading{' '}
				<em>(especially J.R.R. Tolkien)</em>, writing <em>(especially poetry)</em>, Detroit
				Red Wings hockey, Star Trek, backpacking, apple cider, shenanigans with my nieces,
				and listening to Bob Dylan.
			</p>
		</div>
	);
}
