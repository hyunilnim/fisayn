import { useEffect, useState } from 'react';
import Layout from '../common/Layout';

function Member() {
	//value 초기화
	const initVal = {
		userName: '',
		pwd1: '',
		pwd2: '',
		email: '',
		pos: '',
		gender: '',
		method: [],
	};

	const [Val, setVal] = useState(initVal);
	const [Err, setErr] = useState({});
	const [Submit, setSubmit] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setVal({ ...Val, [name]: value });
	};

	const handleRadio = (e) => {
		const { name, value } = e.target;
		setVal({ ...Val, [name]: value });
	};

	const handleSelect = (e) => {
		const { name, value } = e.target;
		setVal({ ...Val, [name]: value });
	};

	const handleCheck = (e) => {
		const { name } = e.target;
		const inputs = e.target.parentElement.querySelectorAll('input');

		let checkArr = [];
		inputs.forEach((el) => {
			if (el.checked) checkArr.push(el.value);
		});
		setVal({ ...Val, [name]: checkArr });
	};

	// form 통으로 보내는 함수
	const handleSubmit = (e) => {
		e.preventDefault();
		// console.log(Val);
		// console.log(check(Val));
		setErr(check(Val));
		setSubmit(true);
	};

	const check = (value) => {
		const errs = {};
		const eng = /[a-zA-Z]/;
		const num = /[0-9]/;
		const spc = /[~!@#$%^&*()_+]/;

		if (value.userName.length < 2) {
			errs.userName = '이름을 2글자 이상 입력하세요.';
		}
		if (value.pwd1.length < 5 || !eng.test(value.pwd1) || !num.test(value.pwd1) || !spc.test(value.pwd1)) {
			errs.pwd1 = '비밀번호는 5글자 이상, 영문, 숫자, 특수문자를 모두 포함하세요.';
		}

		if (value.pwd1 !== value.pwd2 || !value.pwd2) {
			errs.pwd2 = '비밀번호와 동일하게 입력하세요.';
		}
		if (value.email.length < 8 || !/@/.test(value.email)) {
			errs.email = '이메일주소는 8글자 이상 @를 포함하세요.';
		}

		if (value.pos === '') {
			errs.pos = '직무를 선택하세요.';
		}
		if (value.gender === '') {
			errs.gender = '성별을 체크해주세요.';
		}
		if (value.method.length === 0) {
			errs.method = '알게된 경로를 1개 이상 체크해주세요.';
		}
		return errs;
	};

	useEffect(() => {
		const len = Object.keys(Err).length;
		if (len === 0 && Submit) {
			alert('모든 인증을 통과 했습니다.');
		}
	}, [Err]);

	return (
		<Layout name={'Member'}>
			<div className='contact_form'>
				<form onSubmit={handleSubmit}>
					<fieldset>
						<legend className='text_hidden'>회원가입 폼 입력항목</legend>
						<table>
							<tbody>
								<tr>
									<th scope='row'>
										<label htmlFor='userName'>Name</label>
									</th>
									<td>
										<input
											type='text'
											name='userName'
											id='userName'
											onChange={handleChange}
											placeholder='아이디를 입력하세요.'
											value={Val.userName}
										/>
										{Err.userName && <p>{Err.userName}</p>}
									</td>
								</tr>
								<tr>
									<th scope='row'>
										<label htmlFor='pwd1'>Password</label>
									</th>
									<td>
										<input
											type='password'
											name='pwd1'
											id='pwd1'
											onChange={handleChange}
											placeholder='비밀번호를 입력하세요.'
											value={Val.pwd1}
										/>
										{Err.pwd1 && <p>{Err.pwd1}</p>}
									</td>
								</tr>
								<tr>
									<th scope='row'>
										<label htmlFor='pwd2'>Re Password</label>
									</th>
									<td>
										<input
											type='password'
											name='pwd2'
											id='pwd2'
											onChange={handleChange}
											placeholder='비밀번호를 재 입력하세요.'
											value={Val.pwd2}
										/>
										{Err.pwd2 && <p>{Err.pwd2}</p>}
									</td>
								</tr>

								<tr>
									<th>
										<label htmlFor='email'>E-mail</label>
									</th>
									<td>
										<input
											type='email'
											name='email'
											id='email'
											placeholder='이메일 주소를 입력하세요.'
											onChange={handleChange}
											value={Val.email}
										/>
										{Err.email && <p>{Err.email}</p>}
									</td>
								</tr>

								<tr>
									<th scope='row'>
										<label htmlFor='pos'>Position</label>
									</th>
									<td>
										<select name='pos' id='pos' onChange={handleSelect}>
											<option value=''>Select your position</option>
											<option value='opt1'>Information technology manager</option>
											<option value='opt2'>Product manager</option>
											<option value='opt3'>Information technology manager</option>
											<option value='opt4'>Software engineer</option>
										</select>
										{Err.pos && <p>{Err.pos}</p>}
									</td>
								</tr>

								<tr>
									<th scope='row'>Gender</th>
									<td>
										<input type='radio' name='gender' id='male' onChange={handleRadio} />
										<label htmlFor='male'>Male</label>

										<input type='radio' name='gender' id='female' onChange={handleRadio} />
										<label htmlFor='female'>Female</label>
										<br />
										{Err.gender && <p>{Err.gender}</p>}
									</td>
								</tr>

								<tr>
									<th scope='row'>Preferred Contact Method</th>
									<td>
										<ul className='checkboxList'>
											<li>
												<input
													type='checkbox'
													name='method'
													id='method-email'
													value='method-email'
													onChange={handleCheck}
												/>
												<label htmlFor='method-email'>Email</label>
											</li>
											<li>
												<input type='checkbox' name='method' id='phone' value='phone' onChange={handleCheck} />
												<label htmlFor='phone'>Phone Call</label>
											</li>
											<li>
												<input type='checkbox' name='method' id='sms' value='sms' onChange={handleCheck} />
												<label htmlFor='sms'>Text Message (SMS)</label>
											</li>
											<li>
												<input type='checkbox' name='method' id='zoom' value='zoom' onChange={handleCheck} />
												<label htmlFor='zoom'>Zoom Meeting</label>
											</li>
											<li>
												<input type='checkbox' name='method' id='other' value='other' onChange={handleCheck} />
												<label htmlFor='other'>Other</label>
											</li>
										</ul>
										<br />
										{Err.method && <p>{Err.method}</p>}
									</td>
								</tr>

								<tr>
									<th>
										<label htmlFor="'comments">Comments</label>
									</th>
									<td>
										<textarea
											name='comments'
											id='comments'
											cols='30'
											rows='4'
											placeholder='남기는 글을 입력하세요.'
											onChange={handleChange}
										></textarea>
									</td>
								</tr>

								<tr className='form_btn'>
									<td colSpan='2'>
										<input type='reset' value='Cancel' onClick={() => setVal(initVal)} />
										<input type='submit' value='Send' />
									</td>
								</tr>
							</tbody>
						</table>
					</fieldset>
				</form>
			</div>
		</Layout>
	);
}

export default Member;
