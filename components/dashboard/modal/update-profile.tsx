import Button from '../../button';
import { background } from '../../../utils/background';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../../store/actions/modal/modalActions';
import TextArea from '../../text-area';
import Input from '../../input';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
	LoadingStart,
	LoadingStop,
} from '../../../store/actions/loader/loaderActions';
import { openToastAndSetContent } from '../../../store/actions/toast/toastActions';
import { fetchUserProfile } from '../../../store/actions/user.action';
import AddCard from '../modal/add-card';
import { openModalAndSetContent } from '../../../store/actions/modal/modalActions';

type ComplaintProps = {
	id: number;
	reference: any;
	handleClose: any;
	handleOpen2: any;
};

const UpdateProfileModal = ({
	id,
	reference,
	handleClose,
	handleOpen2,
}: Partial<ComplaintProps>) => {
	const dispatch = useDispatch();

	const token =
		typeof window !== 'undefined' ? localStorage.getItem('token') : null;
	const headersRequest = {
		Authorization: `Bearer ${token}`,
		'auth-key': `${process.env.NEXT_PUBLIC_ENV_AUTH_KEY}`,
	};

	const profile = useSelector((state: any) => state.auth);
	const personalInfo = profile?.user?.data?.peronal_info;
	const verifications = profile?.user?.data?.verifications;

	const initialState = {
		firstname: '',
		lastname: '',
		address: '',
		dob: '',
	};
	const [user, setUser] = useState<any>(initialState);

	const handleChange = (e: any) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const { firstname, lastname, address, dob } = user;

	const onSubmit = async (e: any) => {
		e.preventDefault();
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
			dispatch(LoadingStart());
			const res = await axios.post(
				`${process.env.NEXT_PUBLIC_ENV_API_AUTH_URL}/api/v1/customer/profile/update`,
				{ fields },
				{ headers: headersRequest }
			);

			console.log(res, user, fields);

			dispatch(
				openToastAndSetContent({
					toastContent: res?.data?.message,
					toastStyles: {
						backgroundColor: 'green',
					},
				})
			);
			dispatch(closeModal);
			dispatch(fetchUserProfile());
			dispatch(LoadingStop());
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
		} catch (error: any) {
			console.log(error, user, fields);
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
		setUser({
			...user,
			firstname: personalInfo?.first_name,
			lastname: personalInfo?.last_name,
			dob: personalInfo?.date_of_birth
				? new Date(personalInfo?.date_of_birth).toISOString().substr(0, 10)
				: '',
			address: personalInfo?.address,
		});
	}, []);

	useEffect(() => {}, []);

	return (
		<div className='text-white'>
			<div
				className='py-3 pl-4 text-lg text-left '
				style={{ background: background.apacegray2 }}>
				<h1> Update Profile </h1>
			</div>
			<div
				className='text-sm py-4 px-4 text-left border-b border-gray-600 '
				style={{ background: background.apacegray3 }}>
				<p className='text-base'>Update your profile</p>
			</div>
			<form
				className='w-full px-4 py-4'
				style={{ background: background.apacegray3 }}
				onSubmit={onSubmit}>
				<Input
					placeholder='First name'
					className='w-full mt-2 mb-6'
					type='text'
					name='firstname'
					value={firstname}
					onChange={handleChange}
					required
				/>

				<Input
					placeholder='Last name'
					className='w-full mt-2 mb-6'
					type='text'
					name='lastname'
					value={lastname}
					onChange={handleChange}
					required
				/>
				<div className='flex flex-col mb-6'>
					<Input
						placeholder='Date of birth (DD/MM/YYYY)'
						className='w-full mt-2 mb-1'
						type='date'
						name='dob'
						value={dob}
						onChange={handleChange}
						required
					/>
					<small>Should match the date on valid ID </small>
				</div>
				<Input
					placeholder='Residential address'
					className='w-full mt-2 mb-6'
					type='text'
					name='address'
					value={address}
					onChange={handleChange}
					required
				/>

				<div className='flex'>
					<Button className='bg-purple-600 border-purple-600 text-black'>
						Verify
					</Button>
				</div>
			</form>
		</div>
	);
};

export default UpdateProfileModal;
