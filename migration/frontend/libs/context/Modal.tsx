'use client';

import {
	createContext,
	useRef,
	useContext,
	useState,
	type ReactElement,
	SetStateAction,
	PropsWithChildren,
} from 'react';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

export const ModalContext = createContext<HTMLInputElement | null>(null);

export function ModalProvider({ children }: PropsWithChildren) {
	const modalRef = useRef<HTMLInputElement | null>(null);
	const [value, setValue] = useState<HTMLInputElement | null>(null);

	useEffect(() => {
		setValue(modalRef.current ?? null);
	}, []);

	return (
		<>
			<ModalContext.Provider value={value}>{children}</ModalContext.Provider>
			<div ref={modalRef} style={{ position: 'absolute' }} />
		</>
	);
}

export function Modal({ onClose, children }: { onClose: () => void; children?: ReactElement[] }) {
	const modalNode = useContext(ModalContext);

	useEffect(() => {
		const modalBackground = document.querySelector('#modal-background');
		const modalContent = document.querySelector('#modal-content');
		const timeout = () => setTimeout(onClose, 175);

		if (modalBackground && modalContent) {
			modalBackground.addEventListener('click', (e) => {
				if (e.target === modalBackground) {
					modalContent.classList.remove('fade-in-grow');
					modalBackground.classList.remove('fade-in');
					modalContent.classList.add('fade-out-shrink');
					modalBackground.classList.add('fade-out');
					timeout();
				}
			});
		}

		return () => {
			clearTimeout(timeout());
		};
	}, [modalNode, onClose]);

	if (!modalNode) return null;

	return ReactDOM.createPortal(
		<div id='modal' style={{ zIndex: 1000 }}>
			<div id='modal-background' className='fade-in' />
			<div id='modal-content' className='fade-in-grow'>
				{children}
			</div>
		</div>,
		modalNode
	);
}
