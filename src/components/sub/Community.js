import { useEffect, useRef, useState } from 'react';
import Layout from '../common/Layout';

function Community() {
	const getLocalData = () => {
		const data = localStorage.getItem('post');
		return JSON.parse(data);
	};

	const input = useRef(null);
	const textarea = useRef(null);
	const editInput = useRef(null);
	const editTextarea = useRef(null);
	const [Posts, setPosts] = useState(getLocalData());
	const [Allowed, setAllowed] = useState(true);

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
		if (!Allowed) return;
		setAllowed(false);
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
		setAllowed(true);
	};

	const updatePost = (editIndex) => {
		if (!editInput.current.value.trim() || !editTextarea.current.value.trim()) {
			return alert('수정할 제목과 본문을 모두 입력해주세요.');
		}
		setPosts(
			Posts.map((post, postIndex) => {
				if (postIndex === editIndex) {
					post.title = editInput.current.value;
					post.content = editTextarea.current.value;
					post.enableUpdate = false;
				}
				return post;
			})
		);
		setAllowed(true);
	};

	useEffect(() => {
		// console.log(Posts);
		localStorage.setItem('post', JSON.stringify(Posts));
	}, [Posts]);

	return (
		<Layout name={'Community'}>
			{/* 입력 */}
			<div className='communityInput'>
				<div className='inputBox'>
					<input type='text' placeholder='제목을 입력하세요.' ref={input} />
					<br />
					<textarea placeholder='본문을 입력하세요.' ref={textarea}></textarea>
					<br />
					<div className='btnSet'>
						<button type='button' onClick={resetForm}>
							CANCEL
						</button>
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
											<input type='text' placeholder='제목을 입력하세요.' defaultValue={post.title} ref={editInput} />
											<br />
											<textarea
												placeholder='본문을 입력하세요.'
												defaultValue={post.content}
												ref={editTextarea}
											></textarea>
										</div>
										<nav className='btnSet'>
											<button type='button' onClick={() => disableUpdate(idx)}>
												CANCEL
											</button>
											<button type='button' onClick={() => updatePost(idx)}>
												UPDATE
											</button>
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
			</div>
		</Layout>
	);
}

export default Community;
