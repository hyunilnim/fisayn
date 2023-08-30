import Layout from '../common/Layout';
import Masonry from 'react-masonry-component';
import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Modal from '../common/Modal';
import { useGalleryQuery } from '../../hooks/useGalleryQuery';

function Gallery() {
	const [Mounted, setMounted] = useState(true);

	const openModal = useRef(null);
	const isUser = useRef(true);
	const frame = useRef(null);
	const btnSet = useRef(null);
	const searchInput = useRef(null);
	const enableEvent = useRef(true);
	const [Loader, setLoader] = useState(true);
	const [Index, setIndex] = useState(0);
	const counter = useRef(0);

	const firstLoaded = useRef(true);
	const [Opt, setOpt] = useState({ type: 'user', user: '198484213@N03' });
	const { data: Items, isSuccess } = useGalleryQuery(Opt);

	const resetGallery = (e) => {
		const btns = btnSet.current.querySelectorAll('button');
		btns.forEach((el) => el.classList.remove('on'));
		e.target.classList.add('on');
		enableEvent.current = false;
		setLoader(true);
		document.body.style.overflow = 'hidden';
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
		frame.current.classList.remove('on');
	};

	const showInterest = (e) => {
		if (!enableEvent.current) return;
		if (e.target.classList.contains('on')) return;

		resetGallery(e);

		setOpt({ type: 'interest' });
		isUser.current = false;
	};

	const showMine = (e) => {
		if (!enableEvent.current) return;
		if (e.target.classList.contains('on')) return;

		resetGallery(e);

		setOpt({ type: 'user', user: '198484213@N03' });
	};

	const showSearch = (e) => {
		const tag = searchInput.current.value.trim();
		if (tag === '') return alert('검색어를 입력하세요.');
		if (!enableEvent.current) return;

		resetGallery(e);

		setOpt({ type: 'search', tags: tag });
		searchInput.current.value = '';
		isUser.current = false;
	};

	useEffect(() => {
		counter.current = 0;
		if (isSuccess && Items.length === 0 && !firstLoaded.current) {
			setLoader(false);
			frame.current.classList.add('on');
			const btnMine = btnSet.current.children;
			btnMine[1].classList.add('on');
			setOpt({ type: 'user', user: '198484213@N03' });
			enableEvent.current = true;
			return alert('이미지 결과값이 없습니다.');
		}

		firstLoaded.current = false;
		const imgs = frame.current.querySelectorAll('img');
		imgs.forEach((img) => {
			img.onload = () => {
				++counter.current;
				if (counter.current === imgs.length - 2) {
					setLoader(false);
					frame?.current.classList.add('on');
					enableEvent.current = true;
					document.body.style.overflow = 'auto';
				}
			};
		});
		return () => setMounted(false);
	}, [isSuccess, Items]);

	return (
		<>
			<Layout name={'Gallery'}>
				<div className='gallery_wrap'>
					<div className='gallery_top'>
						<div className='gallery_menu btnSet' ref={btnSet}>
							<button type='button' onClick={showInterest} className=''>
								Interest Gallery
							</button>
							<button type='button' onClick={showMine} className='on'>
								My Gallery
							</button>
							<span className='gallery_menu__bg'></span>
						</div>
						<div className='searchBox'>
							<input
								type='text'
								placeholder='Pictures, people, or groups'
								ref={searchInput}
								onKeyPress={(e) => e.key === 'Enter' && showSearch(e)}
							/>
							<button type='button' className='searchBtn' onClick={showSearch}>
								<FontAwesomeIcon icon={faMagnifyingGlass} />
								<span className='text_hidden'>Search</span>
							</button>
						</div>
					</div>
					<div className='frame' ref={frame}>
						<Masonry
							elementType={'ul'}
							className='gallery_list'
							options={{ transitionDuration: '0.5s' }}
						>
							{isSuccess &&
								Items.map((item, idx) => {
									return (
										<li className='item' key={idx}>
											<div className='gallery_item'>
												<p className='gallery_item__pic'>
													<img
														src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_w.jpg`}
														alt={item.title}
														className='pic'
														onClick={() => {
															openModal.current?.openPop();
															setIndex(idx);
														}}
													/>
												</p>
												<div className='gallery_item__profile gallery_profile'>
													<p className='gallery_profile__img'>
														<img
															src={`http://farm${item.farm}.staticflickr.com/${item.server}/buddyicons/${item.owner}.jpg`}
															alt={item.title}
															onError={(e) =>
																e.target.setAttribute(
																	'src',
																	'https://www.flickr.com/images/buddyicon.gif'
																)
															}
														/>
													</p>
													<span
														className='gallery_profile__id'
														onClick={(e) => {
															if (isUser.current) return;
															isUser.current = true;
															if (!enableEvent.current) return;
															enableEvent.current = false;
															setLoader(true);
															frame.current.classList.remove('on');
															setOpt({ type: 'user', user: e.target.innerText });
														}}
													>
														{item.owner}
													</span>
													<p className='gallery_profile__title'>
														{item.title === '' ? 'Have a good day !' : item.title}
													</p>
												</div>
											</div>
										</li>
									);
								})}
						</Masonry>
					</div>
				</div>
				{Loader && (
					<div className='loading'>
						<svg className='svg-container' height='100' width='100' viewBox='0 0 100 100'>
							<circle className='loader-svg bg' cx='50' cy='50' r='45'></circle>
							<circle className='loader-svg animate' cx='50' cy='50' r='45'></circle>
						</svg>
					</div>
				)}
			</Layout>
			<Modal ref={openModal}>
				{isSuccess && (
					<img
						src={`https://live.staticflickr.com/${Items[Index]?.server}/${Items[Index]?.id}_${Items[Index]?.secret}_b.jpg`}
						alt={Items[Index]?.title}
					/>
				)}
			</Modal>
		</>
	);
}

export default Gallery;
