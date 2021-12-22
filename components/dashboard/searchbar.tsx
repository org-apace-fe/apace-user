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
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

export default function SearchBar({ children, src, href }: any) {
  const router = useRouter();
  const dispatch = useDispatch();

  const [storeName, setStoreName] = useState<string>("");
  const [store, setStore] = useState<any>();

  const handleSearchChange = (e: any) => {
    setStoreName(e.target.value);
    // seStatus(true);
  };

  useEffect(() => {
    if (storeName.length > 2) {
      getStore(storeName);
      // setTags({ tags: otherUserTags });
    }
  }, [storeName]);

  const getStore = async (storename: any) => {
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
        `${process.env.NEXT_PUBLIC_ENV_API_AUTH_URL}/api/v1/store/view/product/${storename}`,
        { headers: headersRequest }
      );

      setStore(res?.data);
      console.log("====================================");
      console.log(store);
      console.log("====================================");
      dispatch(LoadingStop());
    } catch (error) {
      dispatch(LoadingStop());
    }
  };

  return (
    <div className="hidden md:block w-3/6">
      <form className="w-full">
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
      </form>
    </div>
  );
}
