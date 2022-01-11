/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next';
import Container from '../../components/container';
import DashboardLayout from '../../components/dashboard/layout';
import withAuth from '../../route/with-auth';
import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../store/actions/modal/modalActions';
import {
	LoadingStart,
	LoadingStop,
} from '../../store/actions/loader/loaderActions';
import axios from 'axios';
import { openToastAndSetContent } from '../../store/actions/toast/toastActions';
import isEmpty from 'is-empty';
import moment from 'moment';
import Button from '../../components/button';
import { background } from '../../utils/background';
import { fetchUserProfile } from '../../store/actions/user.action';
import styled from 'styled-components';

const Cards: NextPage = () => {
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
			dispatch(LoadingStart());
			const res = await axios.get(
				`${process.env.NEXT_PUBLIC_ENV_API_AUTH_URL}/api/v1/customer/saved-card/all`,
				{ headers: headersRequest }
			);
			setCards(res?.data?.data);
			dispatch(LoadingStop());
		} catch (error) {
			dispatch(LoadingStop());
		}
	};

	const addCard = async () => {
		try {
			dispatch(LoadingStart());
			const res = await axios.patch(
				`${process.env.NEXT_PUBLIC_ENV_API_AUTH_URL}/api/v1/customer/saved-card/add`,
				{},
				{ headers: headersRequest }
			);
			const cardData = res?.data?.data;

			if (cardData) {
				window.open(cardData?.payment_link, '_self');
			}
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

	const params = new URLSearchParams(window.location.search);

	const addCardComplete = async (reference: any) => {
		try {
			dispatch(LoadingStart());
			const res = await axios.patch(
				`/api/v1/customer/saved-card/add/${reference}/complete`
			);
			dispatch(
				openToastAndSetContent({
					toastContent: res?.data?.message,
					toastStyles: {
						backgroundColor: 'green',
					},
				})
			);
			fetchCards();
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
			dispatch(LoadingStop());
		}
	};

	const disableCard = async (cardId: any) => {
		try {
			dispatch(LoadingStart());
			const res = await axios.patch(
				`${process.env.NEXT_PUBLIC_ENV_API_AUTH_URL}/api/v1/customer/saved-card/${cardId}/disable`
			);
			dispatch(
				openToastAndSetContent({
					toastContent: res?.data?.message,
					toastStyles: {
						backgroundColor: 'green',
					},
				})
			);
			fetchCards();
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

	const txRef = params.get('tx_ref');
	if (txRef && txRef !== "") {
		addCardComplete(txRef);
	}

	useEffect(() => {
		fetchCards();
	}, []);

	return (
		<div>
			<DashboardLayout>
				<div className='relative bg-apace-black text-white min-h-full py-8 overflow-hidden '>
					<Container>
						<>
							{isEmpty(cards) ? (
								<div
									className='flex flex-col justify-center h-56 rounded-lg items-center '
									style={{ background: background.apacegray3 }}>
									<p>You currently have no cards </p>
									<Button
										onClick={addCard}
										className=' bg-apace-orange-dark border-apace-orange-dark text-black'>
										Add Card +{' '}
									</Button>
								</div>
							) : (
								<div className='flex'>
									<div>
										{cards?.map((card) => {
											return (
												<StyledCard key={card?.id}>
													{/* <p> Card Token : {card?.card_token} </p> */}
													{/* <p> Masked Pan : {card?.masked_pan} </p> */}
													<div className='flex-first'>
														<p className='flex-first-p'>
															{personalInfo?.first_name}
														</p>
														<img className='flex-first-img' src='' alt='' />
													</div>
													<img
														className='flex-second-img'
														src='https://i.ibb.co/q99hjMq/Group-4.png'
														alt=''
													/>
													<p className='flex-third-p'>{card?.masked_pan} </p>
													<div className='footer'>
														<button
															className='bg-apace-orange-dark border-apace-orange-dark text-black rounded-full p-2'
															onClick={() => disableCard(card?.id)}>
															Disable
														</button>

														<p className='footer-p'>
															Date created:{' '}
															{moment(card?.date_created).format('ll')}
														</p>
													</div>
												</StyledCard>
											);
										})}
									</div>

									<div className='ml-4'>
										<Button
											onClick={addCard}
											className='bg-apace-orange-dark border-apace-orange-dark text-black'>
											Add Card +
										</Button>
									</div>
								</div>
							)}
						</>
					</Container>
				</div>
			</DashboardLayout>
		</div>
	);
};

const StyledCard = styled.div`
	width: 407px;
	height: 224.97px;

	/* background: #293688; */
	box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25), 0px 0px 10px rgba(0, 0, 0, 0.03);
	border-radius: 20px;
	background-image: url('https://i.ibb.co/v4f5JZp/bg-map-1-1.png');
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
	padding: 15px;
	border: 1px solid #ffffff;

	.flex-first {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;

		.flex-first-p {
		}

		.flex-first-img {
		}
	}

	.flex-second-img {
		margin: 1rem 20rem;
	}

	.flex-third-p {
		margin: 1rem 0;
	}

	.footer {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		margin-top: 1.5rem;

		.footer-p {
		}
	}
`;

export default Cards;
