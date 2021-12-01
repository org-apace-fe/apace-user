import router from "next/router";
import Button from "./button";
import Container from "./container";

const WhyApace = () => {
  return (
    <div className="relative w-full bg-apace-black text-white py-24">
      <div
        className="bg-apace-gray lg:pb-28 lg:pt-28 lg:py-8 py-16 lg:px-12 relative "
        style={{
          borderTopLeftRadius: "50% 10% ",
          borderTopRightRadius: "50% 10%",
          borderBottomLeftRadius: "50% 10% ",
          borderBottomRightRadius: "50% 10%",
        }}
      >
        <Container>
          <div
            style={{
              background: "rgba(255, 255, 255, 0.09)",
            }}
            className="lg:mx-32 py-6"
          >
            <div className="flex justify-center items-center mx-2">
              <h1 className="lg:text-7xl text-5xl font-black text-center">
                Why Apace?
              </h1>
              <div className="ml-8">
                <Button
                  onClick={() => router.push("/auth/shopper/sign-up")}
                  className="bg-apace-orange-light border-apace-orange-light text-black"
                >
                  Learn more
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default WhyApace;
