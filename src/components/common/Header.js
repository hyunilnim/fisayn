import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, NavLink } from 'react-router-dom';

function Header({ type, menu }) {
	const active = 'on';
	return (
		<>
			<header className={type}>
				<div className='header_wrap'>
					<h1 className='logo'>
						<Link to='/'>LOGO</Link>
					</h1>
					<nav id='nav'>
						<ul className='gnb'>
							<li>
								<NavLink to='/department' activeClassName={active}>
									Department
								</NavLink>
							</li>
							<li>
								<NavLink to='/community' activeClassName={active}>
									Community
								</NavLink>
							</li>
							<li>
								<NavLink to='/gallery' activeClassName={active}>
									Gallery
								</NavLink>
							</li>
							<li>
								<NavLink to='/youtube' activeClassName={active}>
									Youtube
								</NavLink>
							</li>
							<li>
								<NavLink to='/contact' activeClassName={active}>
									Contact
								</NavLink>
							</li>
						</ul>
					</nav>
					<div className='nav_side'>
						<NavLink to='/member' activeClassName={active}>
							Member
						</NavLink>
					</div>
					<button
						type='button'
						className='menuOpen'
						onClick={() => {
							menu.current.toggle();
						}}
					>
						<FontAwesomeIcon icon={faBars} />
					</button>
				</div>
			</header>
			{/* <Menu ref={toggleMenu} /> */}
		</>
	);
}

export default Header;
