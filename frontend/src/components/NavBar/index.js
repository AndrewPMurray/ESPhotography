import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css';

export default function NavBar() {
	const user = useSelector((state) => state.session.user);

	const logout = () => {};

	return (
		<div id='navbar-container' className='fade-in'>
			<nav>
				<div id='navbar-links'>
					<NavLink to='/'>
						<img id='signature' src='../images/signature.png' alt='signature' />
					</NavLink>
					<div id='navbar-links'>
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
				</div>
			</nav>
			{user && <LogoutButton />}
		</div>
	);
}
