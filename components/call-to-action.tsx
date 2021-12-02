import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ICategory } from "../interfaces/items.enum";
import { getAllCategories } from "../store/actions/apaceStore.action";
import Container from "./container";
import Link from "next/link";
import Loader from "./loader";

const CallToAction = () => {
  const dispatch = useDispatch();

  const stores = useSelector((state: any) => state.stores);
  const loading = useSelector((state: any) => state.loading);
  const allCategories = stores.allCategories?.data;

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  return (
    <div className="relative bg-apace-black text-white min-h-full pt-8 pb-24 overflow-hidden ">
      <Container>
        {!loading ? (
          <div className="lg:w-full md:w-5/6 w-full mx-auto flex flex-col justify-center text-center items-center">
            <h4 className="text-7xl font-black my-8 lg:w-4/6 w-full ">
              Shop your favorite categories
            </h4>

            <div className=" pt-16 pb-8 w-full  ">
              <div className="lg:grid grid-cols-6 gap-5 flex-col ">
                {allCategories?.map((category: ICategory, index: any) => (
                  <Link href="/stores" key={category?.id}>
                    <a
                      className={`${
                        index === 3
                          ? "col-span-3"
                          : index === 4
                          ? "col-span-3"
                          : "col-span-2"
                      }  h-80 rounded-xl relative overflow-hidden bg-apace-black opacity-95 lg:mb-0 mb-6 `}
                    >
                      <div className="absolute top-0 left-0 w-full h-full  ">
                        <img
                          src={category?.image}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p
                        className="absolute bottom-0 left-0 text-2xl font-medium m-3 "
                        style={{ zIndex: 100 }}
                      >
                        {category?.name}
                      </p>
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <Loader />
        )}
      </Container>
    </div>
  );
};

export default CallToAction;

2233222;
