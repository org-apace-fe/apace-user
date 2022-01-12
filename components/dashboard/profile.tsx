import { background } from '../../utils/background';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import {
	closeModal,
	openModalAndSetContent,
} from '../../store/actions/modal/modalActions';
import {
	LoadingStart,
	LoadingStop,
} from '../../store/actions/loader/loaderActions';
import { openToastAndSetContent } from '../../store/actions/toast/toastActions';
import axios from 'axios';

import Button from '../button';
import Link from 'next/link';
import { fetchUserProfile, logoutUser } from '../../store/actions/user.action';
import router from 'next/router';
import Avatar from 'react-avatar';
import { numberWithCommas } from '../../utils/formatNumber';
import { useEffect } from 'react';
import React from 'react';

const Profile = () => {
	const profile = useSelector((state: any) => state.auth);

	const personalInfo = profile?.user?.data?.peronal_info;
	const loanLimit = profile?.user?.data?.loan_limit;
	const onBoardingStep = profile?.user?.data?.on_boarding_step;

	const customerTiers = profile?.user?.data?.customer_tiers;

	const activeTiers = customerTiers?.find((tier: any) => {
		return tier.is_active === true;
	});

	const dispatch = useDispatch();
	const router = useRouter();
	const token =
		typeof window !== 'undefined' ? localStorage.getItem('token') : null;
	const headersRequest = {
		Authorization: `Bearer ${token}`,
		'auth-key': `${process.env.NEXT_PUBLIC_ENV_AUTH_KEY}`,
	};

	// useEffect(() => {
	// 	dispatch(fetchUserProfile());
	// }, []);
	const addCard = async () => {
		try {
			dispatch(LoadingStart());
			const res = await axios.patch(
				`${process.env.NEXT_PUBLIC_ENV_API_AUTH_URL}/api/v1/customer/saved-card/add`,
				{},
				{ headers: headersRequest }
			);
			const cardData = res?.data?.data;

			if (cardData) {
				window.open(cardData?.payment_link, '_self');
			}
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

	const increaseLimit = () => {
		if (onBoardingStep?.step_code === 'verify-bvn') {
			dispatch(
				openModalAndSetContent({
					modalStyles: {
						padding: 0,
					},
					modalContent: (
						<>
							<div
								className='flex flex-col justify-center h-56 rounded-lg items-center px-4 '
								style={{ background: background.apacegray3 }}>
								<p>Please verify your bvn to increase your credit limit</p>
								<Button
									onClick={() =>
										router.push('/dashboard/settings/verification')
									}
									className=' bg-apace-orange-dark border-apace-orange-dark text-black'>
									Verify your bvn
								</Button>
							</div>
						</>
					),
				})
			);
		} else if (onBoardingStep?.step_code === 'add-account-statement') {
			dispatch(
				openModalAndSetContent({
					modalStyles: {
						padding: 0,
					},
					modalContent: (
						<>
							<div
								className='flex flex-col justify-center h-56 rounded-lg items-center px-4 '
								style={{ background: background.apacegray3 }}>
								<p>
									Please add your account statement to increase your credit
									limit
								</p>
								<Button
									onClick={() =>
										router.push('/dashboard/settings/verification')
									}
									className=' bg-apace-orange-dark border-apace-orange-dark text-black'>
									Add Account Statement
								</Button>
							</div>
						</>
					),
				})
			);
		} else if (onBoardingStep?.step_code === 'add-guarantor') {
			dispatch(
				openModalAndSetContent({
					modalStyles: {
						padding: 0,
					},
					modalContent: (
						<>
							<div
								className='flex flex-col justify-center h-56 rounded-lg items-center px-4 '
								style={{ background: background.apacegray3 }}>
								<p>Add a guarantor to increase your credit limit</p>
								<Button
									onClick={() =>
										router.push('/dashboard/settings/verification')
									}
									className=' bg-apace-orange-dark border-apace-orange-dark text-black'>
									Add guarantor
								</Button>
							</div>
						</>
					),
				})
			);
		} else {
			return undefined;
			// console.log('undefined you');
		}
	};

	return (
		<div
			className=' rounded-lg overflow-hidden'
			style={{ background: background.apacegray3 }}>
			<div className='flex p-4'>
				{!personalInfo?.avatar ? (
					<Avatar
						className='sb-avatar rounded-full mr-4'
						size='3.5rem'
						color='#ED6E24'
						name={`${personalInfo?.first_name} ${personalInfo?.last_name} `}
					/>
				) : (
					<div className='w-14 h-14 mr-4 rounded-full overflow-hidden'>
						<img
							src={personalInfo?.avatar}
							className='w-full h-full object-cover'
						/>
					</div>
				)}

				<div className='text-sm'>
					<p className='font-black'>
						{' '}
						{personalInfo?.first_name} {personalInfo?.last_name}{' '}
					</p>
					<p> {personalInfo?.mobile_number} </p>
					<p> {personalInfo?.email_address} </p>
				</div>
			</div>

			<div className='flex items-center border-b border-gray-400 p-4'>
				<div className='w-6 h-6 mr-4 '>
					<img src='/icons/verified.svg' className='w-full' />
				</div>
				<div className='text-sm'>
					<p className='font-black'>
						{' '}
						{activeTiers?.tier_name} : &#8358;{' '}
						{numberWithCommas(loanLimit?.limit)}{' '}
					</p>
					<p
						onClick={() => increaseLimit()}
						className='text-apace-orange-light cursor-pointer'>
						Increase limit
					</p>
				</div>
			</div>

			<div className='p-4 cursor-pointer'>
				<Link href='/dashboard/settings/verification'>
					<a className='flex my-2 '>
						<img src='/icons/settings.svg' /> <p className='ml-4'>Settings</p>
					</a>
				</Link>
				<Link href='/dashboard/faq'>
					<a className='flex my-2 '>
						<img src='/icons/faq.svg' /> <p className='ml-4'>FAQs</p>
					</a>
				</Link>
				<Link href='/dashboard/legal'>
					<a className='flex my-2 '>
						<img src='/icons/legal.svg' /> <p className='ml-4'>Legal</p>
					</a>
				</Link>
				<div
					className='flex my-2 '
					onClick={() => dispatch(logoutUser(router))}>
					<img src='/icons/logout.svg' /> <p className='ml-4'>Sign out</p>
				</div>
			</div>
		</div>
	);
};

export default Profile;
