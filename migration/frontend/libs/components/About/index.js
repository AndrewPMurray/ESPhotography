import { useEffect } from 'react';
import './About.css';

export default function About({ setCurrentRoute }) {
	useEffect(() => {
		setCurrentRoute(window.location.href);
	}, [setCurrentRoute]);

	return (
		<div id='about-container'>
			<h1 id='text-header'>My name is Elmar, and I am based in Indianapolis, Indiana.</h1>
			<p id='text'>
				My love for photography sprouts from seeds planted at an early age by my late
				grandfather, Carroll. He was an amateur historian and genealogist, a commercial
				artist, and an immense talent with a pen, a watercolor brush, and chief of all, a
				camera. From the family portraits arranged by Carroll every Christmas, to the many
				thousands of photographs artistically chronicling the customary flow of his
				picturesque family life, it was clear to me that photography was much more than just
				a hobby to him. I would watch him with ever-growing fascination throughout my youth,
				not realizing the impact that my grandfather’s passion for photography was having
				upon my own.
			</p>
			<p id='text'>
				At the age of 17, I used my high school graduation money to buy my first camera, and
				from that moment on, I was hopelessly in love. Although it was a crude and
				inexpensive device intended for only the most novice photographer, it was this
				camera that enabled me to realize my infatuation with the prosaic – the ordinary
				people and places I encountered every day. Wherever my life or travels have taken me
				since then, there has always been something or someone nearby to catch my eye and my
				lens.
			</p>
			<p id='text'>
				I am an ardent documentarian, an archivist of memories, and authenticity is my
				philosophy. I am fervent about recording truthful, personal history. I believe that
				the grandest times of our lives are made up of the little things, and my purpose is
				to immortalize those details which define the human experience. I create real
				photographs to preserve real moments, and this is how I offer your future self the
				opportunity to look back and see the past just as it was.
			</p>
			<p id='text'>
				I offer my services all over Greater Indianapolis, but I will also happily travel to
				you. Please reach out to me with any inquiries.
			</p>
			<p id='text'>
				I don’t just love photography – I also enjoy reading (especially J.R.R. Tolkien),
				writing (especially poetry), hockey, Star Trek, backpacking, apple cider,
				shenanigans with my nieces, and listening to Bob Dylan.
			</p>
		</div>
	);
}
