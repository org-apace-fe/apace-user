import type { NextPage } from 'next';
import Container from '../../components/container';
import DashboardLayout from '../../components/dashboard/layout';
import ApaceStoreTabs from '../../components/store-tabs';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '../../store/actions/user.action';
import { useEffect, useState } from 'react';
import withAuth from '../../route/with-auth';
import { openModalAndSetContent } from '../../store/actions/modal/modalActions';
import AskRefund from '../../components/dashboard/modal/ask-a-refund';
import UpdateProfileModal from '../../components/dashboard/modal/update-profile';
import {
	LoadingStart,
	LoadingStop,
} from '../../store/actions/loader/loaderActions';
import axios from 'axios';
import isEmpty from 'is-empty';
import { background } from '../../utils/background';
import Button from '../../components/button';
import { openToastAndSetContent } from '../../store/actions/toast/toastActions';

const Home: NextPage = () => {
	const dispatch = useDispatch();

	const token =
		typeof window !== 'undefined' ? localStorage.getItem('token') : null;
	const headersRequest = {
		Authorization: `Bearer ${token}`,
		'auth-key': `${process.env.NEXT_PUBLIC_ENV_AUTH_KEY}`,
	};

	const profile = useSelector((state: any) => state.auth);
	const personalInfo = profile?.user?.data?.peronal_info;
	const [cards, setCards] = useState<any[]>();

	const fetchCards = async () => {
		try {
			const res = await axios.get(
				`${process.env.NEXT_PUBLIC_ENV_API_AUTH_URL}/api/v1/customer/saved-card/all`,
				{ headers: headersRequest }
			);
			setCards(res?.data?.data);
		} catch (error) {
			dispatch(LoadingStop());
		}
	};

	return (
		<div>
			<DashboardLayout>
				<div className='relative bg-apace-black text-white min-h-full py-8 overflow-hidden '>
					<Container>
						<ApaceStoreTabs personalInfo={personalInfo} />
					</Container>
				</div>
			</DashboardLayout>
		</div>
	);
};

export default Home;
