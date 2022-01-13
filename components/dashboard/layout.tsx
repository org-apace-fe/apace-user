import ApaceHead from '../head';
import { BigAIcon } from '../icons/logo';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useLayoutEffect, useState } from 'react';
import DashboardHeader from './header';
import Loader from '../loader';
import Toast from '../toast';
import Modall from './modal';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '../../store/actions/user.action';
import {
	closeModal,
	openModalAndSetContent,
} from '../../store/actions/modal/modalActions';
import UpdateProfileModal from './modal/update-profile';
import AddCard from './modal/add-card';

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

	useEffect(() => {
		dispatch(fetchUserProfile());
	}, []);

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
				haveCloseIcon: false,
			})
		);
	} else if (
		onBoardingStep?.step_code === 'add-card' &&
		onBoardingStep?.is_required &&
		router.pathname !== '/dashboard/cards'
	) {
		dispatch(
			openModalAndSetContent({
				modalStyles: {
					padding: 0,
				},
				modalContent: (
					<>
						<AddCard />
					</>
				),
				haveCloseIcon: false,
			})
		);
	} else {
		dispatch(closeModal());
	}

	return (
		<>
			<div
				className='relative w-full mx-auto '
				style={{ maxWidth: '1440px', zIndex: 100 }}>
				<ApaceHead />
				<DashboardHeader />
				<Loader />
				<Toast />
				<Modall />
				<main className='w-full  mx-auto min-h-screen '>{children}</main>
			</div>
		</>
	);
}

export default DashbardLayout;
