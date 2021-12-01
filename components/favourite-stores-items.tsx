import { IStore, ITopDealStore, ITopProducts } from "../interfaces/items.enum";
import { SkeletonLoader, SkeletonLoader2 } from "./skeleton";
import Link from "next/link";

type ITopDealsProps = {
  item: ITopDealStore;
};

export function TopDeals({ item }: ITopDealsProps) {
  return (
    <Link href={`https://apace-store.herokuapp.com/${item.store_name}`}>
      <a target="_blank" className="w-full text-white">
        <div
          key={item.id}
          style={{
            backgroundImage: `url(${item?.store_logo})`,
            backgroundSize: "cover",
            backgroundPosition: "top",
          }}
          className="relative w-full h-80 rounded-lg   "
        >
          <div className="w-full h-full bg-apace-black opacity-40"></div>
          <div className="absolute top-0 right-0 p-2 z-30">
            <p className="uppercase text-sm  "> Up to </p>
            <p className="text-4xl font-bold">
              {" "}
              {item?.deal_percentage * 100}%
            </p>
            <span className="text-sm uppercase "> off </span>
          </div>
          <div className="absolute bottom-3 left-2 w-16 h-14 rounded-md overflow-hidden z-30 ">
            <img src={item.feature_image} alt="Picture of the author" />
          </div>
        </div>
        <div className="mt-2">
          <p>{item?.store_name} </p>
          <p className=" font-medium"> {item?.deal_name} </p>
        </div>
      </a>
    </Link>
  );
}

type IFeaturedStoreProps = {
  item: ITopDealStore;
};

export function FeaturedStore({ item }: IFeaturedStoreProps) {
  return (
    <>
      <Link href={`https://apace-store.herokuapp.com/${item?.store_name}`}>
        <a target="_blank" className="w-full text-white">
          <div
            key={item.id}
            style={{
              backgroundImage: `url(${item?.store_logo})`,
              backgroundSize: "cover",
              backgroundPosition: "top",
            }}
            className="relative w-full h-80 rounded-lg  font-bold "
          >
            <div className="w-full h-full bg-apace-black opacity-40"></div>
            <div className="absolute bottom-3 left-2 w-16 h-14 rounded-md overflow-hidden  z-30 ">
              <img src={item?.feature_image} alt="Picture of the author" />
            </div>
          </div>
        </a>
      </Link>
    </>
  );
}

type IShopCategoryProps = {
  item: ITopProducts;
};

export function ShopCategory({ item }: IShopCategoryProps) {
  return (
    <div className="relative w-full text-white">
      <div
        key={item.id}
        style={{
          backgroundImage: `url(${item.photo})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
        }}
        className="relative w-full h-80 rounded-lg  font-bold "
      >
        <div className="w-full h-full bg-apace-black opacity-40"></div>
        <div className="absolute bottom-2 left-2   rounded-md overflow-hidden z-30 ">
          <p className="text-2xl font-medium"> {item.category} </p>
        </div>
      </div>
    </div>
  );
}
