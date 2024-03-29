import Button from '../../button';
import { background } from '../../../utils/background';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../../store/actions/modal/modalActions';
import TextArea from '../../text-area';
import Input from '../../input';
import { useEffect, useState } from 'react';
import {
	LoadingStart,
	LoadingStop,
} from '../../../store/actions/loader/loaderActions';
import axios from 'axios';
import { openToastAndSetContent } from '../../../store/actions/toast/toastActions';
import { fetchUserProfile } from '../../../store/actions/user.action';

const ContactUs = () => {
	const dispatch = useDispatch();

	const auth = useSelector((state: any) => state.auth);
	const email = auth?.user?.data?.peronal_info?.email_address;

	const initialState = {
		email_address: '',
		message: '',
		request_for_premium: false,
	};
	const [data, setData] = useState<any>(initialState);
	const [checked, setChecked] = useState(false);

	const handleChange = (e: any) => {
		setData({
			...data,
			[e.target.name]: e.target.value,
		});
	};

	// const handleCheckChange = (e: any) => {
	// 	setData({
	// 		...data,
	// 		[e.target.name]: setChecked(!checked),
	// 	});
	// };

	const contactUs = async () => {
		try {
			const token =
				typeof window !== 'undefined' ? localStorage.getItem('token') : null;
			const headersRequest = {
				Authorization: `Bearer ${token}`,
				'auth-key': `${process.env.NEXT_PUBLIC_ENV_AUTH_KEY}`,
			};
			dispatch(LoadingStart());
			const res = await axios.post(
				`${process.env.NEXT_PUBLIC_ENV_API_AUTH_URL}/api/v1/customer/contact-us/message/send`,
				data,
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
			setData(initialState);
			dispatch(fetchUserProfile());
			dispatch(LoadingStop());
			dispatch(closeModal());
		} catch (error: any) {
			dispatch(
				openToastAndSetContent({
					toastContent: error?.response?.data?.message,
					toastStyles: {
						backgroundColor: 'red',
					},
				})
			);
			setData(initialState);

			dispatch(LoadingStop());
		}
	};

	const onSubmit = (e: any) => {
		e.preventDefault();
		contactUs();
	};

	useEffect(() => {
		setData({
			...data,
			email_address: email,
			request_for_premium: checked,
		});
	}, [checked]);

	// useEffect(() => {
	// 	console.log(data);
	// 	console.log(checked);
	// }, [data, checked]);

	const { email_address, message, request_for_premium } = data;

	return (
		<div className='text-white'>
			<div
				className='py-3 pl-4 text-lg text-left '
				style={{ background: background.apacegray2 }}>
				<h1> Contact us </h1>
			</div>
			<form onSubmit={onSubmit}>
				<div
					style={{ background: background.apacegray3 }}
					className='px-4 py-4'>
					<Input
						className='w-full mb-4'
						placeholder='Email address *'
						name='email_address'
						value={email_address}
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
					<label className=' w-full'>
						<input
							type='checkbox'
							className='form-checkbox bg-black mr-2 '
							name='request_for_premium'
							value={request_for_premium}
							onChange={() => setChecked(!checked)}
						/>
						<span className='ml-2 mr-6'> request for premium </span>
					</label>
				</div>
				<div
					className='flex justify-center'
					style={{ background: background.apacegray2 }}>
					<Button className='mx-2  w-3/5 bg-apace-orange-dark border-apace-orange-dark text-black'>
						Contact Us{' '}
					</Button>
				</div>
			</form>
		</div>
	);
};

export default ContactUs;
