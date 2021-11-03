import Button from "./button";
import Container from "./container";

function Invite() {
  return (
    <>
      <div
        className="bg-apace-gray text-white lg:pb-32 lg:pt-32  py-0  relative flex lg:flex-row flex-col items-center mt-32 mb-16"
        style={{
          borderTopLeftRadius: "50% 10% ",
          borderTopRightRadius: "50% 10%",
          borderBottomLeftRadius: "50% 10% ",
          borderBottomRightRadius: "50% 10%",
        }}
      >
        <Container>
          <div className="flex items-center">
            <div className="lg:w-1/2 w-full lg:ml-8 ml-0">
              <h4 className="text-7xl font-black">
                The most sense for your money.
              </h4>

              <div className="w-5/6 my-10">
                <p>
                  Apace gives you ample time to pay — starting from 16 weeks —
                  with a low, simple interest.
                </p>
              </div>

              <div className="my-8 ">
                <Button className="w-36 bg-apace-orange-light border-apace-orange-light text-black mr-8">
                  Try it free
                </Button>

                <Button className="w-36 border-none">Learn more</Button>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}

export default Invite;
