import router from "next/router";
import { useEffect, useState } from "react";
import Button from "./button";
import Image from "next/image";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const HIW = () => {
  const [data, setData] = useState<number>();
  const row = [
    { id: 1, name: "Online", current: false },
    { id: 2, name: "In-store", current: false },
    { id: 3, name: "Gateway", current: false },
  ];

  const note = [
    {
      id: 1,
      photo: "/icons/business-online.png",
      data: [
        {
          id: 1,
          title: "Create an account",
          text: "It’s easy to use Apace as a Business. All you do is tell us how you want to use Apace, add a business email and password and you’re in.",
        },
        {
          id: 2,
          title: "Provide some information ",
          text: "We do require a few key compliance information from every business registered to use Apace. We will onboard and guide you through completing this as you sign up.",
        },
        {
          id: 3,
          title: "Get an auto-configured business",
          text: "As soon as you sign up, we auto-configure the look of your Portal to suit your business type. This way you can be off to the races in minutes. With Portal you can keep track of how your stores, get timely reports, and see the difference Apace can make for you.",
        },
        {
          id: 4,
          title: "Add products, publish deals, etc",
          text: "Apace integrates and works seamlessly with your in-store POS so you can get to selling as quickly as you sign up.",
        },
        {
          id: 5,
          title: "Get selling, more",
          text: "Everything you need to sell more you can find with Apace, plus we’re always here to help.",
        },
      ],
    },
    {
      id: 2,
      photo: "/icons/business-in-store.png",
      data: [
        {
          id: 1,
          title: "Create an account",
          text: "It’s easy to use Apace as a Business. All you do is tell us how you want to use Apace, add a business email and password and you’re in.",
        },
        {
          id: 2,
          title: "Provide some information ",
          text: "We do require a few key compliance information from every business registered to use Apace. We will onboard and guide you through completing this as you sign up.",
        },
        {
          id: 3,
          title: "Get an auto-configured business",
          text: "As soon as you sign up, we auto-configure the look of your Portal to suit your business type. This way you can be off to the races in minutes. With Portal you can keep track of how your stores, get timely reports, and see the difference Apace can make for you.",
        },
        {
          id: 4,
          title: "Integrate with your POS",
          text: "Apace integrates and works seamlessly with your in-store POS so you can get to selling as quickly as you sign up.",
        },
        {
          id: 5,
          title: "Get selling, more",
          text: "Everything you need to sell more you can find with Apace, plus we’re always here to help.",
        },
      ],
    },
    {
      id: 3,
      photo: "/icons/business-gate-way.png",
      data: [
        {
          id: 1,
          title: "Create an account",
          text: "It’s easy to use Apace as a Business. All you do is tell us how you want to use Apace, add a business email and password and you’re in.",
        },
        {
          id: 2,
          title: "Provide some information ",
          text: "We do require a few key compliance information from every business registered to use Apace. We will onboard and guide you through completing this as you sign up.",
        },
        {
          id: 3,
          title: "Integrate options into your gateway",
          text: "Apace Checkout is portable and can be easily integrated into your payment gateway to allow customers have a convenient pay over time option. ",
        },
        {
          id: 4,
          title: "Getting started is easy",
          text: "We’ve made it so seamless you won’t even need our docs to get started. yet both us and our docs are here for whenever you may need us..",
        },
      ],
    },
  ];

  const onClick = (e: number) => {
    setData(e);
  };

  const text = note.filter((e) => e.id === data);

  useEffect(() => {
    setData(1);
  }, []);
  return (
    <div className="bg-apace-black relative text-white lg:pb-32 lg:pt-32  pt-4 py-32 flex lg:flex-row flex-col justify-center items-center">
      <div className="lg:w-1/2 w-full lg:mr-8 mr-0 z-20">
        <div className="pl-8 lg:pl-24">
          <h4 className="text-7xl font-black"> How it works</h4>
          <div className="mt-20 ">
            <div className="inline-flex flex-row">
              {row.map((item) => (
                <Button
                  key={item.name}
                  onClick={(e) => onClick(item.id)}
                  className={classNames(
                    data === item.id
                      ? "bg-apace-orange-dark border-apace-orange-dark  text-black "
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    " flex items-center cursor-pointer justify-center my-2 text-md  rounded-full border mr-4 border-none "
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Button>
              ))}
            </div>
            <div className=" ">
              <div className="w-5/6">
                {text.map((text) =>
                  text.data.map((text) => {
                    return (
                      <>
                        <p key={text.id} className="py-1 text-xl font-black">
                          {text.id}. {text.title}
                        </p>
                        <p className="py-2 leading-normal "> {text.text} </p>
                      </>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          <div className="my-8 ">
            <Button
              onClick={() => router.push("/auth/shopper/sign-up")}
              className=" bg-apace-orange-light border-apace-orange-light text-black  mr-8"
            >
              See how it works for shoppers
            </Button>
          </div>
        </div>
      </div>

      <div className="relative lg:w-1/2 w-full  h-auto lg:ml-8 ml-0">
        {text.map((text) => {
          return (
            <Image
              key={text.id}
              className="object-contain"
              height={786}
              width={680}
              src={text.photo}
            />
          );
        })}
      </div>
    </div>
  );
};

export default HIW;
