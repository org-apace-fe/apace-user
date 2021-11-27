import type { NextPage } from "next";
import AuthLayout from "../../../components/auth/layout";
import Button from "../../../components/button";
import Form from "../../../components/form";
import Input from "../../../components/input";
import ViewPassword from "../../../components/view-password";
import Link from "next/link";
import { useEffect, useState } from "react";
import { registerAsShopper } from "../../../store/actions/user.action";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

const SignUp: NextPage = () => {
  const [type, setType] = useState("");
  const initialState = { identifier: "", password: "", confirmPassword: "" };
  const [user, setUser] = useState(initialState);
  const [status, setStatus] = useState(false);
  //dispatch
  const dispatch = useDispatch();
  const router = useRouter();

  const handleChange = (e: any) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: any) => {
    e.preventDefault();

    const shopperUser = { identifier, password };
    const data = {
      identifier,
      type,
    };
    dispatch({
      type: "SET_IDENTIFIER",
      payload: data,
    });
    dispatch(registerAsShopper(shopperUser, router, type));
  };

  const { identifier, password, confirmPassword } = user;

  useEffect(() => {
    setType("email");
  }, []);

  return (
    <div>
      <AuthLayout>
        <div className="mb-12">
          <h1 className="text-6xl font-black">Create an account</h1>
        </div>

        <div className="lg:w-4/12 md:w-7/12 w-full">
          <Form className="w-full " onSubmit={onSubmit}>
            <Input
              placeholder={`${
                type !== "mobile" ? "Email address*" : "Phone number*"
              }`}
              className="mt-2 mb-4"
              type={type !== "mobile" ? "email" : "text"}
              name="identifier"
              value={identifier}
              onChange={handleChange}
              required
            />
            <div className="relative mb-2">
              <div className="absolute top-3 right-4">
                <ViewPassword
                  onClick={() => setStatus(!status)}
                  status={status}
                />
              </div>
              <Input
                placeholder="Password*"
                className="mb-4 w-full"
                name="password"
                value={password}
                type={status ? "text" : "password"}
                onChange={handleChange}
                required
              />
            </div>
            <div className="relative mb-2">
              <div className="absolute top-3 right-4">
                <ViewPassword
                  onClick={() => setStatus(!status)}
                  status={status}
                />
              </div>
              <Input
                placeholder="Confirm password*"
                className="mb-4 w-full"
                type={status ? "text" : "password"}
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <small>
              A verification code will be sent to this{" "}
              {type !== "mobile" ? "email address" : "phone number"}
            </small>

            <div className="flex items-center mx-auto mt-8 underline cursor-pointer  ">
              {type !== "mobile" ? (
                <p onClick={() => setType("mobile")} className="mr-2">
                  Use phone number instead
                </p>
              ) : (
                <p onClick={() => setType("email")} className="mr-2">
                  Use email address instead
                </p>
              )}

              <img src="/icons/warning-icon.svg" />
            </div>

            <div className=" lg:w-3/6 w-5/6 mx-auto ">
              <Button
                className="flex justify-center py-0 mt-32 my-8 w-full mx-auto text-black border bg-apace-orange-light  border-apace-orange-light  "
                type="submit"
              >
                <p> Send Code </p>
              </Button>
            </div>

            <div>
              <p className="text-center">
                By using Apace, you agree to our
                <Link href="/">
                  <a className="underline text-apace-orange-dark">
                    Terms & conditions
                  </a>
                </Link>
              </p>
            </div>
          </Form>
        </div>

        <p className="py-6">Already have an account?</p>

        <div>
          <Link href="/auth/shopper/sign-in">
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
