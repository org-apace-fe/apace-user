import ApaceHead from "../head";
import { BigAIcon } from "../icons/logo";
import AuthHeader from "./header";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import Loader from "../loader";
import Toast from "../toast";

type MyComponentProps = {
  children: ReactNode;
};

function AuthLayout({ children }: MyComponentProps) {
  const router = useRouter();

  return (
    <>
      <div
        className="relative bg-apace-black text-white w-full mx-auto overflow-hidden pb-16 "
        style={{ maxWidth: "1440px" }}
      >
        <ApaceHead />
        <AuthHeader />
        <Loader />
        <Toast />
        <div className="absolute " style={{ bottom: "-15em", right: "-15em" }}>
          <BigAIcon />
        </div>

        <main className="w-full relative mx-auto min-h-screen flex flex-col py-12 items-center z-50 px-9">
          {children}
        </main>
      </div>
    </>
  );
}

export default AuthLayout;
