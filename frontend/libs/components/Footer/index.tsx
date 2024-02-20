'use client';

import Link from 'next/link';
import './Footer.css';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
	// const fileTypes = ['JPG', 'PNG', ' JPEG', 'jpg', 'jpeg'];

	return (
		<footer id='footer-container' className='fade-in'>
			<div id='footer-links-container'>
				<div id='footer-copyright'>
					<div id='footer-sub-div'>
						<div id='footer-signature'>
							<Image
								src='/images/signature-inverted.png'
								alt='signature'
								fill
								style={{ objectFit: 'contain', objectPosition: 'left' }}
							/>
						</div>
						<p id='disclaimer-text'>All Images and Original Text</p>
						<p id='disclaimer-text'>
							&#169; 2020-2024 Elmar Schmittou Photography, LLC
						</p>
						<Link
							href='https://instagram.com/elmarschmittou'
							target='_blank'
							rel='noopener noreferrer'
						>
							<FontAwesomeIcon
								icon={faInstagram}
								className='fa-brands fa-instagram'
								style={{ fontSize: '24px' }}
							/>
						</Link>
					</div>
					<div id='footer-sub-div'>
						<p style={{ fontSize: '24px' }}>
							Made by{' '}
							<Link
								href='https://andrewmurray.dev'
								target='_blank'
								rel='noopener noreferrer'
								style={{ textDecoration: 'underline', fontSize: '24px' }}
							>
								Andrew Murray
							</Link>
						</p>
					</div>
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
