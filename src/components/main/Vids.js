import { memo } from 'react';
import { useYoutubeQuery } from '../../hooks/useYoutubeQuery';
import { Link } from 'react-router-dom';

function Vids() {
	const { data: Vids, isSuccess } = useYoutubeQuery();

	return (
		<section className='myScroll'>
			<div className='insights_wrap'>
				<div className='inner'>
					<div className='head_title_wrap'>
						<h2 className='head_title'>LATEST INSIGHTS</h2>
						<p className='btn_wrap'>
							<Link to='/youtube' className='btn_round'>
								<span>VIEW ALL</span>
							</Link>
						</p>
					</div>
					<div className='gallery_list_wrap'>
						<ul className='gallery_list'>
							{isSuccess &&
								Vids.map((vid, idx) => {
									if (idx >= 3) return null;
									return (
										<li key={idx}>
											<div className='gallery_item'>
												<p className='gallery_item__title'>
													{vid.snippet.title.length > 70 ? vid.snippet.title.substr(0, 90) + '...' : vid.snippet.title}
												</p>
												<div className='gallery_item__info gallery_info'>
													<span className='gallery_info__name'>By {vid.snippet.videoOwnerChannelTitle}</span>
													<span className='gallery_info__date'>
														{vid.snippet.publishedAt.split('T')[0].split('-').join('.')}
													</span>
												</div>
												<div className='gallery_item__img'>
													<img
														src={vid.snippet.thumbnails.standard.url}
														alt={vid.snippet.title}
														className='gallery_img'
													/>
												</div>
											</div>
										</li>
									);
								})}
						</ul>
					</div>
				</div>
			</div>
		</section>
	);
}

export default memo(Vids);
