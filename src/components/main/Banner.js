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
							<div className='swiper-wrapper'>
								<article data-slide='1' className='swiper-slide'>
									<img src={`${process.env.PUBLIC_URL}/img/pic2.jpeg`} alt='' />
								</article>
								<article data-slide='2' className='swiper-slide'>
									<img src={`${process.env.PUBLIC_URL}/img/pic1.jpeg`} alt='' />
								</article>
								<article data-slide='3' className='swiper-slide'>
									<img src={`${process.env.PUBLIC_URL}/img/contact.jpg`} alt='' />
								</article>
								<article data-slide='4' className='swiper-slide'>
									<img src={`${process.env.PUBLIC_URL}/img/team.jpeg`} alt='' />
								</article>
							</div>
						</div>
						<div className='swiper-option'>
							<div className='swiper-button-prev'></div>
							<div className='swiper-button-next'></div>
							<span className='btnPlay on'>play</span>
							<span className='btnPause'>pause</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Banner;
