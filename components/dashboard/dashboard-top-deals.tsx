import { IStore, ITopDealStore } from "../../interfaces/items.enum";
import { SkeletonLoader2 } from "../skeleton";

type TopDealStoreProps = {
  items: ITopDealStore[];
  loading: boolean;
};

export function DashboardTopDealstore({ items, loading }: TopDealStoreProps) {
  console.log(items);

  return (
    <>
      {!loading ? (
        items?.map((item: ITopDealStore) => (
          <>
            <div className="lg:w-1/2 w-full px-2 lg:mb-0 mb-16">
              <div key={item.store_name} className=" w-full ">
                <div className="w-full text-white">
                  <div
                    key={item.id}
                    style={{
                      backgroundImage: `url(${item.store_logo})`,
                      backgroundSize: "cover",
                      backgroundPosition: "top",
                    }}
                    className="relative w-full lg:h-40 h-80 rounded-lg   "
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
                </div>
              </div>
            </div>
          </>
        ))
      ) : (
        <>
          <SkeletonLoader2 />
        </>
      )}
    </>
  );
}

export function DashboardFeaturedStore({ items, loading }: TopDealStoreProps) {
  return (
    <div className="relative w-full bg-apace-black text-white min-h-screen py-8">
      <div className="flex flex-1 lg:flex-row flex-col  items-center flex-wrap">
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
            <SkeletonLoader2 />
          </>
        )}
      </div>
    </div>
  );
}
