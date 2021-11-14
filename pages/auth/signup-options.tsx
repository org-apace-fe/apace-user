import type { NextPage } from "next";
import AuthLayout from "../../components/auth/layout";
import Button from "../../components/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

const options = [
  {
    id: 1,
    url: `/icons/online-rental.png`,
    name: "Online retail",
    type: "Online",
    description:
      "You have a website or ecommerce store online, selling goods and services",
  },
  {
    id: 2,
    url: `/icons/online-rental.png`,
    name: "In-store",
    type: "Store",
    description:
      "You operate primarily brick-and-mortar and need to use Apace at the point of sale",
  },
  {
    id: 3,
    url: `/icons/online-rental.png`,
    name: "Gateway",
    type: "Gateway",
    description:
      "You collect payments with your own system but need to integrate Apace to help your customers pay over time",
  },
];

const SignUpOptions: NextPage = () => {
  const [option1, setOption] = useState<number>(1);

  const dispatch = useDispatch();
  const router = useRouter();

  const onClick = (id: number) => {
    setOption(id);
  };

  useEffect(() => {
    // setOption(1);
    console.log(option1);
  }, [option1]);

  return (
    <div>
      <AuthLayout>
        <h1 className="text-2xl font-black ">How do you want to use apace?</h1>

        <div className=" lg:w-8/12 md:w-full mx-auto flex lg:flex-row md:flex-row flex-col  flex-wrap my-12">
          {options.map((option) => {
            return (
              <div
                key={option.id}
                className={`relative mx-2 bg-gray-700 border-2 cursor-pointer flex-1 lg:my-0 my-4 ${
                  Number(option.id) === option1
                    ? "border-apace-orange-dark"
                    : ""
                }  rounded-lg p-3 px-3 pt-3 pb-4 `}
                onClick={() => onClick(option.id)}
              >
                <div
                  className={`${
                    Number(option.id) === option1 ? "absolute" : "hidden"
                  } `}
                  style={{ top: "-0.95rem", right: "-1rem" }}
                >
                  <img src="/icons/check-orange.svg" />
                </div>
                <div className="h-28">
                  <img className="w-full h-full" src={option.url} />
                </div>

                <div className="py-2">
                  <h2 className="mt-1 mb-2  font-black"> {option.name} </h2>
                  <p className="text-sm">{option.description}</p>
                </div>
              </div>
            );
          })}
        </div>
        <Button
          className="flex justify-center items-center  bg-apace-orange-light border-apace-orange-light text-black  "
          onClick={() => {
            const option = options.find((e) => e.id === option1);

            dispatch({
              type: "SET_BUSINESS_TYPE",
              payload: option?.type,
            });
            router.push("/auth/sign-up");
          }}
        >
          <img src="/icons/arrow-v.svg" className="mr-2" /> Continue
        </Button>

        <p className="py-6">Already have an account?</p>

        <div>
          <Link href="/auth/sign-in">
            <a className="flex">
              <img src="/icons/sign-in-arrow.svg" />
              <p className="ml-2"> Sign in </p>
            </a>
          </Link>
        </div>
      </AuthLayout>
    </div>
  );
};

export default SignUpOptions;
