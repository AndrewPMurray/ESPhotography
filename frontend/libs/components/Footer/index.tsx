'use client';

import Link from 'next/link';
import './Footer.css';
import Image from 'next/legacy/image';

export default function Footer() {
	// const fileTypes = ['JPG', 'PNG', ' JPEG', 'jpg', 'jpeg'];

	return (
		<footer id='footer-container' className='fade-in'>
			<div id='footer-links-container'>
				<div id='footer-copyright'>
					<div id='footer-signature'>
						<Image src='/images/signature-inverted.png' alt='signature' layout='fill' />
					</div>
					<p id='disclaimer-text'>
						All Images and Original Text &#169; 2020-2024 Elmar Schmittou{' '}
					</p>
					<a
						href='https://instagram.com/elmarschmittou'
						target='_blank'
						rel='noopener noreferrer'
						id='insta-footer'
					>
						<i className='fa-brands fa-instagram'></i>
					</a>
				</div>
				<div id='footer-links-sub-container'>
					<div id='footer-links'>
						<Link href='/'>Home</Link>
						<Link href='/galleries'>Galleries</Link>
						<Link href='/about'>About</Link>
						<Link href='/contact'>Contact</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}
