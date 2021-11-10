import Container from "./container";
import {  BigAIconDark } from "./icons/logo";
import {
  FacebookIcon,
  InstagramIcon,
  LinkednIcon,
  TwitterIcon,
} from "./icons/social-media";

function Footer() {
  return (
    <div
      style={{ zIndex: -100 }}
      className="relative w-full mx-auto overflow-hidden bg-footer-texture bg-cover bg-fixed bg-apace-black  text-white lg:h-screen  h-96 flex justify-center items-center "
    >
      <div
        className="fixed 2xl:absolute z-10"
        style={{ bottom: "0", right: "0" }}
      >
        <BigAIconDark />
      </div>
      <div className="w-full h-full">
        <div className="fixed left-0 bottom-0 lg:mb-80 md:mb-52 mb-48  w-full flex justify-center items-center ">
          <Container>
            <p className="text-4xl md:text-7xl lg:text-8xl font-black text-yellow-600">
              #useApace
            </p>
          </Container>
        </div>
        <footer className="fixed left-0 bottom-0 w-full ">
          <div className="2xl:w-3/6 mx-auto flex flex-wrap lg:flex-row flex-col items-center justify-between py-8  px-8  lg:px-24 ">
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
            <div className="lg:text-2xl text-xl">Whatever you want ™</div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Footer;
