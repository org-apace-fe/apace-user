import { IStore, ITopDealStore } from "../../interfaces/items.enum";
import { SkeletonLoader } from "../skeleton";
import Link from "next/link";
import { useSelector } from "react-redux";

type AllStoreProps = {
  items: IStore[];
  loading: boolean;
  personalInfo: any;
};

export function AllStore({
  items,
  loading,
  personalInfo,
}: Partial<AllStoreProps>) {
  const auth = useSelector((state: any) => state.auth);
  const isAuthenticated = auth.isAuthenticated;
  return (
    <div className="relative w-full bg-apace-black text-white min-h-screen py-8 font-body">
      <div className="flex flex-1 lg:flex-row flex-col   items-start  flex-wrap">
        {!loading ? (
          items?.map((item: IStore) => (
            <>
              <Link
                href={`${process.env.NEXT_PUBLIC_ENV_STORE_BASE_URL}${
                  item.store_name
                }${
                  !isAuthenticated
                    ? ""
                    : `?identifier=${
                        personalInfo?.email_address ||
                        personalInfo?.mobile_number
                      }`
                }  `}
              >
                <a
                  target="_blank"
                  key={item.store_name}
                  className="lg:w-1/5 w-full p-2"
                >
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
                </a>
              </Link>
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
  personalInfo: any;
};

export function TopDealstore({
  items,
  loading,
  personalInfo,
}: Partial<TopDealStoreProps>) {
  const auth = useSelector((state: any) => state.auth);
  const isAuthenticated = auth.isAuthenticated;
  return (
    <div className="relative w-full bg-apace-black text-white min-h-screen py-8 font-body">
      <div className="flex flex-1 lg:flex-row flex-col  items-start  flex-wrap">
        {!loading ? (
          items?.map((item: ITopDealStore) => (
            <>
              <Link
                href={`${process.env.NEXT_PUBLIC_ENV_STORE_BASE_URL}${
                  item.store_name
                }${
                  !isAuthenticated
                    ? ""
                    : `?identifier=${
                        personalInfo?.email_address ||
                        personalInfo?.mobile_number
                      }`
                }  `}
              >
                <a
                  target="_blank"
                  key={item.store_name}
                  className="lg:w-1/5 w-full p-2"
                >
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
                </a>
              </Link>
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

export function FeaturedStore({
  items,
  loading,
  personalInfo,
}: Partial<TopDealStoreProps>) {
  const auth = useSelector((state: any) => state.auth);
  const isAuthenticated = auth.isAuthenticated;
  return (
    <div className="relative w-full bg-apace-black text-white min-h-screen py-8 font-body">
      <div className="flex flex-1 lg:flex-row flex-col items-start  flex-wrap">
        {!loading ? (
          items?.map((item: ITopDealStore) => (
            <Link
              href={`${process.env.NEXT_PUBLIC_ENV_STORE_BASE_URL}${
                item.store_name
              }${
                !isAuthenticated
                  ? ""
                  : `?identifier=${
                      personalInfo?.email_address || personalInfo?.mobile_number
                    }`
              }  `}
            >
              <a
                target="_blank"
                key={item.store_name}
                className="lg:w-1/5 w-full p-2"
              >
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
                        src={item.feature_image}
                        alt="Picture of the author"
                      />
                    </div>
                  </div>
                </div>
              </a>
            </Link>
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
