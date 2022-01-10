import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Form from '../../../form';
import Input from '../../../input';
import UploadPicComponent from '../upload-pic';
import Button from '../../../button';
import {
	LoadingStart,
	LoadingStop,
} from '../../../../store/actions/loader/loaderActions';
import { openToastAndSetContent } from '../../../../store/actions/toast/toastActions';
import axios from 'axios';
import { fetchUserProfile } from '../../../../store/actions/user.action';

function BvnFormOtp() {
	const dispatch = useDispatch();

	const profile = useSelector((state: any) => state.auth);
	const personalInfo = profile?.user?.data?.peronal_info;
	const verifications = profile?.user?.data?.verifications;
	const onBoardingStep = profile?.user?.data?.on_boarding_step;

	// const bvnState = { bvn: '', otp: '' };
	const [bvnData, setBvnData] = useState('');
	const [work, setWork] = useState(false);

	const handleBvnChange = (e: any) => {
		// setBvnData({ ...bvnData, [e.target.name]: e.target.value });
		setBvnData(e.target.value);
	};

	// const { bvn, otp } = bvnData;

	// const onSubmit = (e: any) => {
	// 	e.preventDefault();
	// 	profileUpdate();
	// };

	const verifyBvnOtp = async (type: any) => {
		try {
			const token =
				typeof window !== 'undefined' ? localStorage.getItem('token') : null;
			const headersRequest = {
				Authorization: `Bearer ${token}`,
				'auth-key': `${process.env.NEXT_PUBLIC_ENV_AUTH_KEY}`,
			};
			dispatch(LoadingStart());
			const res = await axios.post(
				`${process.env.NEXT_PUBLIC_ENV_API_AUTH_URL}/api/v1/customer/verify-me/complete`,
				{
					type,
					bvnData,
				},
				{ headers: headersRequest }
			);
			dispatch(fetchUserProfile());
			dispatch(
				openToastAndSetContent({
					toastContent: res?.data?.message,
					toastStyles: {
						backgroundColor: 'green',
					},
				})
			);
			dispatch(LoadingStop());
		} catch (error: any) {
			dispatch(
				openToastAndSetContent({
					toastContent: error?.response?.data?.message,
					toastStyles: {
						backgroundColor: 'red',
					},
				})
			);
			dispatch(LoadingStop());
		}
	};

	return (
		<>
			<h1 className='text-xl mb-6  '> Update Bvn </h1>

			<Form className='w-full'>
				<div className='flex flex-col items-center justify-between w-full mb-6'>
					<div className='flex flex-col w-full'>
						<Input
							placeholder='OTP'
							className='mt-2 mb-1 w-full'
							type='text'
							name='otp'
							value={bvnData}
							onChange={handleBvnChange}
						/>
						<button
							onClick={() => verifyBvnOtp('BVN')}
							className='text-black bg-purple-600 border-purple-600 w-1/3 h-10 mr-4 my-4 rounded-full'>
							Verify BVN OTP
						</button>
					</div>
				</div>
			</Form>
		</>
	);
}

export default BvnFormOtp;
