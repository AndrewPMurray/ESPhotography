'use client';
import 'swiper/react';
import 'swiper/css';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { RootState, useAppDispatch } from '@state/index';
import { setCurrentRoute } from '@state/session';
import { loadPortraitImages } from '@state/images';

import './Pricing.css';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function Pricing() {
	const dispatch = useAppDispatch();
	const images = useSelector((state: RootState) => Object.values(state.images)) ?? [];

	useEffect(() => {
		dispatch(loadPortraitImages());
		dispatch(setCurrentRoute());
	}, [dispatch]);

	return (
		<Swiper
			spaceBetween={50}
			slidesPerView={3}
			onSlideChange={() => console.log('slide change')}
			onSwiper={(swiper) => console.log(swiper)}
		>
			<SwiperSlide>Slide</SwiperSlide>
			<SwiperSlide>Slide</SwiperSlide>
			<SwiperSlide>Slide</SwiperSlide>
			<SwiperSlide>Slide</SwiperSlide>
			<SwiperSlide>Slide</SwiperSlide>
			<SwiperSlide>Slide</SwiperSlide>
			<SwiperSlide>Slide</SwiperSlide>
			<SwiperSlide>Slide</SwiperSlide>
			<SwiperSlide>Slide</SwiperSlide>
			<SwiperSlide>Slide</SwiperSlide>
			<SwiperSlide>Slide</SwiperSlide>
			<SwiperSlide>Slide</SwiperSlide>
			<SwiperSlide>Slide</SwiperSlide>
			<SwiperSlide>Slide</SwiperSlide>
		</Swiper>
	);
}
