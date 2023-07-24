import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchGallery = createAsyncThunk('gallery/requestGallery', async (opt) => {
	const api_key = '6c70577e2661042cd0ab587b17f6c944';
	const num = 50;
	const baseURL = 'https://www.flickr.com/services/rest/?format=json&nojsoncallback=1';

	const method_interest = 'flickr.interestingness.getList';
	const method_user = 'flickr.people.getPhotos';
	const method_search = 'flickr.photos.search';

	let url = '';

	if (opt.type === 'interest') url = `${baseURL}&api_key=${api_key}&per_page=${num}&method=${method_interest}`;
	if (opt.type === 'user')
		url = `${baseURL}&api_key=${api_key}&per_page=${num}&method=${method_user}&user_id=${opt.user}`;
	if (opt.type === 'search')
		url = `${baseURL}&api_key=${api_key}&per_page=${num}&method=${method_search}&tags=${opt.tags}`;

	const response = await axios.get(url);
	return response.data.items;
});

const gallerySlice = createSlice({
	name: 'gallery',
	initialState: {
		data: [],
		isLoading: false,
	},
	extraReducers: {
		[fetchGallery.pending]: (state) => {
			state.isLoading = true;
		},
		[fetchGallery.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		},
		[fetchGallery.rejected]: (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		},
	},
});

export default gallerySlice.reducer;
