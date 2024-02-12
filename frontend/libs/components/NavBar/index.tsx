'use client';

import { useSelector } from 'react-redux';
import Link from 'next/link';

import { RootState } from '@state/index';

import LogoutButton from '../auth/LogoutButton';

import './NavBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import Image from 'next/legacy/image';
import { useEffect, useLayoutEffect } from 'react';

export default function NavBar() {
	const { user, currentRoute } = useSelector((state: RootState) => state.session);

	useLayoutEffect(() => {
		window.scrollTo(0, 0);
	}, [currentRoute]);

	return (
		<div id='navbar-container' className='fade-in'>
			<nav>
				<div id='navbar-links'>
					<Link href='/'>
						<div id='signature'>
							<Image
								src='/images/signature.png'
								alt='signature'
								layout='fill'
								objectFit='contain'
								objectPosition='center'
							/>
						</div>
					</Link>
					<div id='navbar-sub-links'>
						<Link
							href='/galleries'
							style={
								currentRoute.includes('galleries')
									? {
											textDecoration: 'underline',
											textDecorationThickness: 'from-font',
											textUnderlineOffset: '5px',
									  }
									: undefined
							}
						>
							Galleries
						</Link>
						<Link
							href='/about'
							style={
								currentRoute.includes('about')
									? {
											textDecoration: 'underline',
											textDecorationThickness: 'from-font',
											textUnderlineOffset: '5px',
									  }
									: undefined
							}
						>
							About
						</Link>
						<Link
							href='/contact'
							style={
								currentRoute.includes('contact')
									? {
											textDecoration: 'underline',
											textDecorationThickness: 'from-font',
											textUnderlineOffset: '5px',
									  }
									: undefined
							}
						>
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
