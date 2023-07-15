import Header from '../common/Header';
import Visual from './Visual';
import News from './News';
import Pics from './Pics';
import Vids from './Vids';
import Banner from './Banner';

function Main({ menu }) {
	return (
		<main>
			<Header type={'main'} menu={menu} />
			<Visual />
			<News />

			<Pics />
			<Vids />
			<Banner />
		</main>
	);
}

export default Main;
