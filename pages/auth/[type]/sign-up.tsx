import type { NextPage } from 'next';
import AuthLayout from '../../../components/auth/layout';
import Button from '../../../components/button';
import Form from '../../../components/form';
import Input from '../../../components/input';
import ViewPassword from '../../../components/view-password';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { registerAsShopper } from '../../../store/actions/user.action';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { openToastAndSetContent } from '../../../store/actions/toast/toastActions';
import withoutAuth from '../../../route/without-auth';
import {
	LoadingStart,
	LoadingStop,
} from '../../../store/actions/loader/loaderActions';
import axios from 'axios';

const SignUp: NextPage = () => {
	const [type, setType] = useState('');
	const initialState = { identifier: '', password: '', confirmPassword: '' };
	const [user, setUser] = useState(initialState);
	const [status, setStatus] = useState(false);
	const [passwordStatus, setPasswordStatus] = useState(false);
	const [confirmPasswordStatus, setconfirmPasswordStatus] = useState(false);
	//dispatch
	const dispatch = useDispatch();
	const router = useRouter();

	const handleChange = (e: any) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const ultimateRegex = `^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[-+_!@#$%^&*., ?]).{8,}`;

	const registerAsShopper = (newUser: any, router: any, type: any) => {
		dispatch(LoadingStart());
		typeof window !== 'undefined'
			? localStorage.setItem('email', newUser?.email)
			: null;
		const headersRequest = {
			'auth-key': `${process.env.NEXT_PUBLIC_ENV_AUTH_KEY}`,
		};
		axios
			.post(
				`${process.env.NEXT_PUBLIC_ENV_API_AUTH_URL}/api/v1/customer/sign-up/${type}`,
				newUser,
				{ headers: headersRequest }
			)
			.then((res) => {
				router.push('/auth/verification');
				dispatch(LoadingStop());
			})
			.catch((error) => {
				dispatch(LoadingStop());
				dispatch(
					openToastAndSetContent({
						toastContent: error?.message,
						toastStyles: {
							backgroundColor: 'red',
						},
					})
				);
			});
	};

	const onSubmit = (e: any) => {
		e.preventDefault();

		if (!password.match(ultimateRegex)) {
			dispatch(
				openToastAndSetContent({
					toastContent: 'Password must meet requirements',
					toastStyles: {
						backgroundColor: 'red',
					},
				})
			);
		} else if (password !== confirmPassword) {
			dispatch(
				openToastAndSetContent({
					toastContent: 'Passwords do not match',
					toastStyles: {
						backgroundColor: 'red',
					},
				})
			);
		} else {
			const shopperUser = { identifier, password };
			const data = {
				identifier,
				type,
			};
			dispatch({
				type: 'SET_IDENTIFIER',
				payload: data,
			});
			registerAsShopper(shopperUser, router, type);
		}
	};

	const { identifier, password, confirmPassword } = user;

	useEffect(() => {
		setType('email');
	}, []);

	useEffect(() => {
		const checkPassword = new RegExp(ultimateRegex).test(password);
		if (checkPassword) {
			setPasswordStatus(true);
		} else setPasswordStatus(false);
	}, [password]);

	return (
		<div>
			<AuthLayout>
				<div className='mb-12'>
					<h1 className='text-6xl font-black'>Create an account</h1>
				</div>

				<div className='lg:w-4/12 md:w-7/12 w-full'>
					<Form className='w-full ' onSubmit={onSubmit}>
						<Input
							placeholder={`${
								type !== 'mobile' ? 'Email address*' : 'Phone number*'
							}`}
							className='mt-2 mb-4'
							type={type !== 'mobile' ? 'email' : 'text'}
							name='identifier'
							value={identifier}
							onChange={handleChange}
							required
						/>
						<div className='relative mb-2'>
							<div className='absolute top-3 right-4'>
								<ViewPassword
									onClick={() => setStatus(!status)}
									status={status}
								/>
							</div>
							<Input
								placeholder='Password*'
								className='mb-0 w-full'
								name='password'
								value={password}
								type={status ? 'text' : 'password'}
								onChange={handleChange}
								required
							/>
						</div>

						<div className={` ${password.length < 1 ? 'hidden' : ''} `}>
							{passwordStatus ? (
								<small className='text-green-600 '>
									Password matches requirements
								</small>
							) : (
								<small className='text-red-600'>
									Password must be at least 8 characters, contain at least a
									small letter,capital letter, a number and a special character.
								</small>
							)}
						</div>

						<div className='relative mb-2 mt-4'>
							<div className='absolute top-3 right-4'>
								<ViewPassword
									onClick={() =>
										setconfirmPasswordStatus(!confirmPasswordStatus)
									}
									status={confirmPasswordStatus}
								/>
							</div>
							<Input
								placeholder='Confirm password*'
								className='mb-4 w-full'
								type={confirmPasswordStatus ? 'text' : 'password'}
								name='confirmPassword'
								value={confirmPassword}
								onChange={handleChange}
								required
							/>
						</div>
						<small>
							A verification code will be sent to this{' '}
							{type !== 'mobile' ? 'email address' : 'phone number'}
						</small>
						{/* //REOMOVING FOR NOW */}

						{/* <div className="flex items-center mx-auto mt-8 underline cursor-pointer  ">
              {type !== "mobile" ? (
                <p onClick={() => setType("mobile")} className="mr-2">
                  Use phone number instead
                </p>
              ) : (
                <p onClick={() => setType("email")} className="mr-2">
                  Use email address instead
                </p>
              )}

              <img src="/icons/warning-icon.svg" />
            </div> */}

						{/* END OF REMOVEL */}

						<div className=' lg:w-3/6 w-5/6 mx-auto '>
							<Button
								className='flex justify-center py-0 mt-16 my-8 w-full mx-auto text-black border bg-apace-orange-light  border-apace-orange-light  '
								type='submit'>
								<p> Send Code </p>
							</Button>
						</div>

						<div>
							<p className='text-center'>
								By using Apace, you agree to our
								<Link href='/auth/shopper/sign-up'>
									<a className='underline text-apace-orange-dark'>
										Terms & conditions
									</a>
								</Link>
							</p>
						</div>
					</Form>
				</div>

				<p className='py-6'>Already have an account?</p>

				<div>
					<Link href='/auth/shopper/sign-in'>
						<a className='flex'>
							<img src='/icons/sign-in-arrow.svg' />
							<p className='ml-2'> Sign in </p>
						</a>
					</Link>
				</div>
			</AuthLayout>
		</div>
	);
};

export default withoutAuth(SignUp);
