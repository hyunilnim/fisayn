import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

//youtube fetching 함수 만들기,

const fetchYoutube = async () => {
	const key = 'AIzaSyC4TpEbx2d9lOtjiVQIg3b6wA6ZKKrDL7c';
	const list = 'PLQZTVbf9_qAn_Nwrz2maZG64AaEBcFZfb';
	const num = 10;
	const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${list}&key=${key}&maxResults=${num}`;

	const response = await axios.get(url);
	// setVids(result.data.items);
	return response.data.items;
};

export const useYoutubeQuery = () => {
	return useQuery(['youtubeData'], fetchYoutube, {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		cacheTime: 1000 * 5,
		staleTime: 1000 * 5,
	});
};
