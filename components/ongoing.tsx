import Container from "./container";
import Image from "next/image";

type OngoinProps = {
  pictureUrl: string;
  background: string;
};

const Ongoing = ({ pictureUrl, background }: OngoinProps) => {
  return (
    <div className="relative w-full bg-apace-black text-white py-24">
      <div
        className="bg-apace-gray lg:pb-32 lg:pt-32 py-0 lg:px-12 relative flex lg:flex-row flex-col items-center "
        style={{
          borderTopLeftRadius: "50% 10% ",
          borderTopRightRadius: "50% 10%",
          borderBottomLeftRadius: "50% 10% ",
          borderBottomRightRadius: "50% 10%",
        }}
      >
        <Container>
          <div className="flex flex-col justify-center items-center rounded-xl overflow-hidden ">
            <div
              style={{ background }}
              className="lg:w-full md:w-4/5 w-full lg:p-24 "
            >
              <Image
                src={pictureUrl}
                className=" object-contain"
                height={454}
                width={944}
              />
            </div>

            <div className="bg-apace-black lg:p-24 py-8">
              <h1 className="text-7xl font-black mt-4 mb-8 text-center">
                We’ve made shopping easier for you
              </h1>

              <p className="text-center lg:w-4/6 w-full mx-auto text-lg ">
                On our website, app, emails, and social channels, we’re exposing
                products, deals and exclusive offers from approved stores to
                shoppers, making it easy for you to select your choice and
                proceed to pay. We’re continuing to add more of your favorite
                stores to our network, making sure you can always
                <span className="text-apace-orange-light"> #useApace </span>
                wherever you shop your best.
              </p>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Ongoing;
