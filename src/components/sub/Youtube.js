import Layout from '../common/Layout';
import { useState, useRef, useEffect } from 'react';
import Modal from '../common/Modal';
import { useYoutubeQuery } from '../../hooks/useYoutubeQuery';

function Youtube() {
	const modal = useRef(null);
	const [Index, setIndex] = useState(0);
	const [Mounted, setMounted] = useState(true);
	const { data: Vids, isSuccess } = useYoutubeQuery();

	useEffect(() => {
		return () => setMounted(false);
	}, []);

	return (
		<>
			<Layout name={'Youtube'}>
				<ul className='gallery_list'>
					{Mounted &&
						isSuccess &&
						Vids.map((video, idx) => {
							return (
								<li key={idx}>
									<div
										className='gallery_item'
										onClick={() => {
											console.log('test');
											modal.current.openPop();
											setIndex(idx);
										}}
									>
										<div className='gallery_item__img'>
											<img
												src={video.snippet.thumbnails.standard.url}
												alt={video.snippet.title}
												className='gallery_img'
											/>
										</div>
										<div className='gallery_item__side gallery_side'>
											<h2 className='gallery_side__title'>
												{video.snippet.title.length > 70
													? video.snippet.title.substr(0, 90) + '...'
													: video.snippet.title}
											</h2>
											<p className='gallery_side__desc'>
												{video.snippet.description.length > 200
													? video.snippet.description.substr(0, 200) + '...'
													: video.snippet.description}
											</p>

											<div className='gallery_side__info gallery_info'>
												<p className='gallery_info__name'>
													<span>By </span>
													{video.snippet.videoOwnerChannelTitle}
												</p>
												<span className='gallery_info__date'>
													{video.snippet.publishedAt.split('T')[0].split('-').join('.')}
												</span>
											</div>
										</div>
									</div>
								</li>
							);
						})}
				</ul>
			</Layout>
			<Modal ref={modal}>
				<iframe
					title={isSuccess && Vids[Index]?.id}
					src={`https://www.youtube.com/embed/${isSuccess && Vids[Index]?.snippet.resourceId.videoId}`}
				></iframe>
				유튜브컨텐츠
			</Modal>
		</>
	);
}

export default Youtube;
