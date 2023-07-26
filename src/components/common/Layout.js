import React from 'react';
import { useEffect, useRef } from 'react';

function Layout({ name, children, txt = '' }) {
	const frame = useRef(null);
	useEffect(() => {
		frame.current.classList.add('on');
	}, []);
	return (
		<section className={`content ${name}`} ref={frame}>
			{/* <figure></figure> */}

			<div className='inner'>
				<h2 className='head_title'>{name}</h2>
				<p className='head_title__ex'>
					{txt.split('-').map((el, idx) => {
						return (
							<React.Fragment key={idx}>
								{el}
								<br />
							</React.Fragment>
						);
					})}
				</p>
				{children}
			</div>
		</section>
	);
}

export default Layout;
