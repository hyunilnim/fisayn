import Header from '../common/Header';
import Visual from './Visual';
import News from './News';
import Pics from './Pics';
import Vids from './Vids';
import Banner from './Banner';
import Btns from './Btns';
import { useState } from 'react';

function Main({ menu }) {
	const [Scrolled, setScrolled] = useState(0);
	const [Pos, setPos] = useState([]);
	return (
		<main>
			<Header type={'main'} menu={menu} />
			<Visual />
			<Vids />
			<News />

			<Pics />
			<Banner />
			<Btns setScrolled={setScrolled} setPos={setPos} />
		</main>
	);
}

export default Main;
