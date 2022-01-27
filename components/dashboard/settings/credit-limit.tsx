import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	LoadingStart,
	LoadingStop,
} from '../../../store/actions/loader/loaderActions';
import {
	closeModal,
	openModalAndSetContent,
} from '../../../store/actions/modal/modalActions';
import { openToastAndSetContent } from '../../../store/actions/toast/toastActions';
import { background } from '../../../utils/background';
import { numberWithCommas } from '../../../utils/formatNumber';
import Button from '../../button';
import Link from 'next/link';
import router from 'next/router';

const CreditLimitComponent = () => {
	const dispatch = useDispatch();
	const profile = useSelector((state: any) => state.auth);
	const onBoardingStep = profile?.user?.data?.on_boarding_step;

	const customerTiers = profile?.user?.data?.customer_tiers;

	const activeTiers = customerTiers?.find((tier: any) => {
		return tier.is_active === true;
	});

	const [miscellaneousStatistics, setMiscellaneousStatistics] = useState<any>();

	const fetchMiscellaneousStatistics = async () => {
		try {
			const token =
				typeof window !== 'undefined' ? localStorage.getItem('token') : null;
			const headersRequest = {
				Authorization: `Bearer ${token}`,
				'auth-key': `${process.env.NEXT_PUBLIC_ENV_AUTH_KEY}`,
			};
			dispatch(LoadingStart());
			const res = await axios.get(
				`${process.env.NEXT_PUBLIC_ENV_API_AUTH_URL}/api/v1/customer/miscellaneous/statistics/general`,
				{ headers: headersRequest }
			);
			setMiscellaneousStatistics(res?.data?.data);
			dispatch(LoadingStop());
		} catch (error) {
			dispatch(LoadingStop());
		}
	};

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
		// console.log('i am here:', onBoardingStep);
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
									onClick={() => {
										router.push('/dashboard/settings/verification');
										dispatch(closeModal());
									}}
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
									onClick={() => {
										router.push('/dashboard/settings/verification');

										dispatch(closeModal());
									}}
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
									onClick={() => {
										router.push('/dashboard/settings/verification');

										dispatch(closeModal());
									}}
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

	useEffect(() => {
		fetchMiscellaneousStatistics();
	}, []);
	return (
		<div>
			<div className='flex items-center '>
				<div className='w-8 h-8'>
					<img
						className='w-full h-full'
						src='/icons/settings/credit-limit.svg'
					/>
				</div>
				<div className='ml-2'>
					<p className='text-base'>Credit limit</p>
					<p className='text-base text-green-600 '>
						&#8358;
						{numberWithCommas(miscellaneousStatistics?.current_credit_limit)}
					</p>
				</div>
			</div>

			<p className='text-xs my-4 '>
				Apace {activeTiers?.tier_name} allows a credit limit of{' '}
				{activeTiers?.default_limit_amount}.
			</p>

			<p
				onClick={() => increaseLimit()}
				className='text-apace-orange-light text-xs underline my-2 cursor-pointer'>
				Increase limit
			</p>
		</div>
	);
};

export default CreditLimitComponent;
