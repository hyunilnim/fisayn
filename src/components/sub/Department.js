import Layout from '../common/Layout';
import { useDepartmentQuery } from '../../hooks/useDepartmentQuery';

function Department() {
	const { data: Members, isSuccess } = useDepartmentQuery();

	return (
		<Layout name={'Department'}>
			<div className='member_list_wrap'>
				<div className='member_all'>
					<p className='member_all__img'>
						<img src={`${process.env.PUBLIC_URL}/img/team.jpeg`} alt='' />
					</p>
					<div className='member_all__desc'>
						<strong className='member_title'>WE</strong>
						<p>
							<span className='text_tab'>Our</span> processes might be stronger, our team of visionary talent may be
							bigger, but one thing remains the same. Our mission is to discover and create new. Whether it’s a vision
							for design that’s never been seen, a new way of telling stories that have never been told, or embracing
							the latest tech to blow the limits of what’s possible sky-high, we’re always taking the road less traveled
							to help brands break through the noise.
						</p>
					</div>
				</div>
				<ul className='member_list'>
					{isSuccess &&
						Members?.map((data, idx) => {
							return (
								<li className='member_item'>
									<div className='member_item__info'>
										<h2 className='member_item__title'>
											<span>{data.name}</span>
										</h2>
										<p className='member_item__desc'>{data.position}</p>
									</div>
									<div className='member_item__img'>
										<img src={`${process.env.PUBLIC_URL}/img/${data.pic}`} alt={data.name} />
									</div>
								</li>
							);
						})}
				</ul>
			</div>
		</Layout>
	);
}

export default Department;
