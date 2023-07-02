import Layout from '../common/Layout';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import Modal from '../common/Modal';

// youtube api 연동하기
// 연동할 플레이리스트의 정보를 변수에 담기
//
// 출력될 화면(마크업) 그려주기
// 이미지 썸네일 누르면 팝업되게 하기

function Youtube() {
	const modal = useRef(null);
	const [Video, setVideo] = useState([]);
	const [Index, setIndex] = useState(0);
	const fetchYoutube = async () => {
		const key = 'AIzaSyC4TpEbx2d9lOtjiVQIg3b6wA6ZKKrDL7c';
		const list = 'PLQZTVbf9_qAn_Nwrz2maZG64AaEBcFZfb';
		const num = 10;
		const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${list}&key=${key}&maxResults=${num}`;
		const result = await axios.get(url);
		setVideo(result.data.items);
	};
	useEffect(() => {
		fetchYoutube();
	}, []);
	return (
		<>
			<Layout name={'Youtube'}>
				<ul className='gallery_list'>
					{Video.map((video, idx) => {
						return (
							<li key={idx}>
								<div className='gallery_item'>
									<div
										className='gallery_item__img'
										onClick={() => {
											console.log('test');
											modal.current.openPop();
											setIndex(idx);
										}}
									>
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
											<span className='gallery_info__name'>{video.snippet.videoOwnerChannelTitle}</span>
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
					title={Video[Index]?.id}
					src={`https://www.youtube.com/embed/${Video[Index]?.snippet.resourceId.videoId}`}
				></iframe>
				유튜브컨텐츠
			</Modal>
		</>
	);
}

export default Youtube;
