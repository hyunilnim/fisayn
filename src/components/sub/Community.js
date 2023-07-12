import { useEffect, useRef, useState } from 'react';
import Layout from '../common/Layout';

function Community() {
	const input = useRef(null);
	const textarea = useRef(null);
	const [Posts, setPosts] = useState([]);

	const resetForm = () => {
		input.current.value = '';
		textarea.current.value = '';
	};

	const createPost = () => {
		if (!input.current.value.trim() || !textarea.current.value.trim()) {
			resetForm();
			return alert('제목과 본문을 모두 입력해주세요.');
		}
		setPosts([{ title: input.current.value, content: textarea.current.value }, ...Posts]);
		resetForm();
	};

	const deletePost = (delIndex) => {
		if (!window.confirm('게시글을 삭제하시겠습니까?')) return;
		setPosts(Posts.filter((_, idx) => idx !== delIndex));
	};

	useEffect(() => {
		console.log(Posts);
	}, [Posts]);

	return (
		<Layout name={'Community'}>
			<div className='inputBox'>
				<input type='text' placeholder='제목을 입력하세요.' ref={input} />
				<br />
				<textarea placeholder='본문을 입력하세요.' ref={textarea}></textarea>
				<br />

				<button type='button'>CANCEL</button>
				<button type='button' onClick={createPost}>
					WRITE
				</button>
			</div>
			<div className='showBox'>
				{Posts.map((post, idx) => {
					return (
						<article key={idx}>
							<h2 className='board_title'>{post.title}</h2>
							<p className='board_desc'>{post.content}</p>

							<div className='board_btn'>
								<button type='button'>EDIT</button>
								<button type='button' onClick={() => deletePost(idx)}>
									DELETE
								</button>
							</div>
						</article>
					);
				})}
			</div>
		</Layout>
	);
}

export default Community;
