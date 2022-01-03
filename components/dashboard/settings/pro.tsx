/* eslint-disable @next/next/no-img-element */
import { NextPage } from 'next';
import DashboardLayout from '../../../components/dashboard/layout';
import withAuth from '../../../route/with-auth';
import { useDispatch } from 'react-redux';
import SettingsLayout from '../../../components/dashboard/settings/layout';
import SettingsVerificationNavigation from '../../../components/dashboard/settings/verification-navigation';
import Button from '../../../components/button';
import TextArea from '../../../components/text-area';
import Input from '../../../components/input';
import { useEffect, useState } from 'react';
import {
	LoadingStart,
	LoadingStop,
} from '../../../store/actions/loader/loaderActions';
import { openToastAndSetContent } from '../../../store/actions/toast/toastActions';
import { fetchUserProfile } from '../../../store/actions/user.action';
import axios from 'axios';
import isEmpty from 'is-empty';
import moment from 'moment';
import { openModalAndSetContent } from '../../../store/actions/modal/modalActions';
import GuarantorRequest from '../../../components/dashboard/modal/guarantor-request';

const Pro = () => {
	const dispatch = useDispatch();

	const initialState = {
		identifier: '',
		message: '',
	};
	const [guarantorMessage, setGuarantorMessage] = useState<any>(initialState);
	const [guarantor, setGuarantor] = useState<any[]>();

	const handleChange = (e: any) => {
		setGuarantorMessage({
			...guarantorMessage,
			[e.target.name]: e.target.value,
		});
	};

	const { identifier, message } = guarantorMessage;

	const sendguarantorRequest = async () => {
		try {
			const token =
				typeof window !== 'undefined' ? localStorage.getItem('token') : null;
			const headersRequest = {
				Authorization: `Bearer ${token}`,
				'auth-key': `${process.env.NEXT_PUBLIC_ENV_AUTH_KEY}`,
			};
			dispatch(LoadingStart());
			const res = await axios.post(
				`${process.env.NEXT_PUBLIC_ENV_API_AUTH_URL}/api/v1/customer/verification/guarantor/request/send`,
				guarantorMessage,
				{ headers: headersRequest }
			);

			dispatch(
				openToastAndSetContent({
					toastContent: res?.data?.message,
					toastStyles: {
						backgroundColor: 'green',
					},
				})
			);

			console.log('warimagbo:', res);
			fetchguarantorRequest();
			dispatch(fetchUserProfile());
			setGuarantorMessage(initialState);
			dispatch(LoadingStop());
		} catch (error: any) {
			// console.log('kosh', 'damilare i amhere');
			dispatch(
				openToastAndSetContent({
					toastContent: 'Guarantor doesnt exist',
					toastStyles: {
						backgroundColor: 'red',
					},
				})
			);
			// console.log('warimagbo:', error);
			setGuarantorMessage(initialState);

			dispatch(LoadingStop());
		}
	};

	const fetchguarantorRequest = async () => {
		try {
			const token =
				typeof window !== 'undefined' ? localStorage.getItem('token') : null;
			const headersRequest = {
				Authorization: `Bearer ${token}`,
				'auth-key': `${process.env.NEXT_PUBLIC_ENV_AUTH_KEY}`,
			};
			dispatch(LoadingStart());
			const res = await axios.get(
				`${process.env.NEXT_PUBLIC_ENV_API_AUTH_URL}/api/v1/customer/verification/guarantor/requests`,
				{ headers: headersRequest }
			);
			setGuarantor(res?.data?.data);
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

	const onSubmit = (e: any) => {
		e.preventDefault();

		sendguarantorRequest();
	};

	useEffect(() => {
		fetchguarantorRequest();
	}, []);

	return (
		<div className='relative bg-apace-black text-white min-h-full py-8 overflow-hidden text-sm '>
			<div className='lg:w-8/12 w-full mr-8'>
				<div className='flex mb-6 '>
					<p className='mr-1 text-xl '> Guarantor </p>{' '}
					<img src='/icons/settings/info-outlined.svg' />
				</div>

				<>
					{isEmpty(guarantor) ? (
						<div>
							<p>
								To complete Apace Pro verification, you need to add a Guarantor
								to your account. Kindly use the form below to add one.
							</p>

							<form onSubmit={onSubmit}>
								<div className=' py-4'>
									<Input
										className='w-full mb-4'
										placeholder='Email address *'
										name='identifier'
										value={identifier}
										onChange={handleChange}
										required
									/>
									<TextArea
										placeholder='Message *'
										className=' w-full'
										name='message'
										value={message}
										onChange={handleChange}
										required
									/>
								</div>
								<div>
									<Button className='text-black bg-purple-600 border-purple-600'>
										Send request
									</Button>
								</div>
							</form>
						</div>
					) : (
						<>
							{guarantor?.map((guarantor) => {
								return (
									<div key={guarantor?.guarantor_id} className='w-1/3'>
										<div className='w-20 h-20 mr-4 my-4 rounded-full overflow-hidden'>
											<img
												src={guarantor?.customer_avatar}
												className='w-full h-full object-cover'
												alt=''
											/>
										</div>

										<h1> Name </h1>
										<p className='font-black text-base mb-5'>
											{' '}
											{guarantor?.customer_first_name}{' '}
											{guarantor?.customer_last_name}{' '}
										</p>

										<h1> Email </h1>
										<p className='font-black text-base mb-5'>
											{guarantor?.customer_email}
										</p>

										<h1> Expires </h1>
										<p className='font-black text-base mb-5'>
											{moment(guarantor?.expiry_date).format('LL')}
										</p>
									</div>
								);
							})}
							<Button
								className='text-black bg-purple-600 border-purple-600 '
								onClick={() =>
									dispatch(
										openModalAndSetContent({
											modalStyles: {
												padding: 0,
											},
											modalContent: (
												<>
													<GuarantorRequest />
												</>
											),
										})
									)
								}>
								Send request
							</Button>
						</>
					)}
				</>
			</div>
		</div>
	);
};

export default Pro;
