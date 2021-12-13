import Container from "./container";
import Image from "next/image";

const Demo = () => {
  return (
    <div className="bg-apace-black relative w-full">
      <Container>
        <div className="flex flex-col items-center justify-center">
          <div className=" lg:mx-96 md:mx-36 ">
            <Image src="/icons/demo@3x.png" height={1013} width={502} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Demo;
