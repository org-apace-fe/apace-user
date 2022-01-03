// import { NextPage } from 'next';
// import DashboardLayout from '../layout';
// import withAuth from '../../../route/with-auth';
// import { useDispatch } from 'react-redux';
// import SettingsLayout from './layout';
// import SettingsVerificationNavigation from './verification-navigation';
// import Button from '../../button';
// import { openModalAndSetContent } from '../../../store/actions/modal/modalActions';
// import ContactUs from '../modal/contact-us';

const AllCompleted = () => {
	// const dispatch = useDispatch();
	return (
		<div className='relative bg-apace-black text-white min-h-full py-8 overflow-hidden text-sm '>
			<div className=' lg:w-8/12 w-full mr-8 grid place-items-center h-30'>
				<h1 className='text-xl mb-6 text-center'>
					{' '}
					All Verification steps completed
				</h1>
				<p>Thank you for using Apace.</p>

				{/* <Button
					className='text-black bg-purple-600 border-purple-600 '
					onClick={() =>
						dispatch(
							openModalAndSetContent({
								modalStyles: {
									padding: 0,
								},
								modalContent: (
									<>
										<ContactUs />
									</>
								),
							})
						)
					}>
					Contact us
				</Button> */}
			</div>
		</div>
	);
};

export default AllCompleted;
