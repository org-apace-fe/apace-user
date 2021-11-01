import type { AppProps } from "next/app";
import Header from "./header";
import Footer from "./footer";
import ApaceHead from "./head";

function Layout({ children }: any) {
  return (
    <>
      <div className="relative bg-gray-100 w-full font-body">
        <ApaceHead />
        <Header />

        <main className="w-full  mx-auto min-h-screen ">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}

export default Layout;
