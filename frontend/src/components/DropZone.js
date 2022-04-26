import { useDrop } from 'react-dnd';

export default function DropZone({ gallery, image }) {
	const [{ isOver }, dropRef] = useDrop({
		accept: 'drag',
		drop: () => console.log(gallery ? gallery : image),
		collect: (monitor) => ({
			isOver: monitor.isOver(),
		}),
	});

	return (
		<div
			className='drop'
			ref={dropRef}
			style={{ backgroundColor: isOver ? 'white' : null }}
		></div>
	);
}
