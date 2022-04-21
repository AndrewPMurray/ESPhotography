import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-scroll';
import { FileUploader } from 'react-drag-drop-files';
import { loadImages, addImage, deleteImage } from '../../store/images';
import ImageModal from '../ImageModal';
import './Portfolio.css';

export default function Portfolio() {
	const user = useSelector((state) => state.session.user);
	const dispatch = useDispatch();
	const images = useSelector((state) => Object.values(state.images));

	const [loading, setLoading] = useState(false);

	const greetingsChange = useCallback(() => {
		const greetings = ['Hello', 'Hola', 'Bonjour', 'Güten Tag', 'Aloha'];
		const greeting =
			greetings[Math.floor(Math.random() * (greetings.length * 2)) % greetings.length];
		return greeting;
	}, []);

	useEffect(() => {
		dispatch(loadImages());
	}, [dispatch]);

	useEffect(() => {
		const timeout = (prevGreeting, greetingHTML) =>
			setTimeout(() => {
				while (prevGreeting === greetingHTML.innerHTML) {
					greetingHTML.innerHTML = greetingsChange();
				}
				greetingHTML.style.opacity = 1;
			}, 300);

		const greetingInterval = setInterval(() => {
			const greetingHTML = document.querySelector('#greeting');
			greetingHTML.style.opacity = 0;
			const prevGreeting = greetingHTML.innerHTML;
			timeout(prevGreeting, greetingHTML);
		}, 2300);

		return () => {
			clearInterval(greetingInterval);
			clearTimeout(timeout);
		};
	}, [greetingsChange]);

	useEffect(() => {
		const imageChanger = () => {
			let backgroundImage = document.getElementById('section-image');
			const one = document.getElementById('one');
			const two = document.getElementById('two');
			const three = document.getElementById('three');
			if (one.getBoundingClientRect().y > 0)
				backgroundImage.style.backgroundImage = 'url(../images/elmar.jpg)';
			else if (two.getBoundingClientRect().y > 0)
				backgroundImage.style.backgroundImage = 'url(../images/pic01.jpg)';
			else if (three.getBoundingClientRect().y > 0)
				backgroundImage.style.backgroundImage = 'url(../images/pic02.jpg)';
			else backgroundImage.style.backgroundImage = 'url(../images/elmar.jpg)';
		};
		window.addEventListener('scroll', imageChanger);

		return () => window.removeEventListener('scroll', imageChanger);
	}, []);

	const handleSubmit = async (image) => {
		setLoading(true);
		await dispatch(addImage(image));
		setLoading(false);
	};

	return (
		<div id='portfolio-container'>
			<div
				id='section-image'
				style={{
					backgroundSize: 'auto 100%',
					backgroundImage: 'url(../images/elmar.jpg)',
				}}
			>
				<section id='header'>
					<header className='major'>
						<h1>
							<p
								id='greeting'
								style={{
									transitionDuration: '300ms',
								}}
							>
								Hello
							</p>
						</h1>
						<h2>My Name Is Elmar Schmittou</h2>
						<p>Professional Photographer</p>
					</header>
					<div className='container'>
						<ul className='actions special'>
							<li>
								<Link to='one' className='button primary scrolly' smooth={true}>
									Begin
								</Link>
							</li>
						</ul>
					</div>
				</section>

				<section id='one' className='main special'>
					<div className='container'>
						<Link to='header' className='goto-prev scrolly' smooth={true}>
							Prev
						</Link>
						<div className='content'>
							<header className='major'>
								<h2>Who I am</h2>
							</header>
							<p>
								Aliquam ante ac id. Adipiscing interdum lorem praesent fusce
								pellentesque arcu feugiat. Consequat sed ultricies rutrum. Sed
								adipiscing eu amet interdum lorem blandit vis ac commodo aliquet
								integer vulputate phasellus lorem ipsum dolor lorem magna consequat
								sed etiam adipiscing interdum.
							</p>
						</div>
						<Link to='two' className='goto-next scrolly' smooth={true}>
							Next
						</Link>
					</div>
				</section>

				<section id='two' className='main special'>
					<div className='container'>
						<Link to='one' className='goto-prev scrolly' smooth={true}>
							Prev
						</Link>
						<div className='content'>
							<header className='major'>
								<h2>My photos</h2>
							</header>
							<p>
								Consequat sed ultricies rutrum. Sed adipiscing eu amet interdum
								lorem blandit vis ac commodo aliquet vulputate.
							</p>
							{user && <FileUploader handleChange={(file) => handleSubmit(file)} />}
							<ul className='icons-grid'>
								{images.map((image, i) => (
									<ImageModal
										key={`image-${i}`}
										id='portfolio-img'
										image={image}
									/>
								))}
							</ul>
						</div>
						<Link to='three' className='goto-next scrolly' smooth={true}>
							Next
						</Link>
					</div>
				</section>

				<section id='three' className='main special'>
					<div className='container'>
						<Link to='two' className='goto-prev scrolly' smooth={true}>
							Prev
						</Link>
						<div className='content'>
							<header className='major'>
								<h2>One more thing</h2>
							</header>
							<p>
								Aliquam ante ac id. Adipiscing interdum lorem praesent fusce
								pellentesque arcu feugiat. Consequat sed ultricies rutrum. Sed
								adipiscing eu amet interdum lorem blandit vis ac commodo aliquet
								integer vulputate phasellus lorem ipsum dolor lorem magna consequat
								sed etiam adipiscing interdum.
							</p>
						</div>
						<Link to='footer' className='goto-next scrolly' smooth={true}>
							Next
						</Link>
					</div>
				</section>

				<section id='footer'>
					<div className='container'>
						<Link
							to='header'
							className='goto-prev scrolly'
							smooth={true}
							style={{ cursor: 'pointer' }}
						>
							Back to top
						</Link>
						<header className='major'>
							<h2>Get in touch</h2>
						</header>
						<form method='post' action='#'>
							<div className='row gtr-uniform'>
								<div className='col-6 col-12-xsmall'>
									<input type='text' name='name' id='name' placeholder='Name' />
								</div>
								<div className='col-6 col-12-xsmall'>
									<input
										type='email'
										name='email'
										id='email'
										placeholder='Email'
									/>
								</div>
								<div className='col-12'>
									<textarea
										name='message'
										id='message'
										placeholder='Message'
										rows='4'
									></textarea>
								</div>
								<div className='col-12'>
									<ul className='actions special'>
										<li>
											<input
												type='submit'
												value='Send Message'
												className='primary'
											/>
										</li>
									</ul>
								</div>
							</div>
						</form>
					</div>
					<footer>
						<ul className='icons'>
							<li>
								<a
									target='_blank'
									rel='noopener noreferrer'
									href='https://www.facebook.com/EltheMar'
								>
									<button className='icon brands alt fa-facebook-f'>
										<span className='label'>Facebook</span>
									</button>
								</a>
							</li>
							<li>
								<a
									target='_blank'
									rel='noopener noreferrer'
									href='https://www.instagram.com/elmarschmittou/'
								>
									<button className='icon brands alt fa-instagram'>
										<span className='label'>Instagram</span>
									</button>
								</a>
							</li>
							<li>
								<a
									target='_blank'
									rel='noopener noreferrer'
									href='mailto:elmar1701@gmail.com'
								>
									<button className='icon solid alt fa-envelope'>
										<span className='label'>Email</span>
									</button>
								</a>
							</li>
						</ul>
						<ul className='copyright'>
							<li>&copy; 2022 Elmar Schmittou</li>
							<li>
								Design:{' '}
								<a
									href='http://html5up.net'
									target='_blank'
									rel='noopener noreferrer'
								>
									HTML5 UP
								</a>
							</li>
						</ul>
					</footer>
				</section>

				<script src='assets/js/jquery.min.js'></script>
				<script src='assets/js/jquery.scrollex.min.js'></script>
				<script src='assets/js/jquery.scrolly.min.js'></script>
				<script src='assets/js/browser.min.js'></script>
				<script src='assets/js/breakpoints.min.js'></script>
				<script src='assets/js/util.js'></script>
				<script src='assets/js/main.js'></script>
			</div>
		</div>
	);
}
