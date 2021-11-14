import { ReactNode } from "react";
import { IStore, ITopProducts } from "../interfaces/items.enum";
import Container from "./container";
import { FeaturedStore } from "./favourite-stores-items";

type AllStoreProps = {
  data: IStore[];
};

function AllStores( {data} : any) {

console.log(data);


  return (
    <>
      <div className="relative w-full bg-apace-black text-white min-h-screen py-8">
        <div className="flex flex-1 lg:flex-row flex-col  items-center flex-wrap">
          {data?.map((item: IStore) => (
            <div className="lg:w-1/4 w-full p-2">
              <>
                <FeaturedStore item={item} />
                <p className="my-4"> {item.store_name} </p>
              </>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default AllStores;
