import { NextPage } from 'next';
import DashboardLayout from '../../../../components/dashboard/layout';
import withAuth from '../../../../route/with-auth';
import SettingsLayout from '../../../../components/dashboard/settings/layout';
import ProfileForm from '../../../../components/dashboard/settings/form/profile-form';
import SettingsVerificationNavigation from '../../../../components/dashboard/settings/verification-navigation';
import BvnForm from '../../../../components/dashboard/settings/form/bvn-form';
import Plus from '../../../../components/dashboard/settings/plus';
import Premium from '../../../../components/dashboard/settings/premium';
import Pro from '../../../../components/dashboard/settings/pro';
import { useDispatch, useSelector } from 'react-redux';
import Bvnpending from '../../../../components/dashboard/settings/bvnpending';
import BvnFormOtp from '../../../../components/dashboard/settings/form/bvn-form-0tp';
import Gpending from '../../../../components/dashboard/settings/bvnpending';
import AllCompleted from '../../../../components/dashboard/settings/allcompleted';

const Settings: NextPage = () => {
	const profile = useSelector((state: any) => state.auth);
	const onBoardingStep = profile?.user?.data?.on_boarding_step;

	return (
		<div>
			<DashboardLayout>
				<div className='relative bg-apace-black text-white min-h-full py-8 overflow-hidden '>
					<SettingsLayout>
						<div className='flex md:flex-row flex-col items-baseline justify-between '>
							<div className='lg:w-4/12 w-full lg:my-0 my-4 lg:ml-0 ml-1 '>
								<SettingsVerificationNavigation />
							</div>
							<div className='lg:w-8/12 w-full lg:mr-8'>
								{/* <h1 className='text-xl mb-6  '> Update Bvn </h1> */}
								{/* <ProfileForm /> */}
								{onBoardingStep?.step_code === 'verify-bvn' && <BvnForm />}

								{onBoardingStep?.step_code === 'add-account-statement' && (
									<Plus />
								)}

								{onBoardingStep?.step_code === 'add-guarantor' && <Pro />}

								{onBoardingStep?.step_code === 'request-for-premium' && (
									<Premium />
								)}

								{onBoardingStep?.step_code === 'verify-bvn-pending' && (
									<BvnFormOtp />
								)}

								{onBoardingStep?.step_code === 'add-guarantor-pending' && (
									<Gpending title='GUARANTOR' desc='Verification' />
								)}

								{onBoardingStep?.step_code === 'premium-review-ongoing' && (
									<Gpending title='PREMIUM ACCOUNT' desc='Approval' />
								)}
								{onBoardingStep?.step_code ===
									'add-account-statement-pending' && (
									<Gpending title='PLUS ACCOUNT' desc='Verification' />
								)}
								{onBoardingStep?.step_code === 'Dashboard' && <AllCompleted />}
							</div>
						</div>
					</SettingsLayout>
				</div>
			</DashboardLayout>
		</div>
	);
};

export default withAuth(Settings);
