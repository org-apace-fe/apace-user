import type { NextPage } from "next";
import AuthLayout from "../../components/auth/layout";
import Button from "../../components/button";
import Form from "../../components/form";
import Input from "../../components/input";
import ViewPassword from "../../components/view-password";
import Link from "next/link";
import { useState } from "react";
import { registerAsBusiness } from "../../store/actions/user.action";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

const SignUp: NextPage = () => {
  const [status, setStatus] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const initialState = { email_address: "", password: "", country: "" };
  const [user, setUser] = useState(initialState);

  //dispatch
  const dispatch = useDispatch();
  const router = useRouter();

  const handleChange = (e: any) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const businessType = useSelector((state: any) => state.auth.businessType);

  const onSubmit = (e: any) => {
    e.preventDefault();
    const businessUser = { ...user, ...{ type: businessType } };
    dispatch(registerAsBusiness(businessUser, router));
  };

  const { email_address, password, country } = user;
  return (
    <div>
      <AuthLayout>
        <div className="mb-12">
          <h1 className="text-6xl font-black">Create an account</h1>
        </div>
        <div
          className={`flex justify-center items-center mb-8 text-gray-400   `}
        >
          <div>
            <span
              className={`${
                router.pathname === "/auth/signup-options"
                  ? "bg-apace-orange-dark"
                  : " bg-gray-400"
              } py-1 px-3 rounded-full mr-2 text-center text-white`}
            >
              1
            </span>
            Select an option
          </div>
          <div className=" border border-gray-600 px-5 mx-3"> </div>

          <div>
            <span
              className={`${
                router.pathname !== "/auth/signup-options"
                  ? "bg-apace-orange-dark"
                  : " bg-gray-400"
              } py-1 px-3 rounded-full mr-2 text-center text-white`}
            >
              2
            </span>
            More Information
          </div>
        </div>
        <h1 className="text-2xl font-black "> More information</h1>
        <div className="lg:w-4/12 md:w-7/12 w-full">
          <Form className="w-full " onSubmit={onSubmit}>
            <Input
              placeholder="Email address*"
              className="mt-2 mb-4"
              type="email"
              name="email_address"
              value={email_address}
              onChange={handleChange}
              required
            />
            <Input
              placeholder="Country*"
              className="mt-2 mb-4"
              type="text"
              name="country"
              value={country}
              onChange={handleChange}
              required
            />

            <div className="relative mb-2">
              <div className="absolute top-3 right-4">
                <ViewPassword />
              </div>
              <Input
                placeholder="Password*"
                className="mb-4 w-full"
                name="password"
                type="password"
                value={password}
                onChange={handleChange}
                required
              />
            </div>

            <div className=" lg:w-3/6 w-5/6 mx-auto ">
              <Button
                className="flex justify-center py-0 mt-32 my-8 w-full mx-auto text-black border bg-apace-orange-light  border-apace-orange-light  "
                type="submit"
              >
                <img src="/icons/account.svg" className="mr-2" />
                <p> Create an account </p>
              </Button>
            </div>
          </Form>
        </div>

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

export default SignUp;
