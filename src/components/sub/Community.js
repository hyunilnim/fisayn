import { useEffect, useRef, useState } from 'react';
import Layout from '../common/Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEraser, faTrashCan } from '@fortawesome/free-solid-svg-icons';

function Community() {
	const getLocalData = () => {
		const data = localStorage.getItem('post');
		return JSON.parse(data);
	};

	const input = useRef(null);
	const name = useRef(null);
	const date = useRef(null);
	const textarea = useRef(null);
	const editInput = useRef(null);
	const editTextarea = useRef(null);
	const editName = useRef(null);
	const editDate = useRef(null);
	const [Posts, setPosts] = useState(getLocalData());
	const [Allowed, setAllowed] = useState(true);

	const resetForm = () => {
		input.current.value = '';
		textarea.current.value = '';
		name.current.value = '';
		date.current.value = '';
	};

	const createPost = () => {
		if (
			!name.current.value.trim() ||
			!date.current.value.trim() ||
			!input.current.value.trim() ||
			!textarea.current.value.trim()
		) {
			resetForm();
			return alert('제목과 본문을 모두 입력해주세요.');
		}
		setPosts([
			{
				title: input.current.value,
				content: textarea.current.value,
				name: name.current.value,
				date: date.current.value,
			},
			...Posts,
		]);
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
		if (
			!editInput.current.value.trim() ||
			!editTextarea.current.value.trim() ||
			!editName.current.value.trim() ||
			!editDate.current.value.trim()
		) {
			return alert('수정할 제목과 본문을 모두 입력해주세요.');
		}
		setPosts(
			Posts.map((post, postIndex) => {
				if (postIndex === editIndex) {
					post.title = editInput.current.value;
					post.content = editTextarea.current.value;
					post.name = editName.current.value;
					post.date = editDate.current.value;
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
					<div className='inputBox_form'>
						<input type='text' placeholder='이름을 입력하세요.' ref={name} />
						<input type='text' placeholder='날짜를 입력하세요.' ref={date} />
						<input type='text' placeholder='제목을 입력하세요.' ref={input} />
						<br />
						<textarea placeholder='본문을 입력하세요.' ref={textarea}></textarea>
					</div>
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
										<div className='postEdit'>
											<div className='info'>
												<input type='text' placeholder='이름을 입력하세요.' defaultValue={post.name} ref={editName} />
												<input type='text' placeholder='날짜를 입력하세요.' defaultValue={post.date} ref={editDate} />
											</div>
											<div className='txt'>
												<input type='text' placeholder='제목을 입력하세요.' defaultValue={post.title} ref={editInput} />
												<br />
												<textarea
													placeholder='본문을 입력하세요.'
													defaultValue={post.content}
													ref={editTextarea}
												></textarea>
											</div>
											<div className='btnSet'>
												<button type='button' onClick={() => disableUpdate(idx)}>
													<span>CANCEL</span>
												</button>
												<button type='button' onClick={() => updatePost(idx)}>
													<span>UPDATE</span>
												</button>
											</div>
										</div>
									</>
								) : (
									// 출력모드
									<>
										<div className='postResult'>
											<div className='info'>
												<p className='board_name'>By {post.name}</p>
												<p className='board_date'>{post.date}</p>
											</div>
											<div className='txt'>
												<h2 className='board_title'>{post.title}</h2>
												<p className='board_desc'>{post.content}</p>
											</div>
											<div className='btnSet'>
												<button type='button' onClick={() => enableUpdate(idx)}>
													{/* <FontAwesomeIcon icon={faEraser} /> */}
													<span className=''>EDIT</span>
												</button>
												<button type='button' onClick={() => deletePost(idx)}>
													{/* <FontAwesomeIcon icon={faTrashCan} /> */}
													<span className=''>DELETE</span>
												</button>
											</div>
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
