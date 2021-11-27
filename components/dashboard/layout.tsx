import ApaceHead from "../head";
import { BigAIcon } from "../icons/logo";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import DashboardHeader from "./header";
import Loader from "../loader";
import Toast from "../toast";

type MyComponentProps = {
  children: ReactNode;
};

function DashbardLayout({ children }: MyComponentProps) {
  const router = useRouter();

  return (
    <>
      <div
        className="relative w-full mx-auto "
        style={{ maxWidth: "1440px", zIndex: 100 }}
      >
        <ApaceHead />
        <DashboardHeader />
        <Loader />
        <Toast />
        <main className="w-full  mx-auto min-h-screen ">{children}</main>
      </div>
    </>
  );
}

export default DashbardLayout;
