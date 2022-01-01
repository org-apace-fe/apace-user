import { ApaceLogoIcon } from '../icons/logo';
import Link from 'next/link';
import { Disclosure, Menu } from '@headlessui/react';
import {
	SearchIcon,
	MenuIcon,
	XIcon,
	ChevronDownIcon,
	ChevronUpIcon,
} from '@heroicons/react/outline';
import Notification from './notification';
import Referral from './referral';
import Profile from './profile';
import { background } from '../../utils/background';
import Pills from './pills';
import { useSelector } from 'react-redux';
import Avatar from 'react-avatar';
import SearchBar from './searchbar';

const DashboardHeader = () => {
	const profile = useSelector((state: any) => state.auth);

	const personalInfo = profile?.user?.data?.peronal_info;
	return (
		<div className='min-h-full '>
			<Disclosure
				as='nav'
				className=' '
				style={{ background: background.apacegray5 }}>
				{({ open }) => (
					<>
						<div className='pt-5 pb-0  px-8 sm:px-6 lg:px-24 border-b border-gray-700 '>
							<div className='relative flex justify-between items-center w-full '>
								<Link href='/dashboard'>
									<a>
										<ApaceLogoIcon />
									</a>
								</Link>

								{/* SearchBar */}
								<SearchBar />
								{/* SearchBar */}
								<div className='flex items-center justify-center'>
									<Link href='/dashboard/notifications'>
										<img
											src='/icons/notification.svg'
											className='md:hidden block px-4 py-2'
										/>
									</Link>
									<Menu
										as='div'
										className='relative  md:inline-block hidden text-left'>
										<Menu.Button className='inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-300 hover:text-apace-orange-light  '>
											<div>
												<img src='/icons/notification.svg' />
											</div>
										</Menu.Button>

										<Menu.Items
											style={{ zIndex: 100, width: '30rem' }}
											className='absolute md:block hidden right-0  mt-2 origin-top-right bg-gray-700 text-white rounded-md shadow-lg  '>
											<Notification />
										</Menu.Items>
									</Menu>
									<Link href='/dashboard/referrals'>
										<img
											src='/icons/referral.svg'
											className='md:hidden block px-4 py-2'
										/>
									</Link>
									<Menu
										as='div'
										className='relative md:inline-block hidden text-left'>
										<Menu.Button className='inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-300 hover:text-apace-orange-light  '>
											<div>
												<img src='/icons/referral.svg' />
											</div>
										</Menu.Button>
										<Menu.Items
											style={{ zIndex: 100 }}
											className='absolute md:block hidden right-0 w-96 mt-2 origin-top-right bg-gray-700 text-white rounded-md shadow-lg  '>
											<Referral />
										</Menu.Items>
									</Menu>
									<Menu as='div' className='relative inline-block text-left'>
										<Menu.Button className='inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-300 hover:text-apace-orange-light  '>
											{!personalInfo?.avatar ? (
												<Avatar
													className='sb-avatar rounded-full mr-4'
													size='3.5rem'
													color='#ED6E24'
													name={`${personalInfo?.first_name} ${personalInfo?.last_name} `}
												/>
											) : (
												<div className='w-12 h-12 mr-4 rounded-full overflow-hidden'>
													<img
														src={personalInfo?.avatar}
														className='w-full h-full object-cover'
														alt=''
													/>
												</div>
											)}
										</Menu.Button>
										<Menu.Items
											style={{ zIndex: 100 }}
											className='absolute  right-0 w-80 mt-2 origin-top-right bg-gray-700 text-white rounded-md shadow-lg outline-none '>
											<Profile />
										</Menu.Items>
									</Menu>
								</div>
							</div>
							{/* tab */}

							<div className='relative overflow-x-auto'>
								<div className='min-w-min lg:min-w-max max-h-screen flex items-center  text-base  lg:flex mt-4 '>
									<Pills href='/dashboard'> Stores </Pills>
									<Pills href='/dashboard/overview'> Overview </Pills>
									<Pills href='/dashboard/payments'> Payments </Pills>
									<Pills href='/dashboard/purchases'> Purchase </Pills>
									<Pills href='/dashboard/referrals'> Referrals </Pills>
									<Pills href='/dashboard/cards'> Cards </Pills>
									<Pills href='/dashboard/settings/verification'>
										Settings
									</Pills>
								</div>
							</div>
							{/* tab */}
						</div>
					</>
				)}
			</Disclosure>
		</div>
	);
};

export default DashboardHeader;
