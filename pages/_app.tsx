import '../styles/tailwind.css';
import { Provider, useDispatch } from 'react-redux';
import { createWrapper } from 'next-redux-wrapper';
import store from '../store/store';
import { PersistGate } from 'redux-persist/integration/react';
import type { AppProps } from 'next/app';
import axios from 'axios';
import { openToastAndSetContent } from '../store/actions/toast/toastActions';
import { closeModal } from '../store/actions/modal/modalActions';
import { logoutUser } from '../store/actions/user.action';
import router from 'next/router';
import ErrorBoundary from '../components/ErrorBoundary';

function MyApp({ Component, pageProps }: AppProps) {
	const dispatch = useDispatch();
	const token =
		typeof window !== 'undefined' ? localStorage.getItem('token') : null;
	axios.defaults.headers.common.Authorization = `Bearer ${token}`;
	axios.defaults.headers.common[
		'auth-key'
	] = `${process.env.NEXT_PUBLIC_ENV_AUTH_KEY}`;

	axios.defaults.baseURL = process.env.NEXT_PUBLIC_ENV_API_AUTH_URL;

	axios?.interceptors?.response?.use(
		(response) => {
			// Any status code that lie within the range of 2xx cause this function to trigger
			// Do something with response data
			return response;
		},
		(error) => {
			if (error?.response?.status === 401) {

				dispatch(
					openToastAndSetContent({
						toastContent: 'Token Expired',
						toastStyles: {
							backgroundColor: 'red',
						},
					})
				);
				dispatch(closeModal());
				dispatch(logoutUser(router));
			} else {
				return Promise.reject(error);
			}
		}
	);

	return (
		<div/>
		/*<>
			<div className='bg-apace-black font-body'>
				<Provider store={store}>
					<PersistGate persistor={store?.__PERSISTOR} loading={null}>
						<ErrorBoundary>
							<Component {...pageProps} />
						</ErrorBoundary>
					</PersistGate>
				</Provider>
			</div>
		</> */
	);
}

const makeStore = () => store;
const wrapper = createWrapper(makeStore);

export default wrapper.withRedux(MyApp);
