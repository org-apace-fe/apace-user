import { NextPage } from 'next';
import DashboardLayout from '../../../components/dashboard/layout';
import withAuth from '../../../route/with-auth';
import { useDispatch } from 'react-redux';
import SettingsLayout from '../../../components/dashboard/settings/layout';
import SettingsVerificationNavigation from '../../../components/dashboard/settings/verification-navigation';
import Button from '../../../components/button';
import { openModalAndSetContent } from '../../../store/actions/modal/modalActions';
import ContactUs from '../../../components/dashboard/modal/contact-us';

const Premium = () => {
	const dispatch = useDispatch();
	return (
		<div className='relative bg-apace-black text-white min-h-full py-8 overflow-hidden text-sm '>
			<div className=' lg:w-8/12 w-full mr-8'>
				<h1 className='text-xl mb-6  '> Apace premium </h1>
				<p>To complete Apace Premium verification, please contact us.</p>

				<Button
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
				</Button>
			</div>
		</div>
	);
};

export default Premium;
