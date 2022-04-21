import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadImages } from '../../store/images';
import './Portfolio.css';

export default function HomePage() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadImages());
	}, [dispatch]);

	return <p>hello</p>;
}
