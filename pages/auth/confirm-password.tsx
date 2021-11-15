import type { NextPage } from "next";
import AuthLayout from "../../components/auth/layout";
import Button from "../../components/button";
import Form from "../../components/form";
import Input from "../../components/input";
import ViewPassword from "../../components/view-password";
import Link from "next/link";

const SignUpOptions: NextPage = () => {
  return (
    <div>
      <AuthLayout>
      <div className="mb-12">
            <h1 className="text-6xl font-black">
            Enter new password
            </h1>
          </div>
        <div className="lg:w-4/12 md:w-7/12 w-full">
          <Form className="w-full ">
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
            <div className="relative mb-2">
              <div className="absolute top-3 right-4">
                <ViewPassword />
              </div>
              <Input
                placeholder="Confirm password*"
                className="mb-4 w-full"
                name="confirmPassword"
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
      </AuthLayout>
    </div>
  );
};

export default SignUpOptions;
