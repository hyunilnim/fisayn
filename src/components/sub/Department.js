import { useSelector } from 'react-redux';
import Layout from '../common/Layout';

function Department() {
	const Members = useSelector((store) => store.department.data);

	return (
		<Layout name={'Department'}>
			<ul className='member_list'>
				{Members.map((data, idx) => {
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
		</Layout>
	);
}

export default Department;
