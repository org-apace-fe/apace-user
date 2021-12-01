import Container from "./container";

const CallToAction = () => {
  return (
    <div className="relative bg-apace-black text-white min-h-full pt-8 pb-24 overflow-hidden ">
      <Container>
        <div className="lg:w-full md:w-5/6 w-full mx-auto flex flex-col justify-center text-center items-center">
          <h4 className="text-7xl font-black my-8 lg:w-4/6 w-full ">
            Shop your favorite categories
          </h4>

          <div className=" pt-16 pb-8 w-full  ">
            <div className="lg:grid grid-cols-6 gap-5 flex-col ">
              <div className="col-span-2 h-80 rounded-xl relative overflow-hidden bg-apace-black opacity-95 lg:mb-0 mb-6 ">
                <div className="absolute top-0 left-0 w-full h-full  ">
                  <img
                    src="/icons/apparel.png"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p
                  className="absolute bottom-0 left-0 text-2xl font-medium m-3 "
                  style={{ zIndex: 100 }}
                >
                  Apparel
                </p>
              </div>
              <div className="col-span-2 h-80 rounded-xl relative overflow-hidden bg-apace-black opacity-95 lg:mb-0 mb-6">
                <div className="absolute top-0 left-0 w-full h-full  ">
                  <img
                    src="/icons/auto.png"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p
                  className="absolute bottom-0 left-0 text-2xl font-medium m-3 "
                  style={{ zIndex: 100 }}
                >
                  Auto
                </p>
              </div>
              <div className="col-span-2 h-80 rounded-xl relative overflow-hidden bg-apace-black opacity-95 lg:mb-0 mb-6">
                <div className="absolute top-0 left-0 w-full h-full  ">
                  <img
                    src="/icons/beauty.png"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p
                  className="absolute bottom-0 left-0 text-2xl font-medium m-3 "
                  style={{ zIndex: 100 }}
                >
                  Beauty
                </p>
              </div>
              <div className="col-span-3 h-80 rounded-xl relative overflow-hidden bg-apace-black opacity-95 lg:mb-0 mb-6">
                <div className="absolute top-0 left-0 w-full h-full  ">
                  <img
                    src="/icons/electronics.png"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p
                  className="absolute bottom-0 left-0 text-2xl font-medium m-3 "
                  style={{ zIndex: 100 }}
                >
                  Electronics
                </p>
              </div>
              <div className="col-span-3 h-80 rounded-xl relative overflow-hidden bg-apace-black opacity-95 lg:mb-0 mb-6">
                <div className="absolute top-0 left-0 w-full h-full  ">
                  <img
                    src="/icons/fitness.png"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p
                  className="absolute bottom-0 left-0 text-2xl font-medium m-3 "
                  style={{ zIndex: 100 }}
                >
                  Fitness
                </p>
              </div>
              <div className="col-span-2 h-80 rounded-xl relative overflow-hidden bg-apace-black opacity-95 lg:mb-0 mb-6">
                <div className="absolute top-0 left-0 w-full h-full  ">
                  <img
                    src="/icons/furniture.png"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p
                  className="absolute bottom-0 left-0 text-2xl font-medium m-3 "
                  style={{ zIndex: 100 }}
                >
                  Home & Furniture
                </p>
              </div>
              <div className="col-span-2 h-80 rounded-xl relative overflow-hidden bg-apace-black opacity-95 lg:mb-0 mb-6">
                <div className="absolute top-0 left-0 w-full h-full  ">
                  <img
                    src="/icons/luxury.png"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p
                  className="absolute bottom-0 left-0 text-2xl font-medium m-3 "
                  style={{ zIndex: 100 }}
                >
                  Luxury{" "}
                </p>
              </div>
              <div className="col-span-2 h-80 rounded-xl relative overflow-hidden bg-apace-black opacity-95 lg:mb-0 mb-6">
                <div className="absolute top-0 left-0 w-full h-full  ">
                  <img
                    src="/icons/travel.png"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p
                  className="absolute bottom-0 left-0 text-2xl font-medium m-3 "
                  style={{ zIndex: 100 }}
                >
                  Travel
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* container strart */}
    </div>
  );
};

export default CallToAction;

2233222;
