import { useState, useEffect, memo } from 'react';

function News({ Scrolled, Pos }) {
	const dummy = [
		{ title: 'Hello6', content: 'Here comes description in detail.' },
		{ title: 'Hello5', content: 'Here comes description in detail.' },
		{ title: 'Hello4', content: 'Here comes description in detail.' },
		{ title: 'Hello3', content: 'Here comes description in detail.' },
		{ title: 'Hello2', content: 'Here comes description in detail.' },
		{ title: 'Hello1', content: 'Here comes description in detail.' },
	];
	const getLocalData = () => {
		const data = localStorage.getItem('post');
		if (data) return JSON.parse(data);
		else return dummy;
	};
	const [Posts] = useState(getLocalData());
	const currentPos = Scrolled - Pos;

	useEffect(() => {
		localStorage.setItem('post', JSON.stringify(Posts));
	}, [Posts]);

	return (
		<section id='news' className='news_wrap myScroll'>
			<div className='inner'>
				<h2 style={{ transform: `translateX(${currentPos}px)` }} className='head_title'>
					WHAT WE'RE POSTING WHAT WE'RE POSTING
				</h2>
				<div className='news_list_wrap'>
					<div className='news_list'>
						<ul className='news_item'>
							{Posts.map((post, idx) => {
								if (idx >= 10) return null;
								return (
									<li key={idx}>
										<div href='#' className='news_link'>
											<p className='news_link__title'>{post.title}</p>
											{/* <p className='news_link__desc'>{post.content}</p> */}
										</div>
									</li>
								);
							})}
						</ul>
					</div>
					<p className='btn_wrap'>
						<a href='#' className='btn_round'>
							<span>VIEW MORE</span>
						</a>
					</p>
				</div>
			</div>
		</section>
	);
}

export default memo(News);
