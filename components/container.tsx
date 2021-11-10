import { ReactNode } from "react";

type MyComponentProps = {
  children: ReactNode;
};


function Container({ children }: MyComponentProps) {
  return (
    <>
      <div className="relative">
        <main className=" px-8 lg:px-24">
          {children}
        </main>
      </div>
    </>
  );
}

export default Container;
