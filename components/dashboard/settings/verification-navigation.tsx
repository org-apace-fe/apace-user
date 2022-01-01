import Link from 'next/link';
import router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { CheckCircleRounded } from '@mui/icons-material';

const SettingsVerificationNavigation = () => {
	const path = router;
	const pn = path.pathname;
	const profile = useSelector((state: any) => state.auth);
	const customerTiers = profile?.user?.data?.customer_tiers;

	return (
		<>
			<nav className=' overflow-x-auto '>
				{customerTiers && (
					<div className='min-w-lg lg:min-w-max flex lg:flex-col flex-row'>
						{/* <Link href='/dashboard/settings/verification'> */}
						<a className='flex'>
							<CheckCircleRounded
								width='25px'
								height='25px'
								color={`${
									!customerTiers[0]?.is_completed ? 'inherit' : 'success'
								}`}
							/>
							<p className='ml-2'> {customerTiers[0]?.tier_name} </p>
						</a>
						{/* </Link> */}
						<span className='lg:border-l border-none border-gray-800 ml-3 h-12 lg:w-0 w-6  '></span>
						{/* <Link href='/dashboard/settings/verification/plus'> */}
						<a className='flex'>
							<CheckCircleRounded
								width='25px'
								height='25px'
								color={`${
									!customerTiers[1]?.is_completed ? 'inherit' : 'success'
								}`}
							/>
							<p className='ml-2'> {customerTiers[1]?.tier_name} </p>
						</a>
						{/* </Link> */}
						<span className='lg:border-l border-none border-gray-800 ml-3 h-12 lg:w-0 w-6  '></span>
						{/* <Link href='/dashboard/settings/verification/pro'> */}
						<a className='flex'>
							<CheckCircleRounded
								width='25px'
								height='25px'
								color={`${
									!customerTiers[2]?.is_completed ? 'inherit' : 'success'
								}`}
							/>
							<p className='ml-2'> {customerTiers[2]?.tier_name} </p>
						</a>
						{/* </Link> */}
						<span className='lg:border-l border-none border-gray-800 ml-3 h-12 lg:w-0 w-6  '></span>
						{/* <Link href='/dashboard/settings/verification/premium'> */}
						<a className='flex'>
							<CheckCircleRounded
								width='25px'
								height='25px'
								color={`${
									!customerTiers[3]?.is_completed ? 'inherit' : 'success'
								}`}
							/>
							<p className='ml-2'> {customerTiers[3]?.tier_name} </p>
						</a>
						{/* </Link> */}
					</div>
				)}
			</nav>
		</>
	);
};

export default SettingsVerificationNavigation;
