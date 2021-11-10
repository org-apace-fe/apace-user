import type { NextPage } from "next";
import AuthLayout from "../../components/auth/layout";
import Button from "../../components/button";
import Form from "../../components/form";
import Input from "../../components/input";
import ViewPassword from "../../components/view-paaword";
import Link from "next/link";

const SignUp: NextPage = () => {
  return (
    <div>
      <AuthLayout>
        <h1 className="text-2xl font-black "> More information</h1>
        <div className="lg:w-4/12 md:w-7/12 w-full">
          <Form className="w-full ">
            <Input
              placeholder="Email address*"
              className="mt-2 mb-4"
              type="email"
              name="email"
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
