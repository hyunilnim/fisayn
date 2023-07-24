import { memo, useRef } from 'react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';

function BtnRolling() {
	const btnStart = useRef(null);
	const btnStop = useRef(null);
	const swiper = useSwiper();
	return (
		<ul className='controls'>
			<li>
				<button type='button'>
					<FontAwesomeIcon
						icon={faPlay}
						ref={btnStart}
						onClick={() => {
							btnStart.current.classList.add('on');
							btnStop.current.classList.remove('on');
							swiper.autoplay.start();
						}}
					/>
				</button>
			</li>
			<li>
				<button type='button'>
					<FontAwesomeIcon
						icon={faPause}
						ref={btnStop}
						onClick={() => {
							btnStop.current.classList.add('on');
							btnStart.current.classList.remove('on');
							swiper.autoplay.stop();
						}}
					/>
				</button>
			</li>
		</ul>
	);
}

function Banner() {
	return (
		<section className='myScroll'>
			<div className='about_wrap'>
				<div className='inner'>
					<div className='about_title_wrap'>
						<p className='head_title__sub'>
							BUILD A WEBSITE THAT BREAKS <br />
							THROUGH THE NOISE.
						</p>
						<h2 className='head_title'>PARTNER WITH THE DIGITAL AGENCY DESIGNED TO HELP YOU DO IT.</h2>
						<p className='btn_wrap'>
							<a href='#' className='btn_round'>
								<span>ABOUT US</span>
							</a>
						</p>
					</div>
					<div id='' className='about_img_wrap'>
						{/* <div className='swiper-option'>
								<div className='swiper-button-prev'></div>
								<div className='swiper-button-next'></div>
								<span className='btnPlay on'>play</span>
								<span className='btnPause'>pause</span>
							</div> */}
						<Swiper
							modules={[Autoplay, Pagination, Navigation]}
							loop={true}
							autoplay={{ delay: 2000, disableOnInteraction: true }}
							pagination={{ clickable: true }}
							navigation={true}
						>
							<BtnRolling />
							<SwiperSlide data-slide='1'>
								<img src={`${process.env.PUBLIC_URL}/img/pic2.jpeg`} alt='' />
							</SwiperSlide>
							<SwiperSlide data-slide='2'>
								<img src={`${process.env.PUBLIC_URL}/img/pic1.jpeg`} alt='' />
							</SwiperSlide>
							<SwiperSlide data-slide='3'>
								<img src={`${process.env.PUBLIC_URL}/img/contact.jpg`} alt='' />
							</SwiperSlide>
							<SwiperSlide data-slide='4'>
								<img src={`${process.env.PUBLIC_URL}/img/team.jpeg`} alt='' />
							</SwiperSlide>
						</Swiper>
					</div>
				</div>
			</div>
		</section>
	);
}

export default memo(Banner);
