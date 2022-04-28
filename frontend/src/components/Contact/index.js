import './Contact.css';

export default function Contact() {
	return (
		<div id='contact-container'>
			<div id='header'>
				<h2>Contact Us</h2>
			</div>
			<div id='contact-section'>
				<h2 id='contact-section-header'>General and Fine Art Print Inquiries</h2>
				<pre id='contact-section-text'>
					{`Please email Elmar Schmittou:`}{' '}
					<a href='mailto:info@elmarschmittou.com'>info@elmarschmittou.com</a>
				</pre>
			</div>
			<div id='contact-section'>
				<h2 id='contact-section-header'>Webmaster Info</h2>
				<pre id='contact-section-text'>
					{`Andrew Murray: `}
					<a href='https://andrewmurray.dev' target='_blank' rel='noopener noreferrer'>
						andrewmurray.dev
					</a>
					{`

Email: `}
					<a
						href='mailto:webmaster@elmarschmittou.com'
						target='_blank'
						rel='noopener noreferrer'
					>
						webmaster@elmarschmittou.com
					</a>
				</pre>
			</div>
		</div>
	);
}
