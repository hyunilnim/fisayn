import Layout from '../common/Layout';
import { useEffect, useRef, useState } from 'react';

function Contact() {
	const container = useRef(null);
	const { kakao } = window;
	const [traffic, setTraffic] = useState(false);
	const [index, setIndex] = useState(0);

	const info = [
		{
			title: '광화문',
			latlng: new kakao.maps.LatLng(37.57598923870742, 126.9768610125929),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker.png`,
			imgSize: new kakao.maps.Size(85, 85),
			imgPos: { offset: new kakao.maps.Point(45, 80) },
		},
		{
			title: '수정전',
			latlng: new kakao.maps.LatLng(37.578987, 126.976045),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker.png`,
			imgSize: new kakao.maps.Size(85, 85),
			imgPos: { offset: new kakao.maps.Point(45, 80) },
		},
		{
			title: '카카오본사',
			latlng: new kakao.maps.LatLng(33.450701, 126.570667),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker.png`,
			imgSize: new kakao.maps.Size(85, 85),
			imgPos: { offset: new kakao.maps.Point(45, 80) },
		},
	];

	const imgSrc = info[index].imgSrc;
	const imgSize = info[index].imgSize;
	const imgPos = info[index].imgPos;

	const option = {
		center: info[index].latlng,
		level: 3,
	};

	const markerImage = new kakao.maps.MarkerImage(imgSrc, imgSize, imgPos);
	const marker = new kakao.maps.Marker({ position: option.center, image: markerImage });

	useEffect(() => {
		const mapInstance = new kakao.maps.Map(container.current, option);
		marker.setMap(mapInstance);

		traffic
			? mapInstance.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
			: mapInstance.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
	}, [traffic]);

	return (
		<Layout name={'Contact'}>
			{/* <div class='map_wrap'>
				<div class='branch'>
					<button class='on' type='button'>본점</button>
					<button type='button'>서울 지점</button>
					<button type='button'>제주 지점</button>
					<span class='branch__bg'></span>
				</div>
				<div class='wrap' id='map'></div>
				<button type='button' class='btnToggle'>교통 상황 보지 않기</button>
			</div> */}
			<div className='map_wrap'>
				<div id='map' ref={container}></div>
				<button
					type='button'
					className='btnToggle'
					onClick={() => {
						setTraffic(!traffic);
					}}
				>
					{''}
					{traffic ? 'TRAFFIC OFF' : 'TRAFFIC ON'}
				</button>
			</div>
		</Layout>
	);
}

export default Contact;
