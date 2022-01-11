import React, { useState } from 'react';
import { NextPage } from 'next';
import MonoConnect from '@mono.co/connect.js';
import DashboardLayout from '../../../components/dashboard/layout';
import withAuth from '../../../route/with-auth';
import { useDispatch } from 'react-redux';
import SettingsLayout from '../../../components/dashboard/settings/layout';
import SettingsVerificationNavigation from '../../../components/dashboard/settings/verification-navigation';
import Button from '../../../components/button';
import axios from 'axios';
import { openToastAndSetContent } from '../../../store/actions/toast/toastActions';
import {
	LoadingStart,
	LoadingStop,
} from '../../../store/actions/loader/loaderActions';

const Plus = () => {
	const dispatch = useDispatch();

	const monoConnect = React.useMemo(() => {
		const monoInstance = new MonoConnect({
			onClose: () => console.log('Widget closed'),
			onLoad: () => console.log('Widget loaded successfully'),
			onSuccess: ({ token }: { token: any }) => {
				axios
					.post('/api/v1/customer/verification/bank-statement/add', {
						access_token: token,
					})
					.then((res) => {
						dispatch(
							openToastAndSetContent({
								toastContent: res?.data?.message,
								toastStyles: {
									backgroundColor: 'green',
								},
							})
						);
					})
					.catch((error) => {
						dispatch(
							openToastAndSetContent({
								toastContent: error?.response?.data?.message,
								toastStyles: {
									backgroundColor: 'red',
								},
							})
						);
						dispatch(LoadingStop());
					});
			},
			key: process.env.NEXT_PUBLIC_MONO_PUBLIC_KEY,
		});

		monoInstance.setup();

		return monoInstance;
	}, []);

	const [checked, setChecked] = useState(false);

	return (
		<div>
			<div className='relative bg-apace-black text-white min-h-full py-8 overflow-hidden text-sm '>
				<div className=' lg:w-8/12 w-full mr-8'>
					<h1 className='text-xl mb-6  '> Bank Statement </h1>
					<p>
						To complete Apace Plus verification, we need to access and validate
						your bank statement. We use a reliable and secure third-party
						service to do this. Do you grant us permission to proceed?
					</p>

					<label className='flex items-center my-4'>
						<input
							type='checkbox'
							className='form-checkbox bg-black mr-2 '
							onChange={() => setChecked(!checked)}
						/>
						<span className='ml-2 mr-6'> I grant permission </span>
					</label>
					<Button
						disabled={!checked}
						className='text-black bg-purple-600 border-purple-600 '
						onClick={() => monoConnect.open()}>
						Proceed
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Plus;
