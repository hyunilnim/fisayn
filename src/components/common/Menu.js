import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import { close } from '../../redux/menuSlice';

function Menu() {
	const active = { color: 'aqua' };
	const dispatch = useDispatch();
	const menu = useSelector((store) => store.menu.open);
	useEffect(() => {
		window.addEventListener('resize', () => {
			if (window.innerWidth >= 1200) dispatch(close());
		});
	}, [dispatch]);

	return (
		<>
			<AnimatePresence>
				{menu && (
					<motion.nav
						id='mobileMenu'
						initial={{ x: -280 }}
						animate={{ x: 0, transition: { duration: 0.3 } }}
						exit={{ opacity: 0, x: -280, transition: { duration: 0.3 } }}
						onClick={() => dispatch(close())}
					>
						<h1>
							<Link to='/'>LOGO</Link>
						</h1>
						<ul id='mobileGnb'>
							<li>
								<NavLink to='/department' activeStyle={active}>
									Department
								</NavLink>
							</li>
							<li>
								<NavLink to='/community' activeStyle={active}>
									Community
								</NavLink>
							</li>
							<li>
								<NavLink to='/gallery' activeStyle={active}>
									Gallery
								</NavLink>
							</li>
							<li>
								<NavLink to='/youtube' activeStyle={active}>
									Youtube
								</NavLink>
							</li>
							<li>
								<NavLink to='/contact' activeStyle={active}>
									Contact
								</NavLink>
							</li>
							<li>
								<NavLink to='/member' activeStyle={active}>
									Member
								</NavLink>
							</li>
						</ul>
					</motion.nav>
				)}
			</AnimatePresence>
		</>
	);
}

export default Menu;
