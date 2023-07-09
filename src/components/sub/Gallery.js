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
	return <Layout name={'Gallery'}></Layout>;
}

export default Gallery;
