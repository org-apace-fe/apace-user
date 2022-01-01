import ApaceHead from '../head';
import { BigAIcon } from '../icons/logo';
import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';
import DashboardHeader from './header';
import Loader from '../loader';
import Toast from '../toast';
import Modal from './modal';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '../../store/actions/user.action';
import { openModalAndSetContent } from '../../store/actions/modal/modalActions';
import UpdateProfileModal from './modal/update-profile';
import { background } from '../../utils/background';
import Button from '../button';
import {
	LoadingStart,
	LoadingStop,
} from '../../store/actions/loader/loaderActions';
import axios from 'axios';
import { openToastAndSetContent } from '../../store/actions/toast/toastActions';

type MyComponentProps = {
	children: ReactNode;
};

function DashbardLayout({ children }: MyComponentProps) {
	const router = useRouter();
	const dispatch = useDispatch();
	const token =
		typeof window !== 'undefined' ? localStorage.getItem('token') : null;
	const headersRequest = {
		Authorization: `Bearer ${token}`,
		'auth-key': `${process.env.NEXT_PUBLIC_ENV_AUTH_KEY}`,
	};

	const profile = useSelector((state: any) => state.auth);
	const onBoardingStep = profile?.user?.data?.on_boarding_step;

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

	useEffect(() => {
		dispatch(fetchUserProfile());

		if (
			onBoardingStep?.step_code === 'update-profile' &&
			onBoardingStep?.is_required
		) {
			dispatch(
				openModalAndSetContent({
					modalStyles: {
						padding: 0,
					},
					modalContent: (
						<>
							<UpdateProfileModal />
						</>
					),
				})
			);
		} else if (
			onBoardingStep?.step_code === 'add-card' &&
			onBoardingStep?.is_required
		) {
			dispatch(
				openModalAndSetContent({
					modalStyles: {
						padding: 0,
					},
					modalContent: (
						<>
							<div>
								<div
									className='flex flex-col justify-center h-56 rounded-lg items-center px-4 '
									style={{ background: background.apacegray3 }}>
									<p>
										You currently have no cards, Kindly add your card before
										advancing{' '}
									</p>
									<Button
										onClick={addCard}
										className=' bg-apace-orange-dark border-apace-orange-dark text-black'>
										Add Card +{' '}
									</Button>
								</div>
							</div>
						</>
					),
				})
			);
		} else {
			return undefined;
		}
	}, []);

	return (
		<>
			<div
				className='relative w-full mx-auto '
				style={{ maxWidth: '1440px', zIndex: 100 }}>
				<ApaceHead />
				<DashboardHeader />
				<Loader />
				<Toast />
				<Modal />
				<main className='w-full  mx-auto min-h-screen '>{children}</main>
			</div>
		</>
	);
}

export default DashbardLayout;
