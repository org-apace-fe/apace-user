import { Swiper, SwiperSlide } from "swiper/react";
import { useState } from "react";
import Button from "../components/button";
import { Items } from "../components/caurosel-items";
import Container from "../components/container";
import { useRouter } from "next/router";

import { Navigation, Pagination, Scrollbar, A11y } from "swiper";

// import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { ArrowBack } from "../components/icons/logo";
import { IItems } from "../interfaces/items.enum";

export default function Custom404() {
  const router = useRouter();

  const items = [
    {
      id: 1,
      discount: "20%",
      photo: "/icons/headphones@3x.png",
    },
    {
      id: 2,
      discount: "5%",
      photo: "https://useapace.com/static/media/banner1.4447d8a7.png",
    },
    {
      id: 3,
      discount: "50%",
      photo: "https://useapace.com/static/media/banner2.f3d1b0b0.png",
    },
  ];

  const [data1, setData1] = useState(items);

  return (
    <div className="bg-apace-black text-white lg:py-0 py-8">
      <Container>
        <div className="relative flex lg:flex-row flex-col items-center lg:h-screen ">
          <div className="lg:w-1/2 w-full lg:ml-8 ml-0">
            <h4 className="text-7xl font-black"> Ah, ha - 404</h4>
            <h4 className="text-7xl font-black text-apace-orange-dark">
              crickets, ew
            </h4>

            <div className="w-5/6 my-10">
              <p>
                We haven't got a page matching your expectation. Sorry. Check
                and try again, or ...
              </p>
            </div>

            <div className="my-8 ">
              <Button
                className="w-44 bg-apace-orange-light border-apace-orange-light text-black mr-8 flex items-center"
                onClick={() => router.back()}
              >
                <div className="mr-2">
                  <ArrowBack />
                </div>
                Get back home
              </Button>
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
                {data1.map((item: IItems) => (
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
    </div>
  );
}
