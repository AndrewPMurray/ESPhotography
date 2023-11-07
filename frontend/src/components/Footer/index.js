import { NavLink } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
	// const fileTypes = ['JPG', 'PNG', ' JPEG', 'jpg', 'jpeg'];

	return (
		<footer id='footer-container' className='fade-in'>
			<div id='footer-links-container'>
				<div id='footer-copyright'>
					<img
						id='footer-signature'
						src='../images/signature-inverted.png'
						alt='signature'
					/>
					<p id='disclaimer-text'>
						All Images and Original Text &#169; 2020-2022 Elmar Schmittou{' '}
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
						<NavLink to='/'>Home</NavLink>
						<NavLink to='/galleries'>Galleries</NavLink>
						<NavLink to='/about'>About</NavLink>
						<NavLink to='/contact'>Contact</NavLink>
					</div>
				</div>
			</div>
		</footer>
	);
}
