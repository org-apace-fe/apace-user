import type { AppProps } from "next/app";
import Container from "./container";

import Header from "./header";
import {
  FacebookIcon,
  InstagramIcon,
  LinkednIcon,
  TwitterIcon,
} from "./icons/social-media";

function Footer({ children }: any) {
  return (
    <div className="relative bg-apace-black text-white lg:h-screen h-96 flex justify-center items-center">
      <div className="absolute top-0 right-0 w-full h-full">
        <img src={`/icons/footer@3x.png`} className="w-full h-full" />
      </div>
      <div className=" flex justify-center items-center z-30">
        <Container>
          <p className="text-4xl md:text-7xl lg:text-8xl font-black text-yellow-600">
            {" "}
            #useApace{" "}
          </p>
        </Container>
      </div>
      <footer className="absolute left-0 bottom-0 w-full flex flex-wrap lg:flex-row flex-col items-center justify-between py-8  px-8 sm:px-6 lg:px-32 z-50">
        <div className="flex flex-col lg:items-start items-center ">
          <div className="flex mt-4 lg:mt-0 mb-3 ">
            <div>
              <InstagramIcon />
            </div>
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
          <div> &copy; 2021 Apace Inc. All right reserved.</div>
        </div>
        <div className="text-2xl">Whatever you want ™</div>
      </footer>
    </div>
  );
}

export default Footer;
