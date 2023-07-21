function Visual({ Scrolled, Pos }) {
	const currentPos = Scrolled - Pos;
	const base = window.innerHeight / 3;
	const modifiedPos = currentPos + base;

	return (
		<section className='intro_wrap myScroll'>
			<div className='intro_head_wrap'>
				<span className='head_title__sub'>
					BUILDING BADASS
					<br />
					WEBSITES
				</span>
				<div className='intro_head'>
					<p className='intro_head__sub'>AN INTERACTIVE DESIGN AGENCY</p>
					<div className='head_wrap'>
						<div className='head_title'>
							<h2>
								BRAND VISION
								<br />
								DESIGN CULTURE
								<br />
								TECHNICAL PROWESS
							</h2>
						</div>
					</div>
				</div>
				<span className='head_title__sub'>
					FOR AMBITIOUS
					<br />
					BRANDS
				</span>
			</div>
			<div className='intro_visual'>
				<p
					className='intro_visual__img'
					style={{
						// height: `${Scrolled >= Pos - base ? 675 - modifiedPos : 675}px`,
						height: '675px',
						minHeight: '100px',
					}}
				>
					<video src={process.env.PUBLIC_URL + '/img/video.mp4'} autoPlay muted loop></video>
				</p>
			</div>
			<div className='intro_bottom'>
				<p>
					WE’RE AN OG CLASS OF CREATIVES WITH AN EYE FOR MAGIC, A KNACK FOR SCROLL-STOPPING DESIGN, AND A DIY MENTALITY
					THAT GETS SHIT DONE.
				</p>
				<p>
					Spark your brand refresh, launch a fire digital experience. With overflowing creativity and artful attention
					to detail, our team of visual designers is so talented and accomplished, it’s embarrassing.
				</p>
			</div>
		</section>
	);
}

export default Visual;
