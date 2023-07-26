import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { memo } from 'react';
import { useSelector } from 'react-redux';

function Pics() {
	// console.log(useSelector((store) => store));
	const Pics = useSelector((store) => store.gallery.data);
	console.log(Pics);

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
							{Pics.map((pic, idx) => {
								if (idx >= 6) return null;
								return (
									<li key={idx}>
										<a href='/' className='work_item'>
											<p className='work_item__num'>p / 123</p>
											<p className='work_item__desc'>A smarter digital home for the premium smart home solution</p>
											<p className='work_item__title'>
												<FontAwesomeIcon icon={faX} />
												<span>Crestron Home</span>
											</p>
											<div className='work_item__img'>
												<img
													src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_w.jpg`}
													alt={pic.title}
												/>
											</div>
										</a>
									</li>
								);
							})}

							{/* <li>
								<a href='/' className='work_item'>
									<p className='work_item__num'>p / 123</p>
									<p className='work_item__desc'>A smarter digital home for the premium smart home solution</p>
									<p className='work_item__title'>
										<FontAwesomeIcon icon={faX} />
										<span>Crestron Home</span>
									</p>
									<div className='work_item__img'>
										<img src={`${process.env.PUBLIC_URL}/img/pic1.jpeg`} alt='' className='work_img' />
										<img src={`${process.env.PUBLIC_URL}/img/pic2.jpeg`} alt='' className='work_img' />
									</div>
								</a>
							</li> */}
							{/* <li>
								<a href='/' className='work_item'>
									<p className='work_item__num'>p / 123</p>
									<p className='work_item__desc'>A smarter digital home for the premium smart home solution</p>
									<p className='work_item__title'>
										<FontAwesomeIcon icon={faX} />
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
										<FontAwesomeIcon icon={faX} />
										<span>Crestron Home</span>
									</p>
									<div className='work_item__img'>
										<img src={`${process.env.PUBLIC_URL}/img/pic5.jpeg`} alt='' className='work_img' />
										<img src={`${process.env.PUBLIC_URL}/img/pic6.jpeg`} alt='' className='work_img' />
									</div>
								</a>
							</li> */}
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

export default memo(Pics);
