import Container from "./container";

const Solution = () => {
  return (
    <div className="bg-apace-black text-white lg:pb-4 lg:pt-4 py-0 relative flex lg:flex-row flex-col items-center">
      <Container>
        <div className="relative w-full flex lg:flex-row-reverse lg:px-12 flex-col items-center ">
          <div className="lg:w-1/2 w-full lg:ml-8 ml-0">
            <h4 className="text-7xl font-black">
              Take your time{" "}
              <span className="text-apace-orange-light"> to pay </span>{" "}
            </h4>
            <div className="w-5/6 my-10">
              <p className="text-lg">
                Apace has taken that huge roadblock of pay now out of the way
                for good. Honeymoon on a lake-country? A brand new Mac for the
                job? Rent that is due now? Just{" "}
                <span className="text-apace-orange-light"> #useApace </span> to
                complete purchase. Apace takes care of the heady upfront 100%
                and gives you ample time to pay back with little interest. No
                annual fees, no random charges. You always know and can track
                exactly how much you owe and that's all you pay — over time.
              </p>
            </div>
          </div>

          <div className="lg:w-1/2 w-full px-0">
            <img
              className="w-full h-full object-contain"
              src="/icons/plain-picture.png"
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Solution;
