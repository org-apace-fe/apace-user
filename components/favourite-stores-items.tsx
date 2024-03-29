import { ITopDealStore, ICategory } from "../interfaces/items.enum";
import Link from "next/link";

type ITopDealsProps = {
  item: ITopDealStore;
};

export function TopDeals({ item }: ITopDealsProps) {
  return (
    <Link
      href={`${process.env.NEXT_PUBLIC_ENV_STORE_BASE_URL}${item.store_name}`}
    >
      <a target="_blank" className="w-full text-white">
        <div
          key={item.id}
          style={{
            backgroundImage: `url(${item?.store_logo})`,
            backgroundSize: "cover",
            backgroundPosition: "top",
          }}
          className="relative w-full h-80 rounded-lg"
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
      <Link
        href={`${process.env.NEXT_PUBLIC_ENV_STORE_BASE_URL}${item?.store_name}`}
      >
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
  item: ICategory;
};

export function ShopCategory({ item }: IShopCategoryProps) {
  return (
    <div className="relative w-full text-white">
      <div
        key={item.id}
        style={{
          backgroundImage: `url(${item.image})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
        }}
        className="relative w-full h-80 rounded-lg  font-bold "
      >
        <div className="w-full h-full bg-apace-black opacity-40"></div>
        <div className="absolute bottom-2 left-2   rounded-md overflow-hidden z-30 ">
          <p className="text-2xl font-medium"> {item.name} </p>
        </div>
      </div>
    </div>
  );
}
