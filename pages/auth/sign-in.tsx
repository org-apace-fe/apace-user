import type { NextPage } from "next";
import AuthLayout from "../../components/auth/layout";
import Button from "../../components/button";
import Form from "../../components/form";
import Input from "../../components/input";
import ViewPassword from "../../components/view-password";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { signinAsBusiness } from "../../store/actions/user.action";

const SignUpOptions: NextPage = () => {
  const [status, setStatus] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const initialState = {
    email: "",
    password: "",
  };
  const [user, setUser] = useState(initialState);

  //dispatch
  const dispatch = useDispatch();
  const router = useRouter();

  const handleChange = (e: any) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    console.log(user);

    dispatch(signinAsBusiness(user, router));
  };

  const { email, password } = user;

  return (
    <div>
      <AuthLayout>
        <div className="mb-12">
          <h1 className="text-6xl font-black">Sign in</h1>
        </div>
        <div className="lg:w-4/12 md:w-7/12 w-full">
          <Form className="w-full " onSubmit={onSubmit}>
            <Input
              placeholder="Email address*"
              className="mt-2 mb-4"
              type="email"
              name="email"
              value={email}
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
                <p> Sign in</p>
              </Button>
            </div>
          </Form>
        </div>

        <p className="py-6">Don't have an account yet?</p>

        <div>
          <Link href="/auth/signup-options">
            <a className="flex">
              <img src="/icons/sign-up-user.svg" />
              <p className="ml-2"> Create an account </p>
            </a>
          </Link>
        </div>
      </AuthLayout>
    </div>
  );
};

export default SignUpOptions;
