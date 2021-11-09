import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Container from "./container";
import { Items } from "./caurosel-items";
import Button from "./button";
// import Swiper JS
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { BigAIcon } from "./icons/logo";

const CustomerRatings = () => {
  return (
    <div className="relative bg-apace-black text-white min-h-full pt-8 pb-24 overflow-hidden ">
      <Container>
        <div className="lg:w-4/6 md:w-5/6 w-full mx-auto flex flex-col justify-center text-center items-center">
          <h4 className="text-7xl font-bold my-8 ">
            Let’s drive new customers to you!
          </h4>
          <p className="text-xl text-center my-2 ">
            And, yes, let’s also make you repeat customers. Shoppers love the
            ultimate flexibility that Apace offers, and they keep coming back
            for more.
          </p>

          <div className=" pt-16 pb-8 w-full  ">
            <div className="flex flex-1 lg:flex-row flex-col justify-center items-center flex-wrap ">
              <div className="flex flex-col justify-center items-center lg:w-1/3 md:w-1/3 w-1/2 my-3 ">
                <h1 className="text-5xl font-bold text-apace-orange-dark">
                  +83%
                </h1>
                <p className="leading-loose text-center">
                  Increase in average order value (AOV) reported
                </p>
              </div>
              <div className="flex flex-col justify-center items-center lg:w-1/3 md:w-1/3 w-1/2 my-3 ">
                <h1 className="text-5xl font-bold text-apace-orange-dark">
                  35%
                </h1>
                <p className="leading-loose text-center">
                  Increase in conversion of new customers
                </p>
              </div>
              <div className="flex flex-col justify-center items-center lg:w-1/3 md:w-1/3 w-1/2 my-3 ">
                <h1 className="text-5xl font-bold text-apace-orange-dark">
                  +26%
                </h1>
                <p className="leading-loose text-center">
                  Up to 26% repeat purchase rate, customers come back for more.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* container strart */}
    </div>
  );
};

export default CustomerRatings;
