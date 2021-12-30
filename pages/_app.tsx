import "../styles/tailwind.css";
import { Provider, useDispatch } from "react-redux";
import { createWrapper } from "next-redux-wrapper";
import store from "../store/store";
import { PersistGate } from "redux-persist/integration/react";
import type { AppProps } from "next/app";
import axios from "axios";
import { openToastAndSetContent } from "../store/actions/toast/toastActions";
import { closeModal } from "../store/actions/modal/modalActions";
import { logoutUser } from "../store/actions/user.action";
import router from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const dispatch = useDispatch();

  axios?.interceptors?.response?.use(
    (response) => {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    (error) => {
      if (error?.response?.status === 401) {
        console.log(error?.response?.data?.message, error?.response?.status);

        dispatch(
          openToastAndSetContent({
            toastContent: "Token Expired",
            toastStyles: {
              backgroundColor: "red",
            },
          })
        );
        dispatch(closeModal());
        dispatch(logoutUser(router));
      } else {
        throw new Error(error);
      }
    }
  );

  return (
    <>
      <div className="bg-apace-black  font-body ">
        <Provider store={store}>
          <PersistGate persistor={store?.__PERSISTOR} loading={null}>
            <Component {...pageProps} />
          </PersistGate>
        </Provider>
      </div>
    </>
  );
}

const makeStore = () => store;
const wrapper = createWrapper(makeStore);

export default wrapper.withRedux(MyApp);
