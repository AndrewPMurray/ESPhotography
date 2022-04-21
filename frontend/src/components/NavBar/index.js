import { NavLink } from 'react-router-dom';
import './NavBar.css';

export default function NavBar() {
	// const fileTypes = ['JPG', 'PNG', ' JPEG', 'jpg', 'jpeg'];

	return (
		<div id='navbar-container' className='fade-in'>
			<nav>
				<div id='navbar-links'>
					<NavLink to='/'>
						<img id='signature' src='../images/signature.png' alt='signature' />
					</NavLink>
					<NavLink to='/galleries'>Galleries</NavLink>
					<NavLink to='/bio'>Bio</NavLink>
					<NavLink to='/contact'>Contact</NavLink>
					<a
						href='https://instagram.com/elmarschmittou'
						target='_blank'
						rel='noopener noreferrer'
					>
						<i className='fa-brands fa-instagram'></i>
					</a>
				</div>
			</nav>
		</div>
	);
}
