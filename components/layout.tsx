import Header from "./header";
import Footer from "./footer";
import ApaceHead from "./head";
import { ReactNode } from "react";

type MyComponentProps = {
  children: ReactNode;
  footer: boolean;
};

function Layout({ children, footer = true }: Partial<MyComponentProps>) {
  return (
    <>
      <div
        className="relative w-full mx-auto"
        style={{ maxWidth: "1440px", zIndex: 100 }}
      >
        <ApaceHead />
        <Header />
        <main className="w-full  mx-auto min-h-screen ">{children}</main>
        {footer ? <Footer /> : null}
      </div>
    </>
  );
}

export default Layout;
