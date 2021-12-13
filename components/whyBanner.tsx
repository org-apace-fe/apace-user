import Container from "./container";
import { BigAIcon } from "./icons/logo";
import Image from "next/image";

const WhyBanner = () => {
  return (
    <div className="relative bg-apace-black text-white min-h-full py-8 overflow-hidden ">
      <div
        className="absolute z-10"
        style={{ bottom: "30em", right: "-15rem" }}
      >
        <BigAIcon />
      </div>

      <Container>
        <div className="relative flex lg:flex-row flex-col items-center my-16">
          <div className="lg:w-1/2 w-full lg:mr-8 mr-0">
            <p className="uppercase text-apace-orange-light text-xl ">
              why apace
            </p>
            <h4 className="text-7xl lg:text-8xl  font-black"> Ample time</h4>
            <h4 className="text-7xl lg:text-8xl  font-black text-apace-orange-dark">
              good time
            </h4>

            <div className="w-5/6 my-10">
              <p className="text-lg">
                Apace is the new luxury of ample time to pay so that Whatever
                you want™, whenever you want it, as long as you can
                <span className="text-apace-orange-light  "> #useApace </span>
                at checkout, you can get it.
              </p>
            </div>
          </div>

          <div className="lg:w-1/2 w-full ">
            <Image
              className="w-full h-full object-contain"
              src="/icons/amp-time.png"
              height={542}
              width={582}
            />
          </div>
        </div>
      </Container>

      <div
        className="bg-apace-gray lg:pb-32 lg:pt-32 py-0 lg:px-12 relative flex lg:flex-row flex-col items-center mt-32 mb-16"
        style={{
          borderTopLeftRadius: "50% 10% ",
          borderTopRightRadius: "50% 10%",
          borderBottomLeftRadius: "50% 10% ",
          borderBottomRightRadius: "50% 10%",
        }}
      >
        <Container>
          <div className="relative flex lg:flex-row flex-col items-center ">
            <div className="lg:w-1/2 w-full lg:mr-8 mr-0">
              <h4 className="text-7xl  font-black">No more roadblocks</h4>
              <div className="w-5/6 my-10">
                <p className="text-lg">
                  The only thing standing between you and what you desire is how
                  you have to pay — now and in full. Even if you're offered a
                  discount, promo, or loyalty points, you still have to pay now
                  and in full. This peculiar roadblock puts a strain on your
                  budget and much pressure on you. But what if you could
                  actually take your item home today, now, while having the
                  luxury of ample time to pay? You can.
                </p>
              </div>
            </div>

            <div className="lg:w-1/2 w-full px-0">
              <Image
                className="w-full h-full object-contain"
                src="/icons/road-blocks.png"
                height={592}
                width={489}
                priority={true}
              />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default WhyBanner;
