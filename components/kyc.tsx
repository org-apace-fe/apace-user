import Button from "./button";
import Container from "./container";

const KYC = () => {
  return (
    <div className="bg-apace-black">
      <div
        className="bg-apace-gray lg:pb-32 lg:pt-32  py-0 relative text-white "
        style={{
          borderTopLeftRadius: "50% 5% ",
          borderTopRightRadius: "50% 5%",
          borderBottomLeftRadius: "50% 5% ",
          borderBottomRightRadius: "50% 5%",
        }}
      >
        <Container>
          <div className="w-full ">
            <h4 className="lg:w-3/4 mx-auto text-7xl font-black text-center">
              Your customers will thank you!
            </h4>

            <div className="flex  my-32 lg:flex-row-reverse flex-col items-center">
              <div className="lg:w-1/2 w-full lg:px-16 h-auto lg:ml-8 ml-0">
                <img
                  className="w-full h-full object-contain "
                  src="/icons/plain-picture.png"
                />
              </div>
              <div className="lg:w-1/2 w-full lg:ml-8 ml-0 lg:flex lg:flex-col flex-row  lg:items-start">
                <div className="rounded-full h-10 w-10 flex items-center justify-center border border-gray-200 lg:my-2 my-6">
                  1
                </div>
                <h4 className="text-5xl font-black lg:text-left ">
                  Know and earn the trust of your customers
                </h4>
                <div className="w-5/6 my-10 text-gray-200 lg:text-left">
                  <p>
                    Customers love to use Apace because it’s convenient, helps
                    them get whatever they want, and keep track of every spend.
                    When you integrate Apace into your checkout, you tap into
                    that big pool of trust, also getting to see real aggregate
                    details of who is shopping at your site and how.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex  my-32 lg:flex-row flex-col items-center">
              <div className="lg:w-1/2 w-full lg:px-16 h-auto lg:mr-8 mr-0">
                <img
                  className="w-full h-full object-contain "
                  src="/icons/plain-picture.png"
                />
              </div>
              <div className="lg:w-1/2 w-full lg:ml-8 ml-0 lg:flex lg:flex-col flex-row  lg:items-start">
                <div className="rounded-full h-10 w-10 flex items-center justify-center border border-gray-200 lg:my-2 my-6">
                  2
                </div>
                <h4 className="text-5xl font-black lg:text-left ">
                  Apace shoppers, your customers, faster
                </h4>
                <div className="w-5/6 my-10 text-gray-200 lg:text-left">
                  <p>
                    On our Shopper app, website, email and social channels,
                    teeming Apace shoppers are happy to find stores, deals, and
                    offers in one place, so your business is opened up to these
                    high-intent shoppers who they click through as quickly as
                    they want since payment no longer stands between them and
                    what they want.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex  my-32 lg:flex-row-reverse flex-col items-center">
              <div className="lg:w-1/2 w-full lg:px-16 h-auto lg:ml-8 ml-0">
                <img
                  className="w-full h-full object-contain "
                  src="/icons/plain-picture.png"
                />
              </div>
              <div className="lg:w-1/2 w-full lg:ml-8 ml-0 lg:flex lg:flex-col flex-row  lg:items-start">
                <div className="rounded-full h-10 w-10 flex items-center justify-center border border-gray-200 lg:my-2 my-6 ">
                  3
                </div>
                <h4 className="text-5xl font-black lg:text-left ">
                  Every channel, everywhere
                </h4>
                <div className="w-5/6 my-10 text-gray-200 lg:text-left">
                  <p>
                    On your website, a full-fledge ecommerce store, or in-store
                    or even as a storefront hosted by Apace, where each product
                    or a collection of products is a link for customers to buy
                    from, Apace has employed the right set of technology and
                    shopper experience to drive revenue and growth to your
                    business.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <div className="relative w-full bg-apace-black text-white lg:py-32 py-16 ">
        <Container>
          <div className="flex flex-col justify-center items-center">
            <div className="lg:w-1/2 md:w-4/5 w-full px-4 ">
              <img
                src="/icons/help-customer@3x.png"
                className="w-full h-full object-contain"
              />
            </div>

            <h1 className="text-7xl font-black mt-16 mb-12 text-center">
              Let’s help you sell more
            </h1>

            <Button className="my-8 px-8 bg-apace-orange-light border-apace-orange-light  text-black ">
              Get started
            </Button>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default KYC;
