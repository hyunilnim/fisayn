import Layout from '../common/Layout';
import { useEffect, useMemo, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

function Contact() {
	const container = useRef(null);

	const form = useRef(null);
	const inputName = useRef(null);
	const inputEmail = useRef(null);
	const inputMsg = useRef(null);

	const { kakao } = window;
	const [Traffic, setTraffic] = useState(false);
	const [Index, setIndex] = useState(0);

	const [Location, setLocation] = useState(null);
	const [Success, setSuccess] = useState(false);

	const info = useRef([
		{
			title: '본사',
			latlng: new kakao.maps.LatLng(37.57598923870742, 126.9768610125929),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker.png`,
			imgSize: new kakao.maps.Size(85, 85),
			imgPos: { offset: new kakao.maps.Point(45, 80) },
		},
		{
			title: '서울 지사',
			latlng: new kakao.maps.LatLng(37.5662952, 126.9779451),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker.png`,
			imgSize: new kakao.maps.Size(85, 85),
			imgPos: { offset: new kakao.maps.Point(45, 80) },
		},
		{
			title: '제주 지사',
			latlng: new kakao.maps.LatLng(33.450701, 126.570667),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker.png`,
			imgSize: new kakao.maps.Size(85, 85),
			imgPos: { offset: new kakao.maps.Point(45, 80) },
		},
	]);

	// const imgSrc = info[Index].imgSrc;
	// const imgSize = info[Index].imgSize;
	// const imgPos = info[Index].imgPos;
	// const option = {
	// 	center: info[Index].latlng,
	// 	level: 3,
	// };
	// const markerImage = new kakao.maps.MarkerImage(imgSrc, imgSize, imgPos);

	const marker = useMemo(() => {
		return new kakao.maps.Marker({
			position: info.current[Index].latlng,
			image: new kakao.maps.MarkerImage(
				info.current[Index].imgSrc,
				info.current[Index].imgSize,
				info.current[Index].imgPos
			),
		});
	}, [Index, kakao]);

	const sendEmail = (e) => {
		e.preventDefault();

		emailjs.sendForm('service_n8o6gw3', 'template_wcsi2oh', form.current, '3qmq3SKmOEg8rXy8d').then(
			(result) => {
				setSuccess(true);
				inputName.current.value = '';
				inputEmail.current.value = '';
				inputMsg.current.value = '';
			},
			(error) => {
				setSuccess(false);
			}
		);
	};

	useEffect(() => {
		container.current.innerHTML = '';
		const mapInstance = new kakao.maps.Map(container.current, { center: info.current[Index].latlng, level: 3 });

		marker.setMap(mapInstance);
		mapInstance.addControl(new kakao.maps.MapTypeControl(), kakao.maps.ControlPosition.TOPRIGHT);
		mapInstance.addControl(new kakao.maps.ZoomControl(), kakao.maps.ControlPosition.RIGHT);

		setLocation(mapInstance);

		mapInstance.setZoomable(false);

		const setCenter = () => {
			mapInstance.setCenter(info.current[Index].latlng);
		};

		window.addEventListener('resize', setCenter);
		return () => window.removeEventListener('resize', setCenter);
	}, [Index, kakao, marker]);

	useEffect(() => {
		Traffic
			? Location?.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
			: Location?.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
	}, [Traffic, Location, kakao]);

	return (
		<Layout name={'Contact'}>
			<>
				<div className='map_wrap'>
					<div className='branch'>
						{info.current.map((el, idx) => {
							return (
								<button type='button' key={idx} className={idx === Index ? 'on' : ''} onClick={() => setIndex(idx)}>
									{el.title}
								</button>
							);
						})}
						<span className='branch__bg'></span>
					</div>
					<div id='map' ref={container} className={Traffic ? 'on' : 'off'}></div>
					<button
						type='button'
						className='btnToggle'
						onClick={() => {
							setTraffic(!Traffic);
						}}
					>
						{Traffic ? 'TRAFFIC OFF' : 'TRAFFIC ON'}
					</button>
				</div>

				<div id='formBox' className='contactMail'>
					<form ref={form} onSubmit={sendEmail}>
						<h2>Send a Message</h2>
						<div className='mailForm'>
							{/* <label>Name</label> */}
							<input type='text' name='user_name' placeholder='Name' ref={inputName} />
							{/* <label>Email</label> */}
							<input type='email' name='user_email' placeholder='Email' ref={inputEmail} />
							{/* <label>Message</label> */}
							<textarea name='message' placeholder='Message' ref={inputMsg} />
						</div>
						<div className='mailForm_btn'>
							<input type='submit' value='Send' />
						</div>
					</form>
					{Success && <p className='contactMail_alert'>메일이 성공적으로 발송되었습니다.</p>}
				</div>
			</>
		</Layout>
	);
}

export default Contact;
