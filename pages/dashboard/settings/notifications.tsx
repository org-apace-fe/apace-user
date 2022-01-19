import { NextPage } from 'next';
import DashboardLayout from '../../../components/dashboard/layout';
import withAuth from '../../../route/with-auth';
import { useDispatch, useSelector } from 'react-redux';
import SettingsLayout from '../../../components/dashboard/settings/layout';
import { useEffect, useState } from 'react';
import MyToggle from '../../../components/dashboard/settings/toggle';
import {
	LoadingStart,
	LoadingStop,
} from '../../../store/actions/loader/loaderActions';
import axios from 'axios';
import { openToastAndSetContent } from '../../../store/actions/toast/toastActions';
import { fetchUserProfile } from '../../../store/actions/user.action';

const SettingsNotification: NextPage = () => {
	const dispatch = useDispatch();
	const profile = useSelector((state: any) => state.auth);
	const preference: any[] = profile?.user?.data?.preferences;

	const [preferenceOptions, setPreferenceOptions] = useState<any[]>();
	const [enabled, setEnabled] = useState<any>({});

	const convertToBoolean = (value: string) => {
		if (value === 'false') {
			return false;
		} else {
			return true;
		}
	};

	// useEffect(() => {
	// 	const aStateObj: any = {};
	// 	preferenceOptions?.map((each) => (aStateObj[each.code] = false));
	// 	setEnabled(aStateObj);
	// }, [preferenceOptions]);

	// useEffect(() => {
	// 	console.log('iamgood:', enabled);
	// 	console.log('mypreference:', preference);
	// }, [enabled, preference]);

	useEffect(() => {
		const aCheckObj: any = {};

		preference?.map(
			(each) => (aCheckObj[each.preference_name] = convertToBoolean(each.value))
		);

		console.log('mymeprefer:', aCheckObj);

		setEnabled(aCheckObj);
	}, [preference]);

	const fetchPreferenceAvailableOptions = async () => {
		try {
			const token =
				typeof window !== 'undefined' ? localStorage.getItem('token') : null;
			const headersRequest = {
				Authorization: `Bearer ${token}`,
				'auth-key': `${process.env.NEXT_PUBLIC_ENV_AUTH_KEY}`,
			};
			dispatch(LoadingStart());
			const res = await axios.get(
				`${process.env.NEXT_PUBLIC_ENV_API_AUTH_URL}/api/v1/customer/profile/preference/available-options`,
				{ headers: headersRequest }
			);
			setPreferenceOptions(res?.data?.data);
			dispatch(LoadingStop());
		} catch (error) {
			dispatch(LoadingStop());
		}
	};

	const setPreference = async (code: string) => {
		console.log('checking', !enabled[code]);
		// setEnabled({ ...enabled, [code]: !enabled[code] });
		try {
			setEnabled({ ...enabled, [code]: !enabled[code] });
			const token =
				typeof window !== 'undefined' ? localStorage.getItem('token') : null;
			const headersRequest = {
				Authorization: `Bearer ${token}`,
				'auth-key': `${process.env.NEXT_PUBLIC_ENV_AUTH_KEY}`,
			};
			dispatch(LoadingStart());
			const res = await axios.patch(
				`${process.env.NEXT_PUBLIC_ENV_API_AUTH_URL}/api/v1/customer/profile/preference/${code}/set`,
				{ value: String(!enabled[code]) },
				{ headers: headersRequest }
			);

			dispatch(
				openToastAndSetContent({
					toastContent: 'Updated',
					toastStyles: {
						backgroundColor: 'green',
					},
				})
			);
			dispatch(LoadingStop());
		} catch (error: any) {
			dispatch(
				openToastAndSetContent({
					toastContent:
						error?.response?.data?.Message || error?.response?.data?.message,
					toastStyles: {
						backgroundColor: 'red',
					},
				})
			);
			dispatch(LoadingStop());
			setEnabled({ ...enabled, [code]: false });
		}

		dispatch(fetchUserProfile());
	};

	useEffect(() => {
		fetchPreferenceAvailableOptions();
	}, []);

	// const NotifiedWhen: any[] = [
	// 	{
	// 		id: 1,
	// 		title: 'I make a purchase ',
	// 		name: 'nt-',
	// 		is_active: true,
	// 	},
	// 	{
	// 		id: 2,
	// 		title: 'A payment is due',
	// 		name: preferenceOptions && preferenceOptions[1],
	// 		is_active: true,
	// 	},
	// 	{
	// 		id: 3,
	// 		title: 'My card/bank is debited against a pending balance',
	// 		name: preferenceOptions && preferenceOptions[2],
	// 		is_active: true,
	// 	},
	// 	{
	// 		id: 4,
	// 		title: 'Action need to be taken on my account',
	// 		name: null,
	// 		is_active: true,
	// 	},
	// ];

	// const PushNotification = [
	// 	{
	// 		id: 1,
	// 		title: 'There’s a new deal from our merchant partners',
	// 		name: preferenceOptions && preferenceOptions[3],
	// 	},
	// 	{
	// 		id: 2,
	// 		title: 'A special offer from us that we think you might like',
	// 		name: preferenceOptions && preferenceOptions[4],
	// 	},
	// 	{
	// 		id: 3,
	// 		title: 'It’s your birthday and we must send you happy cheers',
	// 		name: preferenceOptions && preferenceOptions[5],
	// 	},
	// ];

	return (
		<div>
			<DashboardLayout>
				<div className='relative bg-apace-black text-white min-h-full py-8 overflow-hidden text-sm '>
					<SettingsLayout>
						<div className='border-b border-gray-700 pb-6'>
							<p className='text-xl'> Notifications </p>
							<p className='mt-3'>
								Checkbox toggles of Notifications as desired. Transactional
								Notifications are “forced on” and can’t be turned off by
								Shopper.{' '}
							</p>
						</div>

						<div className='border-b border-gray-700 pb-6 mt-6 font-black  '>
							<p className='text-sm  '>I want to be notified when </p>
							{preferenceOptions &&
								preferenceOptions.map((nf) => {
									return nf.section_number === 2 ? (
										''
									) : (
										<div className='flex items-center mt-4 mb-2' key={nf?.id}>
											<MyToggle
												name={nf?.code}
												enabled={enabled[nf?.code]}
												onChange={() => {
													setPreference(nf?.code);
												}}
											/>
											<p className='ml-3'> {nf?.description} </p>{' '}
										</div>
									);
								})}
						</div>

						<div className='border-b border-gray-700 pb-6 mt-6 font-black  '>
							<p className='text-sm  '>
								Send me an email and push notification when{' '}
							</p>
							{preferenceOptions &&
								preferenceOptions.map((nf) => {
									return nf.section_number === 1 ? (
										''
									) : (
										<div className='flex items-center mt-4 mb-2' key={nf?.id}>
											<MyToggle
												name={nf?.code}
												enabled={enabled[nf?.code]}
												onChange={() => {
													setPreference(nf?.code);
												}}
											/>
											<p className='ml-3'> {nf?.description} </p>{' '}
										</div>
									);
								})}
						</div>
					</SettingsLayout>
				</div>
			</DashboardLayout>
		</div>
	);
};

export default withAuth(SettingsNotification);
