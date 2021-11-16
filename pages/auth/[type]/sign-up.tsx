import type { NextPage } from "next";
import AuthLayout from "../../../components/auth/layout";
import Button from "../../../components/button";
import Form from "../../../components/form";
import Input from "../../../components/input";
import ViewPassword from "../../../components/view-password";
import Link from "next/link";
import { useState } from "react";
import { registerAsBusiness } from "../../../store/actions/user.action";
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
        <h1 className="text-2xl font-black "> More information</h1>
        <div className="lg:w-4/12 md:w-7/12 w-full">
          <Form className="w-full " onSubmit={onSubmit}>
            <Input
              placeholder={`${status ? "Email address*" : "Phone number*"}`}
              className="mt-2 mb-4"
              type={status ? "email" : "text"}
              name="p"
              value={email_address}
              onChange={handleChange}
              required
            />
            <small>
              A verification code will be sent to this
              {status ? "email address" : "phone number"}
            </small>

            <div className="flex items-center mx-auto mt-8 underline cursor-pointer  ">
              <p onClick={() => setStatus(!status)} className="mr-2">
                {!status
                  ? "Use email address instead"
                  : "Use phone number instead"}
              </p>
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
