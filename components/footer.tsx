import type { AppProps } from "next/app";

import Header from "./header";
import {
  FacebookIcon,
  InstagramIcon,
  LinkednIcon,
  TwitterIcon,
} from "./icons/social-media";

function Footer({ children }: any) {
  return (
    <>
      <footer className="bg-apace-black text-white flex lg:flex-row flex-col items-center justify-between py-8  px-8 sm:px-6 lg:px-32">
        <div> &copy; 2021 Apace Inc. All right reserved.</div>

        <div className="flex mt-4 lg:mt-0">
          <div></div>
          <InstagramIcon />

          <div className="ml-8">
            <LinkednIcon />
          </div>
          <div className="ml-8">
            <FacebookIcon />
          </div>

          <div className="ml-8">
            <TwitterIcon />
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
