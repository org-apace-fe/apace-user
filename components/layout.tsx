import type { AppProps } from "next/app";
import Header from "./header";
import Footer from "./footer";
import ApaceHead from "./head";

function Layout({ children }: any) {
  return (
    <>
      <div
        className="relative w-full font-body mx-auto"
        style={{ maxWidth: "1440px", zIndex: 100 }}
      >
        <ApaceHead />
        <Header />
        <main className="w-full  mx-auto min-h-screen ">{children}</main>
        <Footer />
      </div>
    </>
  );
}

export default Layout;
