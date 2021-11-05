import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Container from "./container";
import { Items } from "./caurosel-items";
import Button from "./button";
// import Swiper JS
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { BigAIcon } from "./icons/logo";

// import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const HowItWorks: NextPage = () => {
  const [data, setData]: any = useState();

  const row = [
    { name: 1, current: false },
    { name: 2, current: false },
    { name: 3, current: false },
  ];

  const note = [
    {
      id: 1,
      text: "Find you favorite online shop on Apace or visit any brick-and-mortar store near you, add items to your cart, verify a few bits of information, leave the rest to us.",
    },
    {
      id: 2,
      text: "Select from a set of convenient payment options spread up to 5 months or choose to Pay now and keep track of your spend, see where your money goes, and budget wisely, and budget wisely.",
    },
    {
      id: 3,
      text: "Find you favorite online shop on Apace or visit any brick-and-mortar store near you, add items to your cart, verify a few bits of information, leave the rest to us.",
    },
  ];

  const onClick = (e: any) => {
    setData(e);
  };

  const text = note.filter((e) => e.id === data);

  useEffect(() => {
    setData(1);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const items = [
    {
      id: 1,
      discount: "20%",
      photo: "/icons/headphones@3x.png",
    },
    {
      id: 2,
      discount: "5%",
      photo: "/icons/headphones@3x.png",
    },
    {
      id: 3,
      discount: "50%",
      photo: "/icons/headphones@3x.png",
    },
  ];

  const items2 = [
    {
      id: 1,
      discount: "20%",
      photo: "/icons/apacecard@3x.png",
    },
    {
      id: 2,
      discount: "5%",
      photo: "/icons/laptop@3x.png",
    },
    {
      id: 3,
      discount: "50%",
      photo: "/icons/apaceapp@3x.png",
    },
  ];

  const [data1, setData1] = useState(items);
  const [data2, setData2] = useState(items2);

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
  ];
  return (
    <div className="relative bg-apace-black text-white min-h-full py-8 overflow-hidden ">
      <div
        className="absolute z-10"
        style={{ bottom: "30em", right: "-15rem" }}
      >
        <BigAIcon />
      </div>

      <Container>
        <div className="relative flex lg:flex-row-reverse flex-col items-center my-16">
          <div className="lg:w-1/2 w-full lg:ml-8 ml-0">
            <h4 className="text-7xl font-black"> Have it now!</h4>
            <h4 className="text-7xl font-black text-apace-orange-dark">
              pay later.
            </h4>

            <div className="w-5/6 my-10">
              <p>
                You can have anything you want, from anywhere you love, as long
                as you use Apace at checkout.
              </p>
            </div>

            <div className="my-8 ">
              <Button className="w-36 bg-apace-orange-light border-apace-orange-light text-black mr-8">
                Try it free
              </Button>

              <Button className="w-36 border-none">Learn more</Button>
            </div>
          </div>

          <div className="lg:w-1/2 w-full ">
            <div className="lg:pr-8 pr-0">
              <Swiper
                // install Swiper modules
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={50}
                slidesPerView={1}
                navigation
                // pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log("slide change")}
              >
                {data1.map((item: any) => (
                  <SwiperSlide key={item.id}>
                    <div>
                      <Items item={item} />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </Container>

      <div
        className="bg-apace-gray lg:pb-32 lg:pt-32  py-0  relative flex lg:flex-row flex-col items-center mt-32 mb-16"
        style={{
          borderTopLeftRadius: "50% 10% ",
          borderTopRightRadius: "50% 10%",
          borderBottomLeftRadius: "50% 10% ",
          borderBottomRightRadius: "50% 10%",
        }}
      >
        <div className="lg:w-1/2 w-full lg:mr-8 mr-0 z-20">
          <div className="pl-8 lg:pl-24">
            <h4 className="text-7xl font-bold"> How it works</h4>
            <div className="flex mt-20 ">
              <div className="inline-flex flex-col">
                {row.map((item) => (
                  <a
                    key={item.name}
                    onClick={(e) => onClick(item.name)}
                    className={classNames(
                      data === item.name
                        ? "bg-white text-black border-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "h-10 w-10 flex items-center cursor-pointer justify-center my-2 text-md font-medium rounded-full border border-gray-400 "
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="mx-8 ">
                <h1 className="text-xl font-semibold">
                  Choose a convinient option
                </h1>

                <div className="w-5/6">
                  {text.map((text) => (
                    <p key={text.id} className="py-2 leading-loose">
                      {text.text}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <div className="my-8 ">
              <Button className="w-36 bg-apace-orange-light border-apace-orange-light text-black mr-8">
                Try it free
              </Button>

              <Button className="w-36 border-none">Learn more</Button>
            </div>
          </div>
        </div>
        <div className="lg:w-1/2 w-full z-20">
          <div className="px-8 lg:pr-24">
            <div className="px-0">
              <Swiper
                // install Swiper modules
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={50}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                // scrollbar={{ draggable: true }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log("slide change")}
              >
                {data2.map((item: any) => (
                  <SwiperSlide key={item.id}>
                    <div>
                      <Items item={item} />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
      {/* container strart */}
    </div>
  );
};

export default HowItWorks;
