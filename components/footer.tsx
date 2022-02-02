/* eslint-disable react/jsx-no-target-blank */
import Container from './container';
import { BigAIconDark } from './icons/logo';
import {
	FacebookIcon,
	InstagramIcon,
	LinkednIcon,
	TwitterIcon,
} from './icons/social-media';
import styled from 'styled-components';

function Footer() {
	return (
		<div
			style={{ zIndex: -100 }}
			className='relative w-full mx-auto overflow-hidden bg-footer-texture bg-cover bg-fixed bg-apace-black  text-white lg:h-screen  h-96 flex justify-center items-center '>
			<div
				className='fixed 2xl:absolute z-10'
				style={{ bottom: '0', right: '0' }}>
				<BigAIconDark />
			</div>
			<div className='w-full h-full'>
				<div className='fixed left-0 bottom-0 top-12 lg:mb-80 md:mb-52 mb-48  w-full flex justify-center items-center '>
					<Container>
						<p className='text-4xl md:text-7xl lg:text-8xl font-black text-yellow-600 mt-10'>
							#useApace
						</p>
					</Container>
				</div>
				<footer className='fixed left-0 bottom-0 w-full '>
					<StyledFooter>
						<div className='gen-parent'>
							<div className='get-intouch'>
								<h1 className='get-intouch-h1'>Get In touch</h1>
								<p className='get-intouch-h1-p'>hi@useapace.com</p>
								<p className='get-intouch-h1-p'>+234 664 2718</p>
							</div>
							<div className='icon-parent'>
								<a href='https://www.instagram.com/useapace' target='_blank'>
									<InstagramIcon />
								</a>
								<a
									href='https://www.linkedin.com/company/useapace'
									target='_blank'
									className='ml-8'>
									<LinkednIcon />
								</a>
								<a
									href='https://www.facebook.com/useApace'
									target='_blank'
									className='ml-8'>
									<FacebookIcon />
								</a>

								<a
									href='https://twitter.com/useApace'
									target='_blank'
									className='ml-8'>
									<TwitterIcon />
								</a>
							</div>
							<div className='reserved'>
								{' '}
								&copy; 2021 Apace Inc. All right reserved.
							</div>
						</div>
						<div className='whatever'>Whatever you want ™</div>
					</StyledFooter>
				</footer>
			</div>
		</div>
	);
}

const StyledFooter = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	margin: 5rem 8rem;

	@media (max-width: 1050px) {
		margin: 5rem 3rem;
	}

	.gen-parent {
		width: 30%;

		@media (max-width: 1050px) {
			width: 50%;
		}

		@media (max-width: 600px) {
			width: 90%;
		}
	}

	.get-intouch {
	}

	.get-intouch-h1 {
		font-family: Geometria;
		font-style: normal;
		font-weight: bold;
		font-size: 1.4rem;
		line-height: 3rem;
		color: #ffffff;
		margin-bottom: 1.6rem;
	}

	.get-intouch-h1-p {
		font-family: Geometria;
		font-weight: 500;
		font-size: 16px;
		line-height: 20px;
		margin-bottom: 1rem;
		color: rgba(255, 255, 255, 0.81);
	}

	.icon-parent {
		display: flex;
		align-items: flex-end;
		margin: 20px 0;

		a {
			width: 40px;
			height: 40px;
			object-fit: cover;
			border-radius: 50%;
			background-color: #ffffff;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}

	.reserved {
		font-family: Geometria;
		font-style: normal;
		font-weight: 500;
		font-size: 14px;
		line-height: 18px;
		color: rgba(199, 199, 199, 0.65);
	}

	.whatever {
		font-family: Geometria;
		font-style: normal;
		font-weight: 500;
		font-size: 24px;
		line-height: 30px;
		color: #ffffff;

		@media (max-width: 1050px) {
			font-size: 14px;
		}
		@media (max-width: 680px) {
			display: none;
		}
	}
`;

export default Footer;
