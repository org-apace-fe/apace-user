import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { SearchIcon } from "@heroicons/react/outline";
import { background } from "../../utils/background";
import {
  LoadingStart,
  LoadingStop,
} from "../../store/actions/loader/loaderActions";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Select from "react-select";

export default function SearchBar({ children, src, href }: any) {
  const router = useRouter();
  const dispatch = useDispatch();

  const [storeName, setStoreName] = useState<string>("");
  const [store, setStore] = useState<any>();
  const [status, setStatus] = useState(false);
  const auth = useSelector((state: any) => state.auth);
  const isAuthenticated = auth.isAuthenticated;
  const profile = useSelector((state: any) => state.auth);
  const personalInfo = profile?.user?.data?.peronal_info;

  const handleSearchChange = (e: any) => {
    setStoreName(e.target.value);
    // seStatus(true);
  };

  useEffect(() => {
    if (storeName.length > 2) {
      getStore(storeName);
      setStatus(true);
    } else {
      setStatus(false);
    }
  }, [storeName]);

  const getStore = async (name: any) => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const headersRequest = {
      Authorization: `Bearer ${token}`,
      "auth-key": `${process.env.NEXT_PUBLIC_ENV_AUTH_KEY}`,
      _auth: `${process.env.NEXT_PUBLIC_ENV_AUTH_KEY_AUTH2}`,
    };
    dispatch(LoadingStart());
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_ENV_API_AUTH_URL}/api/v1/store/all?Name=${name}`,
        { headers: headersRequest }
      );

      setStore(res?.data);

      dispatch(LoadingStop());
    } catch (error) {
      dispatch(LoadingStop());
    }
  };

  return (
    <div className="hidden md:block w-3/6">
      <form className="w-full relative">
        <div className="flex flex-row-reverse relative ">
          <input
            style={{ background: background.apacegray2 }}
            className="py-2 pl-10 pr-4 w-full text-white rounded-full  outline-none "
            placeholder="Search your favourite stores"
            value={storeName}
            onChange={handleSearchChange}
          />
          <div className="absolute " style={{ top: "0.5rem", left: "0.6rem" }}>
            <SearchIcon className="h-6 w-6 text-white" aria-hidden="true" />
          </div>
        </div>
        <div
          className={`absolute w-full overflow-x-auto lg:w-full ${
            status ? "" : "hidden"
          }`}
          style={{ zIndex: 100, background: background.apacegray2 }}
        >
          <div
            onClick={() => setStatus(false)}
            style={{ zIndex: 100 }}
            className="absolute top-2 right-4  bg-apace-orange-dark  rounded-full w-6 h-6 text-center cursor-pointer "
          >
            {" "}
            X
          </div>
          <div className=" flex flex-1 lg:flex-row px-4  items-start flex-wrap min-w-lg lg:min-w-max">
            {store?.items?.map((store: any) => {
              return (
                <div className="w-1/4 mr-4">
                  <Link
                    href={`${process.env.NEXT_PUBLIC_ENV_STORE_BASE_URL}${
                      store.store_name
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
                      key={store.store_name}
                      className=" w-full p-2"
                    >
                      <div className="w-full text-white">
                        <div
                          style={{
                            backgroundImage: `url(${store.store_logo})`,
                            backgroundSize: "cover",
                            backgroundPosition: "top",
                          }}
                          className="relative w-full h-24 rounded-lg  font-bold "
                        >
                          <div className="w-full h-full bg-apace-black opacity-40"></div>
                          <div className="absolute bottom-3 left-2 w-8 h-7 rounded-md overflow-hidden  z-30 ">
                            <img
                              className=" object-cover "
                              src={store.feature_image}
                              alt="Picture of the author"
                            />
                          </div>
                        </div>
                      </div>
                      <p className="my-1 text-white"> {store.store_name} </p>
                    </a>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </form>
    </div>
  );
}
