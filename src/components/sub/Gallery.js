import axios from 'axios';
import Layout from '../common/Layout';
import Masonry from 'react-masonry-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function Gallery() {
	const frame = useRef(null);
	const searchInput = useRef(null);
	const [Item, setItem] = useState([]);
	const [Loader, setLoader] = useState(true);

	const fetchData = async (opt) => {
		let counter = 0;
		const api_key = '6c70577e2661042cd0ab587b17f6c944';
		// const myID = '198484213@N03';
		const num = 200;
		const baseURL = `https://www.flickr.com/services/rest/?format=json&nojsoncallback=1`;

		const method_interest = 'flickr.interestingness.getList';
		const method_user = 'flickr.people.getPhotos';
		const method_search = 'flickr.photos.search';

		// const url = `${baseURL}&api_key=${api_key}&per_page=${num}&method=${method_interest}`;
		let url = '';

		if (opt.type === 'interest') {
			url = `${baseURL}&api_key=${api_key}&per_page=${num}&method=${method_interest}`;
		}

		if (opt.type === 'user') {
			url = `${baseURL}&api_key=${api_key}&per_page=${num}&method=${method_user}&user_id=${opt.user}`;
		}

		if (opt.type === 'search') {
			url = `${baseURL}&api_key=${api_key}&per_page=${num}&method=${method_search}$tags=${opt.tags}`;
		}

		const result = await axios.get(url);
		setItem(result.data.photos.photo);

		const imgs = frame.current.querySelectorAll('img');
		imgs.forEach((img) => {
			img.onload = () => {
				++counter;

				if (counter === imgs.length - 2) {
					setLoader(false);
					frame.current.classList.add('on');
				}
			};
		});
	};
	const showSearch = (e) => {
		const tag = searchInput.current.value.trim();
		if (tag === '') return alert('검색어를 입력하세요.');

		fetchData({ type: 'search', tags: tag });
		searchInput.current.value = '';
	};
	useEffect(() => {
		fetchData({ type: 'interest' });
		// fetchData({ type: 'user', user: '198484213@N03' });
	}, []);

	return (
		<Layout name={'Gallery'}>
			<div className='gallery_wrap'>
				<div className='gallery_top'>
					<div className='gallery_menu'>
						<button
							type='button'
							onClick={() => {
								setLoader(true);
								frame.current.classList.remove('on');
								fetchData({ type: 'interest' });
							}}
							className='on'
						>
							Interest Gallery
						</button>
						<button
							type='button'
							onClick={() => {
								setLoader(true);
								frame.current.classList.remove('on');
								fetchData({ type: 'user', user: '198484213@N03' });
							}}
							className=''
						>
							My Gallery
						</button>
						<span className='gallery_menu__bg'></span>
					</div>
					<div className='searchBox'>
						<input type='text' id='search' placeholder='Pictures, people, or groups' ref={searchInput} />
						<button type='button' className='searchBtn' onClick={showSearch}>
							<FontAwesomeIcon icon={faMagnifyingGlass} />
							<span className='text_hidden'>Search</span>
						</button>
					</div>
				</div>
				<div className='frame' ref={frame}>
					<Masonry elementType={'ul'} className='gallery_list' options={{ transitionDuration: '0.5s' }}>
						{Item.map((item, idx) => {
							return (
								<li className='item' key={idx}>
									<div className='gallery_item'>
										<img
											src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_w.jpg`}
											alt={item.title}
											className='pic'
										/>
										<div className='gallery_item__profile gallery_profile'>
											<p className='gallery_profile__img'>
												<img
													src={`http://farm${item.farm}.staticflickr.com/${item.server}/buddyicons/${item.owner}.jpg`}
													alt={item.title}
													onError={(e) => e.target.setAttribute('src', 'https://www.flickr.com/images/buddyicon.gif')}
												/>
											</p>
											<span
												className='gallery_profile__id'
												onClick={(e) => {
													setLoader(true);
													frame.current.classList.remove('on');
													fetchData({ type: 'user', user: e.target.innerText });
												}}
											>
												{item.owner}
											</span>
											<p className='gallery_profile__title'>{item.title === '' ? 'Have a good day !' : item.title}</p>
										</div>
									</div>
								</li>
							);
						})}
					</Masonry>
				</div>
			</div>
			{Loader && (
				<div className='loading'>
					<svg className='svg-container' height='100' width='100' viewBox='0 0 100 100'>
						<circle className='loader-svg bg' cx='50' cy='50' r='45'></circle>
						<circle className='loader-svg animate' cx='50' cy='50' r='45'></circle>
					</svg>
				</div>
			)}
		</Layout>
	);
}

export default Gallery;
