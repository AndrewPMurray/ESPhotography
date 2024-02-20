import { Dispatch, SetStateAction } from 'react';

export default function Description({
	description,
}: {
	description: string;
	setShowModal: Dispatch<SetStateAction<boolean>>;
}) {
	return (
		<div id='description-modal-container' style={{ width: '75vw', lineHeight: '1.3' }}>
			<p>{description}</p>
		</div>
	);
}
