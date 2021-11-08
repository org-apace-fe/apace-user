import Button from "./button";
import Container from "./container";

function ApaceApp() {
  return (
    <>
      <div className="bg-apace-black text-white lg:pb-16 lg:pt-16 py-0 relative">
        <Container>
          <div className="flex lg:flex-row-reverse flex-col items-center">
            <div className="lg:w-1/2 w-full lg:ml-8 ml-0">
              <img className="w-full " src="/icons/apaceapp@3x.png" />
            </div>
            <div className="lg:w-1/2 w-full lg:mr-8 mr-0 lg:flex lg:flex-col flex-row mt-8 lg:mt-0">
              <h4 className="text-7xl font-bold  ">Shop the entire catalog!</h4>
              <h4 className="text-7xl font-bold text-apace-orange-dark ">
                even easier
              </h4>
              <div className="w-5/6 my-10 text-gray-200">
                <p>
                  We’re making it even easier, as quickly as you can tap, to
                  shop at thousands of favorite brands — online or in-store.
                </p>
              </div>
              <div className="my-8 ">
                <label className="block mb-2 lg:ml-4">
                  Coming soon. Keep me informed
                </label>

                <div className="relative lg:w-10/12 w-full">
                  <input
                    placeholder="Email address"
                    className="bg-transparent border border-gray-100 py-3  pl-4 w-full rounded-full outline-none"
                  />
                  <Button
                    className="absolute  bg-apace-orange-light border-apace-orange-light text-black font-semibold"
                    style={{ top: "-0.6rem", right: "0.4rem" }}
                  >
                    Let me know
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}

export default ApaceApp;
