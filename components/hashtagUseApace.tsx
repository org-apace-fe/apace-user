import Container from "./container";

function HashTagUseApace({ children }: any) {
  return (
    <>
      <div className="bg-black h-96 lg:h-screen text-white flex justify-center items-center">
        <Container>
          <p className="text-4xl md:text-7xl lg:text-8xl font-black text-yellow-600">
            {" "}
            #useApace{" "}
          </p>
        </Container>
      </div>
    </>
  );
}

export default HashTagUseApace;
