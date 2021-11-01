
function Container({ children }: any) {
  return (
    <>
      <div className="relative">
        <main className=" px-8 lg:px-32">
          {children}
        </main>
      </div>
    </>
  );
}

export default Container;
