import { IStore, ITopDealStore } from "../../interfaces/items.enum";
import { SkeletonLoader } from "../skeleton";

type AllStoreProps = {
  items: IStore[];
  loading: boolean;
};

export function AllStore({ items, loading }: AllStoreProps) {
  return (
    <div className="relative w-full bg-apace-black text-white min-h-screen py-8 font-body">
      <div className="flex flex-1 lg:flex-row flex-col   items-start  flex-wrap">
        {!loading ? (
          items?.map((item: IStore) => (
            <>
              <div key={item.store_name} className="lg:w-1/5 w-full p-2">
                <div className="w-full text-white">
                  <div
                    style={{
                      backgroundImage: `url(${item.store_logo})`,
                      backgroundSize: "cover",
                      backgroundPosition: "top",
                    }}
                    className="relative w-full h-60 rounded-lg  font-bold "
                  >
                    <div className="w-full h-full bg-apace-black opacity-40"></div>
                    <div className="absolute bottom-3 left-2 w-16 h-14 rounded-md overflow-hidden  z-30 ">
                      <img
                        className=" object-cover "
                        src={item.feature_image}
                        alt="Picture of the author"
                      />
                    </div>
                  </div>
                </div>
                <p className="my-1"> {item.store_name} </p>
              </div>
            </>
          ))
        ) : (
          <>
            <SkeletonLoader />
          </>
        )}
      </div>
    </div>
  );
}

type TopDealStoreProps = {
  items: ITopDealStore[];
  loading: boolean;
};

export function TopDealstore({ items, loading }: TopDealStoreProps) {
  console.log(items);

  return (
    <div className="relative w-full bg-apace-black text-white min-h-screen py-8 font-body">
      <div className="flex flex-1 lg:flex-row flex-col  items-start  flex-wrap">
        {!loading ? (
          items?.map((item: ITopDealStore) => (
            <>
              <div key={item.store_name} className="lg:w-1/5 w-full p-2">
                <div className="w-full text-white">
                  <div
                    key={item.id}
                    style={{
                      backgroundImage: `url(${item.store_logo})`,
                      backgroundSize: "cover",
                      backgroundPosition: "top",
                    }}
                    className="relative w-full h-60 rounded-lg   "
                  >
                    <div className="w-full h-full bg-apace-black opacity-40"></div>
                    <div className="absolute top-0 right-0 p-2 z-30">
                      <p className="uppercase text-sm  "> Up to </p>
                      <p className="text-4xl font-bold">
                        {item.deal_percentage * 100}%
                      </p>
                      <span className="text-sm uppercase "> off </span>
                    </div>
                    <div className="absolute bottom-3 left-2 w-16 h-14 rounded-md overflow-hidden z-30 ">
                      <img
                        src={item.feature_image}
                        alt="Picture of the author"
                      />
                    </div>
                  </div>
                  <div className="mt-2">
                    <p>{item.store_name} </p>
                    <p className=" font-black"> {item.deal_name} </p>
                  </div>
                </div>
              </div>
            </>
          ))
        ) : (
          <>
            <SkeletonLoader />
          </>
        )}
      </div>
    </div>
  );
}

export function FeaturedStore({ items, loading }: TopDealStoreProps) {
  return (
    <div className="relative w-full bg-apace-black text-white min-h-screen py-8 font-body">
      <div className="flex flex-1 lg:flex-row flex-col items-start  flex-wrap">
        {!loading ? (
          items?.map((item: ITopDealStore) => (
            <div key={item.store_name} className="lg:w-1/5 w-full p-2">
              <div className="w-full text-white">
                <div
                  style={{
                    backgroundImage: `url(${item.store_logo})`,
                    backgroundSize: "cover",
                    backgroundPosition: "top",
                  }}
                  className="relative w-full h-60 rounded-lg  font-bold "
                >
                  <div className="w-full h-full bg-apace-black opacity-40"></div>
                  <div className="absolute bottom-3 left-2 w-16 h-14 rounded-md overflow-hidden  z-30 ">
                    <img src={item.feature_image} alt="Picture of the author" />
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <>
            <SkeletonLoader />
          </>
        )}
      </div>
    </div>
  );
}
