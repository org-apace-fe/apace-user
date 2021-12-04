import Button from "./button";
import Container from "./container";
import { useRouter } from "next/router";

// import Swiper JS
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
// import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useEffect } from "react";

import {
  FeaturedStore,
  ShopCategory,
  TopDeals,
} from "./favourite-stores-items";

import { ICategory, ITopDealStore } from "../interfaces/items.enum";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCategories,
  getAllFeaturedStores,
  getAllTopDealsStores,
} from "../store/actions/apaceStore.action";

const FavouriteStores = () => {
  const router = useRouter();

  const dispatch = useDispatch();

  const stores = useSelector((state: any) => state.stores);
  const loader = useSelector((state: any) => state.loader);
  const loading = loader?.LoaderOpened;
  const allFeaturedStores = stores.featuredStores?.items;
  const allTopDealsStores = stores.topDealsStores?.items;
  const allCategories = stores.allCategories?.data;

  useEffect(() => {
    dispatch(getAllFeaturedStores());
    dispatch(getAllTopDealsStores());
    dispatch(getAllCategories());
  }, []);

  const breakPoints = {
    481: {
      slidesPerView: 2,
      spaceBetween: 20,
    },

    769: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1025: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
  };

  return (
    <div className="relative w-full bg-apace-black text-white min-h-screen py-8">
      <Container>
        <div>
          <h1 className="text-7xl font-black ">Your favorite stores</h1>
          <h1 className="text-7xl font-black text-apace-orange-dark">
            use Apace.
          </h1>
          <p className="text-gray-200 leading-loose my-6 lg:w-1/2 w-full ">
            Find stores where you can use Apace at checkout and spread your
            payments across 16 weeks, online and in-store.
          </p>
        </div>

        <section>
          <div className="mb-4">
            <p className="inline mr-4 text-xl font-normal ">Top Deal</p>
            <Button
              onClick={() => router.push("/stores")}
              className="border-apace-orange-light text-apace-orange-light"
            >
              View All
            </Button>
          </div>

          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            breakpoints={breakPoints}
            pagination={{ clickable: true }}
          >
            {allTopDealsStores?.map((item: ITopDealStore) => (
              <SwiperSlide key={item.id}>
                <div className=" h-96" style={{ height: "26rem" }}>
                  <TopDeals item={item} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
        <section>
          <div className="mb-4">
            <p className="inline mr-4 text-xl font-normal ">Featued stores</p>
            <Button
              onClick={() => router.push("/stores")}
              className="border-apace-orange-light text-apace-orange-light"
            >
              View All
            </Button>
          </div>

          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            breakpoints={breakPoints}
            pagination={{ clickable: true }}
          >
            {allFeaturedStores?.map((item: ITopDealStore) => (
              <SwiperSlide key={item.id}>
                <div className=" h-96" style={{ height: "23rem" }}>
                  <FeaturedStore item={item} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
        <section>
          <div className="mb-4">
            <p className="inline mr-4 text-xl font-normal ">Shop by category</p>
            <Button
              onClick={() => router.push("/stores")}
              className="border-apace-orange-light text-apace-orange-light"
            >
              View All
            </Button>
          </div>

          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={breakPoints}
            navigation
            pagination={{ clickable: true }}
          >
            {allCategories?.map((item: ICategory) => (
              <SwiperSlide key={item.id}>
                <div className=" h-96" style={{ height: "23rem" }}>
                  <ShopCategory item={item} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      </Container>
    </div>
  );
};

export default FavouriteStores;
