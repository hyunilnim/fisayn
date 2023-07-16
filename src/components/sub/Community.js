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

	const enableUpdate = (editIndex) => {
		setPosts(
			Posts.map((post, postIndex) => {
				if (editIndex === postIndex) post.enableUpdate = true;
				return post;
			})
		);
	};

	const disableUpdate = (editIndex) => {
		setPosts(
			Posts.map((post, postIndex) => {
				if (editIndex === postIndex) post.enableUpdate = false;
				return post;
			})
		);
	};

	useEffect(() => {
		console.log(Posts);
	}, [Posts]);

	return (
		<Layout name={'Community'}>
			{/* 입력 */}
			<div className='inputBox'>
				<input type='text' placeholder='제목을 입력하세요.' ref={input} />
				<br />
				<textarea placeholder='본문을 입력하세요.' ref={textarea}></textarea>
				<br />

				<div className='btnSet'>
					<button type='button'>CANCEL</button>
					<button type='button' onClick={createPost}>
						WRITE
					</button>
				</div>
			</div>
			<div className='showBox'>
				{Posts.map((post, idx) => {
					return (
						<article key={idx}>
							{post.enableUpdate ? (
								// 수정모드
								<>
									<div className='txt'>
										<input type='text' placeholder='제목을 입력하세요.' defaultValue={post.title} />
										<br />
										<textarea placeholder='본문을 입력하세요.' defaultValue={post.content}></textarea>
									</div>
									<nav className='btnSet'>
										<button onClick={() => disableUpdate(idx)}>CANCEL</button>
										<button>UPDATE</button>
									</nav>
								</>
							) : (
								// 출력모드
								<>
									<div className='txt'>
										<h2 className='board_title'>{post.title}</h2>
										<p className='board_desc'>{post.content}</p>
									</div>
									<div className='btnSet'>
										<button type='button' onClick={() => enableUpdate(idx)}>
											EDIT
										</button>
										<button type='button' onClick={() => deletePost(idx)}>
											DELETE
										</button>
									</div>
								</>
							)}
						</article>
					);
				})}
			</div>
		</Layout>
	);
}

export default Community;
