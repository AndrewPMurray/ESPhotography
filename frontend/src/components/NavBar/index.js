import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css';

export default function NavBar({ currentRoute }) {
	const user = useSelector((state) => state.session.user);

	return (
		<div id='navbar-container' className='fade-in'>
			<nav>
				<div id='navbar-links'>
					<NavLink to='/'>
						<img id='signature' src='../images/signature.png' alt='signature' />
					</NavLink>
					<div id='navbar-sub-links'>
						<NavLink
							to='/galleries'
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
						</NavLink>
						<NavLink
							to='/about'
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
						</NavLink>
						<NavLink
							to='/contact'
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
						</NavLink>
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
