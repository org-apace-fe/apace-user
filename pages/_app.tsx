import "../styles/tailwind.css";
import { Provider } from "react-redux";
import { createWrapper } from "next-redux-wrapper";
import store from "../store/store";
import { PersistGate } from "redux-persist/integration/react";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <div className="bg-apace-black  font-body ">
        <Provider store={store}>
          <PersistGate persistor={store.__PERSISTOR} loading={null}>
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
