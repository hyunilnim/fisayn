import { Route, Switch } from 'react-router-dom';
import { useEffect } from 'react';

// common
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Menu from './components/common/Menu';

// main
import Main from './components/main/Main';

// sub
import Community from './components/sub/Community';
import Contact from './components/sub/Contact';
import Department from './components/sub/Department';
import Gallery from './components/sub/Gallery';
import Member from './components/sub/Member';
import Youtube from './components/sub/Youtube';

//scss
import './scss/style.scss';

//redux
import { fetchDepartment } from './redux/departmentSlice';
import { fetchGallery } from './redux/gallerySlice';
import { useDispatch } from 'react-redux';

//react-query
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function App() {
	const queryClient = new QueryClient();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchDepartment());
		dispatch(fetchGallery({ type: 'user', user: '198484213@N03' }));
	}, [dispatch]);

	return (
		<QueryClientProvider client={queryClient}>
			<Switch>
				{/* header 부분 */}
				<Route exact path='/' render={() => <Main />} />

				<Route path='/' render={() => <Header type={'sub'} />} />
			</Switch>

			<Route path='/department' component={Department} />
			<Route path='/community' component={Community} />
			<Route path='/gallery' component={Gallery} />
			<Route path='/youtube' component={Youtube} />
			<Route path='/contact' component={Contact} />
			<Route path='/member' component={Member} />
			<Footer />
			<Menu />
			<ReactQueryDevtools />
		</QueryClientProvider>
	);
}

export default App;
