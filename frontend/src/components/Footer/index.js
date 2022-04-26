import { NavLink } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
	// const fileTypes = ['JPG', 'PNG', ' JPEG', 'jpg', 'jpeg'];

	return (
		<footer id='footer-container' className='fade-in'>
			<div id='footer-links-container'>
				<div id='footer-copyright'>
					<p id='disclaimer-text'>
						All Images and Original Text &#169; 2020-2022 Elmar Schmittou{' '}
					</p>
					<NavLink to='/'>Home</NavLink>
				</div>
				<div id='footer-links'>
					<p id='footer-text'>Learn more</p>
				</div>
				<div id='footer-links'>
					<p id='footer-text'>Stay Connected</p>
					<a
						href='https://instagram.com/elmarschmittou'
						target='_blank'
						rel='noopener noreferrer'
						id='insta-footer'
					>
						<i className='fa-brands fa-instagram'></i>
					</a>
				</div>
			</div>
		</footer>
	);
}
