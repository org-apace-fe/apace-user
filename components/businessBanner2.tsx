import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Container from "./container";
import { Items } from "./caurosel-items";
import Button from "./button";
// import Swiper JS
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { BigAIcon } from "./icons/logo";

const WhateverYouSell: NextPage = () => {
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
            <h4 className="text-7xl font-black"> Whatever you sell,</h4>
            <h4 className="text-7xl font-black text-apace-orange-dark">
              sell more
            </h4>

            <div className="w-5/6 my-10">
              <p>
                When you give shoppers flexible payment options, you attract
                more of them, and they buy more from you. It’s really easy with
                Apace.
              </p>
            </div>

            <div className="my-8 ">
              <Button className="w-36 font-semibold bg-apace-orange-light border-apace-orange-light text-black mr-8">
                Get started now
              </Button>
            </div>
          </div>

          <div className="lg:w-1/2 w-full px-16 ">
            <img
              className="w-full h-full object-contain"
              src="/icons/headphones@3x.png"
            />
          </div>
        </div>
      </Container>

      <div
        className="bg-apace-gray lg:pb-32 lg:pt-32  py-0  relative flex lg:flex-row flex-col justify-center items-center mt-32 mb-16"
        style={{
          borderTopLeftRadius: "50% 10% ",
          borderTopRightRadius: "50% 10%",
          borderBottomLeftRadius: "50% 10% ",
          borderBottomRightRadius: "50% 10%",
        }}
      >
        <Container>
          <div className="flex flex-col justify-center items-center">
            <h4 className="text-7xl font-bold"> Your peers sell more</h4>
            <h4 className="text-7xl font-bold text-apace-orange-dark">
              with Apace
            </h4>

            <div className=" pt-16 pb-8  w-full  ">
              <div className="flex flex-1 justify-center items-center flex-wrap ">
                <div className="lg:w-1/6 md:w-1/3 w-1/2 my-1 ">
                  <img src="./icons/peers/nike.svg" className="mx-auto" />
                </div>
                <div className="lg:w-1/6 md:w-1/3 w-1/2 my-1 ">
                  <img src="./icons/peers/adidas.svg" className="mx-auto" />
                </div>
                <div className="lg:w-1/6 md:w-1/3 w-1/2 my-1 ">
                  <img
                    src="./icons/peers/playstation.svg"
                    className="mx-auto"
                  />
                </div>
                <div className="lg:w-1/6 md:w-1/3 w-1/2 my-1 ">
                  <img src="./icons/peers/logitech.svg" className="mx-auto" />
                </div>
                <div className="lg:w-1/6 md:w-1/3 w-1/2 my-1 ">
                  <img
                    src="./icons/peers/urban-outfitters.svg"
                    className="mx-auto"
                  />
                </div>
                <div className="lg:w-1/6 md:w-1/3 w-1/2 my-1 ">
                  <img
                    src="./icons/peers/officine-panerai-firenze.svg"
                    className="mx-auto"
                  />
                </div>
                <div className="lg:w-1/6 md:w-1/3 w-1/2 my-1 ">
                  <img src="./icons/peers/beats.svg" className="mx-auto" />
                </div>
                <div className="lg:w-1/6 md:w-1/3 w-1/2 my-1 ">
                  <img src="./icons/peers/vans.svg" className="mx-auto" />
                </div>
                <div className="lg:w-1/6 md:w-1/3 w-1/2 my-1 ">
                  <img src="./icons/peers/samsung.svg" className="mx-auto" />
                </div>
                <div className="lg:w-1/6 md:w-1/3 w-1/2 my-1 ">
                  <img
                    src="./icons/peers/birkenstock.svg"
                    className="mx-auto"
                  />
                </div>
                <div className="lg:w-1/6 md:w-1/3 w-1/2 my-1 ">
                  <img src="./icons/peers/etsy.svg" className="mx-auto" />
                </div>
                <div className="lg:w-1/6 md:w-1/3 w-1/2 my-1 ">
                  <img src="./icons/peers/jbl.svg" className="mx-auto" />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* container strart */}
    </div>
  );
};

export default WhateverYouSell;
