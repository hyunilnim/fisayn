import axios from 'axios';
import Layout from '../common/Layout';
import { useEffect, useState } from 'react';

function Gallery() {
	const api_key = '6c70577e2661042cd0ab587b17f6c944';
	// const myID = '198484213@N03';
	const num = 20;
	const baseURL = `https://www.flickr.com/services/rest/?format=json&nojsoncallback=1`;

	const method_interest = 'flickr.interestingness.getList';
	const method_user = 'flickr.people.getPhotos';
	const method_search = 'flickr.photos.search';

	const url = `${baseURL}&api_key=${api_key}&per_page=${num}&method=${method_interest}`;
	const [Item, setItem] = useState([]);

	useEffect(() => {
		axios.get(url).then((json) => {
			setItem(json.data.photos.photo);
		});
	}, []);

	return (
		<Layout name={'Gallery'}>
			<div className='gallery_wrap'>
				<div className='gallery_menu'>
					<button type='button' className='btnInterest'>
						Interest Gallery
					</button>
					<button type='button' className='btnMine on'>
						My Gallery
					</button>
					<span className='gallery_menu__bg'></span>
				</div>
				<ul className='gallery_list'>
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
											/>
										</p>
										<span className='gallery_profile__id'>{item.owner}</span>
										<p className='gallery_profile__title'>{item.title === '' ? 'Have a good day !' : item.title}</p>
									</div>
								</div>
							</li>
						);
					})}
				</ul>
			</div>
		</Layout>
	);
}

export default Gallery;
