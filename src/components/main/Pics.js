import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { memo } from 'react';
import { useGalleryQuery } from '../../hooks/useGalleryQuery';
import { Link, NavLink } from 'react-router-dom';

function Pics() {
	const { data: Pics, isSuccess } = useGalleryQuery({ type: 'user', user: '198484213@N03' });

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
							{isSuccess &&
								Pics.map((pic, idx) => {
									if (idx >= 6) return null;
									return (
										<li key={idx}>
											<div className='work_item'>
												<p className='work_item__desc'>A smarter digital home for the premium smart home solution</p>
												<p className='work_item__title'>
													<FontAwesomeIcon icon={faX} />
													<span>MORE</span>
												</p>
												<div className='work_item__img'>
													<img
														src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_w.jpg`}
														alt={pic.title}
													/>
												</div>
											</div>
										</li>
									);
								})}
						</ul>
					</div>
					<p className='btn_wrap'>
						<Link to='/gallery' className='btn_round'>
							<span>SEE OUR WORK</span>
						</Link>
					</p>
				</div>
			</div>
		</section>
	);
}

export default memo(Pics);
