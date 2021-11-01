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

        <main className="w-full py-8 px-8 sm:px-6 lg:px-32 mx-auto min-h-screen my-12">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}

export default Layout;
