/* eslint-disable @next/next/no-img-element */
import { NextPage } from 'next';
import DashboardLayout from '../../../components/dashboard/layout';
import withAuth from '../../../route/with-auth';
import { useDispatch } from 'react-redux';
import SettingsLayout from '../../../components/dashboard/settings/layout';
import { useEffect, useState } from 'react';
import {
	LoadingStart,
	LoadingStop,
} from '../../../store/actions/loader/loaderActions';
import axios from 'axios';
import isEmpty from 'is-empty';
import moment from 'moment';
import { openToastAndSetContent } from '../../../store/actions/toast/toastActions';
// import { fetchUserProfile } from '../../../store/actions/user.action';

const SettingsGuarantee: NextPage = () => {
	const dispatch = useDispatch();
	const [guarantors, setGuarantors] = useState<any[]>();
	const [requestGuarantors, setRequestGuarantors] = useState<any[]>();

	const fetchGuarantors = async () => {
		try {
			const token =
				typeof window !== 'undefined' ? localStorage.getItem('token') : null;
			const headersRequest = {
				Authorization: `Bearer ${token}`,
				'auth-key': `${process.env.NEXT_PUBLIC_ENV_AUTH_KEY}`,
			};
			dispatch(LoadingStart());
			const res = await axios.get(
				`${process.env.NEXT_PUBLIC_ENV_API_AUTH_URL}/api/v1/customer/verification/guarantors`,
				{ headers: headersRequest }
			);
			setGuarantors(res?.data?.data);
			dispatch(LoadingStop());
		} catch (error) {
			dispatch(LoadingStop());
		}
	};

	const fetchRequestGuarantors = async () => {
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
			setRequestGuarantors(res?.data?.data);

			dispatch(LoadingStop());
		} catch (error) {
			dispatch(LoadingStop());
		}
	};

	useEffect(() => {
		fetchGuarantors();
		fetchRequestGuarantors();
	}, []);

	useEffect(() => {
		console.log(requestGuarantors);
	}, [requestGuarantors]);

	const authorizedHandler = async (action: string, id: number | string) => {
		try {
			const token =
				typeof window !== 'undefined' ? localStorage.getItem('token') : null;
			const headersRequest = {
				Authorization: `Bearer ${token}`,
				'auth-key': `${process.env.NEXT_PUBLIC_ENV_AUTH_KEY}`,
			};
			dispatch(LoadingStart());
			const res = await axios.post(
				`${process.env.NEXT_PUBLIC_ENV_API_AUTH_URL}/api/v1/customer/verification/guarantor/request/${id}/${action}`,
				{},
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

			fetchGuarantors();

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
		<div>
			<DashboardLayout>
				<div className='relative bg-apace-black text-white min-h-full py-8 overflow-hidden text-sm '>
					<SettingsLayout>
						<>
							<div className='flex'>
								<p className='mr-1'> Guaranteeing </p>
								<img src='/icons/settings/info-outlined.svg' />
							</div>
							<div className='flex flex-col items-baseline flex-wrap'>
								{isEmpty(requestGuarantors) ? (
									<p className='mt-4'>
										{' '}
										You have no guarantee request on Apace yet. When you do,
										they’ll show up here.
									</p>
								) : (
									<>
										{requestGuarantors?.map((guarantor) => {
											return (
												<>
													<div key={guarantor?.guarantor_id} className='w-1/3'>
														<div className='w-20 h-20 mr-4 my-4 rounded-full overflow-hidden'>
															{guarantor?.customer_avatar ? (
																<img
																	src={guarantor?.customer_avatar}
																	className='w-full h-full object-cover'
																	alt=''
																/>
															) : (
																<img
																	alt='Profile img'
																	src='https://i.ibb.co/fH4x0Xk/360-F-346936114-Rax-E6-OQogebg-AWTal-E1myse-Y1-Hbb5q-PM.jpg'
																	className='w-full h-full object-cover'
																/>
															)}
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

													<div className='flex w-full'>
														<button
															onClick={() =>
																authorizedHandler(
																	'accept',
																	guarantor?.guarantor_id
																)
															}
															className='text-black bg-purple-600 border-purple-600 px-4 h-10 mr-4 my-4 rounded-full'>
															Accept Guarantor
														</button>
														<button
															onClick={() =>
																authorizedHandler(
																	'reject',
																	guarantor?.guarantor_id
																)
															}
															className='text-white bg-red-600 border-red-600 px-4 h-10 mr-4 my-4 rounded-full'>
															Decline Guarantor
														</button>
													</div>
												</>
											);
										})}
									</>
								)}
							</div>

							<div className='flex items-baseline flex-wrap'>
								{isEmpty(guarantors) ? (
									<p className='mt-4'>
										***You’re not guaranteeing anyone on Apace yet. When you do,
										they’ll show up here.
									</p>
								) : (
									<>
										{guarantors?.map((guarantor) => {
											return (
												<div key={guarantor?.guarantor_id} className='w-1/3'>
													<div className='w-20 h-20 mr-4 my-4 rounded-full overflow-hidden'>
														<img
															src={guarantor?.customer_avatar}
															className='w-full h-full object-cover'
														/>
													</div>

													<h1> Name </h1>
													<p className='font-black text-base mb-5'>
														{guarantor?.customer_first_name}{' '}
														{guarantor?.customer_last_name}{' '}
													</p>

													<h1> Email </h1>
													<p className='font-black text-base mb-5'>
														{guarantor?.customer_email}
													</p>

													<h1> Expires </h1>
													<p className='font-black text-base mb-5'>
														{' '}
														{moment(guarantor?.expiry_date).format('LL')}{' '}
													</p>
												</div>
											);
										})}
									</>
								)}
							</div>
						</>
					</SettingsLayout>
				</div>
			</DashboardLayout>
		</div>
	);
};

export default withAuth(SettingsGuarantee);
