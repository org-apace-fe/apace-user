import Button from "./button";
import Container from "./container";

const SeeHow = () => {
  return (
    <div className="relative w-full bg-apace-black text-white py-24">
      <div
        className="bg-apace-gray lg:pb-28 lg:pt-28 py-8 lg:px-12 relative "
        style={{
          borderTopLeftRadius: "50% 10% ",
          borderTopRightRadius: "50% 10%",
          borderBottomLeftRadius: "50% 10% ",
          borderBottomRightRadius: "50% 10%",
        }}
      >
        <Container>
          <div className="flex flex-col justify-center items-center  ">
            <h1 className="text-7xl font-bold text-center">
              See how Apace works
            </h1>
            <div className="mt-8">
              <Button className="bg-apace-orange-light border-apace-orange-light font-bold text-black">
                #useApace
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default SeeHow;
