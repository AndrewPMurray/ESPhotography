'use client';

import { useSelector } from 'react-redux';
import Link from 'next/link';

import { RootState } from '@state/index';

import LogoutButton from '../auth/LogoutButton';

import './NavBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import Image from 'next/image';
import { CSSProperties, useLayoutEffect } from 'react';

export default function NavBar() {
	const { user, currentRoute } = useSelector((state: RootState) => state.session);

	useLayoutEffect(() => {
		window.scrollTo(0, 0);
	}, [currentRoute]);

	const changeActiveLink = (linkName: string): CSSProperties | undefined => {
		return currentRoute.includes(linkName)
			? {
					textDecoration: 'underline',
					textDecorationThickness: 'from-font',
					textUnderlineOffset: '5px',
			  }
			: undefined;
	};

	return (
		<div id='navbar-container' className='fade-in'>
			<nav>
				<div id='navbar-links'>
					<Link href='/'>
						<div id='signature'>
							<Image
								src='/images/signature.png'
								alt='signature'
								fill
								style={{ objectFit: 'contain', objectPosition: 'center' }}
								priority
							/>
						</div>
					</Link>
					<div id='navbar-sub-links'>
						{user && (
							<Link href='/portraits' style={changeActiveLink('portraits')}>
								Portraits
							</Link>
						)}
						<Link href='/galleries' style={changeActiveLink('galleries')}>
							Galleries
						</Link>
						<Link href='/about' style={changeActiveLink('about')}>
							About
						</Link>
						<Link href='/contact' style={changeActiveLink('contact')}>
							Contact
						</Link>
						<Link
							href='https://instagram.com/elmarschmittou'
							target='_blank'
							rel='noopener noreferrer'
						>
							<FontAwesomeIcon
								icon={faInstagram}
								className='fa-brands fa-instagram'
							/>
						</Link>
					</div>
				</div>
			</nav>
			{user && <LogoutButton />}
		</div>
	);
}
