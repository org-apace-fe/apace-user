import "../styles/tailwind.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-apace-black  font-body ">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
