function News() {
	return (
		<section className='myScroll'>
			<div className='work_wrap'>
				<div className='inner'>
					<h2 className='head_title_wrap'>
						<span className='head_title'>LATEST</span>
						{/*  <span className='head_title__sub'>WE HAVE CASE STUDIES, IN CASE YOU FEEL LIKE STUDYING THEM. */}
						{/* </span> */}
						<span className='head_title'>CASE STUDIES</span>
					</h2>

					<div className='work_list_wrap'>
						<ul className='work_list'>
							<li>
								<a href='/' className='work_item'>
									<p className='work_item__num'>p / 123</p>
									<p className='work_item__desc'>A smarter digital home for the premium smart home solution</p>
									{/* <p className='work_item__title'><i className='fa-solid fa-x'></i><span>Crestron Home</span></p> */}
									<div className='work_item__img'>
										<img src={`${process.env.PUBLIC_URL}/img/pic1.jpeg`} alt='' className='work_img' />
										<img src={`${process.env.PUBLIC_URL}/img/pic2.jpeg`} alt='' className='work_img' />
									</div>
								</a>
							</li>
							<li>
								<a href='/' className='work_item'>
									<p className='work_item__num'>p / 123</p>
									<p className='work_item__desc'>A smarter digital home for the premium smart home solution</p>
									<p className='work_item__title'>
										<i className='fa-solid fa-x'></i>
										<span>Crestron Home</span>
									</p>
									<div className='work_item__img'>
										<img src={`${process.env.PUBLIC_URL}/img/pic3.jpeg`} alt='' className='work_img' />
										<img src={`${process.env.PUBLIC_URL}/img/pic4.jpeg`} alt='' className='work_img' />
									</div>
								</a>
							</li>
							<li>
								<a href='/' className='work_item'>
									<p className='work_item__num'>p / 123</p>
									<p className='work_item__desc'>A smarter digital home for the premium smart home solution</p>
									<p className='work_item__title'>
										<i className='fa-solid fa-x'></i>
										<span>Crestron Home</span>
									</p>
									<div className='work_item__img'>
										<img src={`${process.env.PUBLIC_URL}/img/pic5.jpeg`} alt='' className='work_img' />
										<img src={`${process.env.PUBLIC_URL}/img/pic6.jpeg`} alt='' className='work_img' />
									</div>
								</a>
							</li>
						</ul>
					</div>
					<p className='btn_wrap'>
						<a href='/' className='btn_round'>
							<span>SEE OUR WORK</span>
						</a>
					</p>
				</div>
			</div>
		</section>
	);
}

export default News;
