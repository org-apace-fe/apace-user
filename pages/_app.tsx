import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-apace-black">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
