import { useSelector } from 'react-redux';

function Footer() {
	const Department = useSelector((store) => store.department.data);

	return (
		<footer id='footer'>
			<div className='inner footer_wrap'>
				<h1>LOGO</h1>
				<p>2023 DECODELAB &copy; ALL RIGHTS RESERVED.</p>
				<p>{`This Company was founded by ${Department[0]?.name} in 1993`}</p>
			</div>
		</footer>
	);
}

export default Footer;
