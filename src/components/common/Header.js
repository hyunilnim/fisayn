import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, NavLink } from 'react-router-dom';

function Header({ type }) {
	const active = 'on';
	return (
		// props로 전달되는 type값을 header의 class명으로 지정해서 스타일 분기처리
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
						<li>
							<NavLink to='/member' activeClassName={active}>
								Member
							</NavLink>
						</li>
					</ul>
				</nav>
				<FontAwesomeIcon icon={faBars} />
			</div>
		</header>
	);
}

export default Header;
