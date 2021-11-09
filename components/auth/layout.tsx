import type { AppProps } from "next/app";

import ApaceHead from "../head";
import { BigAIcon } from "../icons/logo";
import AuthHeader from "./header";
import { useRouter } from "next/router";

function AuthLayout({ children }: any) {
  const router = useRouter();

  return (
    <>
      <div
        className="relative bg-apace-black text-white w-full font-body mx-auto overflow-hidden pb-16 "
        style={{ maxWidth: "1440px" }}
      >
        <ApaceHead />
        <AuthHeader />
        <div className="absolute " style={{ bottom: "-15em", right: "-15em" }}>
          <BigAIcon />
        </div>

        <main className="w-full relative mx-auto min-h-screen flex flex-col py-12 items-center z-50 px-9">
          <div className="mb-12">
            <h1 className="text-6xl font-bold">
              {" "}
              {router.pathname !== "/auth/sign-in"
                ? "Create an account"
                : "Sign in"}{" "}
            </h1>
          </div>

          <div
            className={`flex justify-center items-center mb-8 text-gray-400 ${
              router.pathname === "/auth/sign-in" ? "hidden" : ""
            }  `}
          >
            <div>
              <span
                className={`${
                  router.pathname === "/auth/signup-options"
                    ? "bg-apace-orange-dark"
                    : " bg-gray-400"
                } py-1 px-3 rounded-full mr-2 text-center text-white`}
              >
                1
              </span>
              Select an option
            </div>
            <div className=" border border-gray-600 px-5 mx-3"> </div>

            <div>
              <span
                className={`${
                  router.pathname !== "/auth/signup-options"
                    ? "bg-apace-orange-dark"
                    : " bg-gray-400"
                } py-1 px-3 rounded-full mr-2 text-center text-white`}
              >
                2
              </span>
              More Information
            </div>
          </div>

          {children}
        </main>
      </div>
    </>
  );
}

export default AuthLayout;
