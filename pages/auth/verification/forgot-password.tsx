import type { NextPage } from 'next';
import AuthLayout from '../../../components/auth/layout';
import Button from '../../../components/button';
import Form from '../../../components/form';
import Input from '../../../components/input';
import ViewPassword from '../../../components/view-password';
import Link from 'next/link';
import { resendOTP, verifyAsShopper } from '../../../store/actions/user.action';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import withoutAuth from '../../../route/without-auth';
import {
	LoadingStart,
	LoadingStop,
} from '../../../store/actions/loader/loaderActions';
import axios from 'axios';
import { openToastAndSetContent } from '../../../store/actions/toast/toastActions';

const Verification: NextPage = () => {
	const apaceIdentifier = useSelector((state: any) => state.auth.identifier);
	const [identifier, setIdentifier] = useState('');

	//dispatch
	const dispatch = useDispatch();
	const router = useRouter();

	const handleChange = (e: any) => {
		setIdentifier(e.target.value);
	};

	const forgotPassword = async (e: any) => {
		e.preventDefault();
		try {
			dispatch(LoadingStart());
			const res = await axios.post('/api/v1/customer/forgot-password', {
				identifier,
			});

			dispatch(LoadingStop());
			dispatch({
				type: 'SET_IDENTIFIER',
				payload: { identifier },
			});
			dispatch(
				openToastAndSetContent({
					toastContent: res?.data?.message,
					toastStyles: {
						backgroundColor: 'green',
					},
				})
			);
			router.push('/auth/verification/verify-otp-password');
		} catch (error: any) {
			dispatch(LoadingStop());
			dispatch(
				openToastAndSetContent({
					toastContent: error?.response?.data?.message,
					toastStyles: {
						backgroundColor: 'red',
					},
				})
			);
		}
	};

	return (
		<div>
			<AuthLayout>
				<div className='mb-12'>
					<h1 className='text-6xl font-black'>Verification</h1>
				</div>
				<div className='lg:w-4/12 md:w-7/12 w-full'>
					<Form className='w-full ' onSubmit={forgotPassword}>
						<Input
							placeholder='Enter Your Email*'
							className='mt-2 mb-4'
							type='text'
							name='identifier'
							onChange={handleChange}
							value={identifier}
							required
						/>
						<div className=' lg:w-3/6 w-5/6 mx-auto '>
							<Button
								className='flex justify-center py-0 mt-32 my-8 w-full mx-auto text-black border bg-apace-orange-light  border-apace-orange-light  '
								type='submit'>
								<img src='/icons/account.svg' className='mr-2' alt='' />
								<p>submit</p>
							</Button>
						</div>
					</Form>
				</div>

				<Link href='/auth/shopper/sign-up'>
					<a className='py-6 underline'>Re-enter details</a>
				</Link>
			</AuthLayout>
		</div>
	);
};

export default withoutAuth(Verification);
