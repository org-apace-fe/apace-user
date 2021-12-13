import Button from "./button";
import Container from "./container";
import { useRouter } from "next/router";
import Image from "next/image";

function Invite() {
  const router = useRouter();
  return (
    <>
      <div className="bg-apace-black py-8">
        <div
          className="bg-apace-gray text-white lg:pb-32 lg:pt-32 py-0 relative  "
          style={{
            borderTopLeftRadius: "50% 10% ",
            borderTopRightRadius: "50% 10%",
            borderBottomLeftRadius: "50% 10% ",
            borderBottomRightRadius: "50% 10%",
          }}
        >
          <Container>
            <div className="flex lg:flex-row flex-col items-center">
              <div className="lg:w-1/2 w-full h-auto lg:mr-8 mr-0">
                <Image src="/icons/invite@2x.png" width={461} height={568} />
              </div>
              <div className="lg:w-1/2 w-full lg:ml-8 ml-0 lg:flex lg:flex-col flex-row  lg:items-end">
                <h4 className="text-7xl font-black lg:text-right ">
                  The most sense for your money.
                </h4>
                <div className="w-5/6 my-10 text-gray-200 lg:text-right">
                  <p>
                    Apace gives you ample time to pay — starting from 16 weeks —
                    with a low, simple interest.
                  </p>
                </div>
                <div className="my-8 ">
                  <Button
                    onClick={() => router.push("/auth/shopper/sign-up")}
                    className="w-36 bg-apace-orange-light border-apace-orange-light text-black mr-8"
                  >
                    Try it free
                  </Button>
                  <Button
                    onClick={() => router.push("/how")}
                    className="w-36 border-none"
                  >
                    Learn more
                  </Button>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
}

export default Invite;
