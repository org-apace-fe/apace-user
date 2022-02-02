import { NextPage } from 'next';
import DashboardLayout from '../../../components/dashboard/layout';
import withAuth from '../../../route/with-auth';
import { useDispatch, useSelector } from 'react-redux';
import SettingsLayout from '../../../components/dashboard/settings/layout';
import UploadPicComponent from '../../../components/dashboard/settings/upload-pic';
import Form from '../../../components/form';
import Input from '../../../components/input';
import Button from '../../../components/button';
import { useEffect, useState } from 'react';
import {
	LoadingStart,
	LoadingStop,
} from '../../../store/actions/loader/loaderActions';
import { openToastAndSetContent } from '../../../store/actions/toast/toastActions';
import axios from 'axios';
import { fetchUserProfile } from '../../../store/actions/user.action';

const SettingsProfile: NextPage = () => {
	const dispatch = useDispatch();

	const profile = useSelector((state: any) => state.auth);
	const personalInfo = profile?.user?.data?.peronal_info;
	const verifications = profile?.user?.data?.verifications;

	const initialState = {
		firstname: '',
		lastname: '',
		address: '',
		dob: '',
		mobile: '',
	};
	const [user, setUser] = useState<any>(initialState);

	const handleChange = (e: any) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const { firstname, lastname, address, dob, mobile } = user;

	const profileUpdate = async () => {
		let fields: any[] = [];
		Object.keys(user).forEach((key: string) => {
			if (user[key]) {
				fields.push({
					key: key,
					value: user[key],
				});
			}
		});
		try {
			const token =
				typeof window !== 'undefined' ? localStorage.getItem('token') : null;
			const headersRequest = {
				Authorization: `Bearer ${token}`,
				'auth-key': `${process.env.NEXT_PUBLIC_ENV_AUTH_KEY}`,
			};
			dispatch(LoadingStart());
			const res = await axios.post(
				`${process.env.NEXT_PUBLIC_ENV_API_AUTH_URL}/api/v1/customer/profile/update`,
				{ fields },
				{ headers: headersRequest }
			);
			dispatch(fetchUserProfile());
			dispatch(
				openToastAndSetContent({
					toastContent: 'Profile Updated',
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

	const uploadFile = async (e: any, type: any) => {
		const image = e?.target?.files[0];
		const form = new FormData();
		form.append('document', image);

		try {
			const token =
				typeof window !== 'undefined' ? localStorage.getItem('token') : null;
			const headersRequest = {
				Authorization: `Bearer ${token}`,
				'auth-key': `${process.env.NEXT_PUBLIC_ENV_AUTH_KEY}`,
			};
			dispatch(LoadingStart());
			const res = await axios.post(
				`${process.env.NEXT_PUBLIC_ENV_API_AUTH_URL}/api/v1/customer/verification/document/${type}/upload`,
				form,
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

	const onSubmit = (e: any) => {
		e.preventDefault();
		profileUpdate();
	};

	useEffect(() => {
		setUser({
			...user,
			firstname: personalInfo?.first_name,
			lastname: personalInfo?.last_name,
			dob: personalInfo?.date_of_birth
				? new Date(personalInfo?.date_of_birth).toISOString().substr(0, 10)
				: '',
			address: personalInfo?.address,
			mobile: personalInfo?.mobile_number,
		});
	}, []);

	useEffect(() => {}, []);

	const handleFocus = (e: any) => {
		e.currentTarget.type = 'date';
	};

	const handleBlur = (e: any) => {
		e.currentTarget.type = 'text';
		e.currentTarget.placeholder = 'Date of birth';
	};

	return (
		<div>
			<DashboardLayout>
				<div className='relative bg-apace-black text-white min-h-full py-8 overflow-hidden '>
					<SettingsLayout>
						<div>
							<UploadPicComponent />
							<div className='lg:w-8/12 w-full'>
								<Form className='w-full' onSubmit={onSubmit}>
									<Input
										placeholder='First name'
										className='mt-2 mb-6'
										type='text'
										name='firstname'
										value={firstname}
										onChange={handleChange}
										required
									/>
									<Input
										placeholder='Last name'
										className='mt-2 mb-6'
										type='text'
										name='lastname'
										value={lastname}
										onChange={handleChange}
										required
									/>
									<div className='flex flex-col mb-6'>
										<input
											placeholder='Date of birth'
											className='border border-gray-600 text-white bg-transparent outline-none rounded-md h-10 px-4 text-base mt-2 mb-1'
											type='text'
											name='dob'
											value={dob}
											onChange={handleChange}
											onFocus={handleFocus}
											onBlur={handleBlur}
											required
										/>
										{/* onFocus={() => (ref.current.type = 'date')}
										onBlur={() => (ref.current.type = 'text')} */}
										<small>Should match the date on valid ID </small>
									</div>
									<Input
										placeholder='Residential address'
										className='mt-2 mb-6'
										type='text'
										name='address'
										value={address}
										onChange={handleChange}
										required
									/>
									<Input
										placeholder='Mobile Number'
										className='mt-2 mb-6'
										type='text'
										name='mobile'
										value={mobile}
										onChange={handleChange}
										required
									/>
									<div className='flex flex-col mb-6'>
										<div className='relative '>
											<div className='absolute top-2 right-4'>
												<img src='/icons/settings/attachment.svg' />
											</div>
											<Input
												placeholder='Proof of address'
												className='mb-1 w-full pt-2'
												type='file'
												name='utility_bill'
												onChange={(e) => uploadFile(e, 'utility_bill')}
											/>
										</div>
										<small>Utility bill or valid ID </small>
									</div>

									<div className='flex'>
										<Button className='bg-purple-600 border-purple-600 text-black'>
											Verify
										</Button>
									</div>
								</Form>
							</div>
						</div>
					</SettingsLayout>
				</div>
			</DashboardLayout>
		</div>
	);
};

export default withAuth(SettingsProfile);
