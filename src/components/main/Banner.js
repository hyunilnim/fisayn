import { memo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function BtnRolling() {
	return (
		<ul className='controls'>
			<li>
				<button type='button'></button>
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
						<div id='visual'>
							<Swiper
								modules={[Autoplay, Pagination, Navigation]}
								loop={true}
								autoplay={{ delay: 2000, disableOnInteraction: true }}
								pagination={{ clickable: true }}
								navigation={true}
							>
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
						{/* <div className='swiper-option'>
							<div className='swiper-button-prev'></div>
							<div className='swiper-button-next'></div>
							<span className='btnPlay on'>play</span>
							<span className='btnPause'>pause</span>
						</div> */}
					</div>
				</div>
			</div>
		</section>
	);
}

export default memo(Banner);
