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
            Verification
            </h1>
          </div>
        <div className="lg:w-4/12 md:w-7/12 w-full">
          <Form className="w-full ">
            <Input
              placeholder="Verification Code*"
              className="mt-2 mb-4"
              type="text"
              name="verificationCode"
              required
            />

            <p className="py-6 text-center underline">Resend code</p>

            <div className=" lg:w-3/6 w-5/6 mx-auto ">
              <Button
                className="flex justify-center py-0 mt-32 my-8 w-full mx-auto text-black border bg-apace-orange-light  border-apace-orange-light  "
                type="submit"
              >
                <img src="/icons/account.svg" className="mr-2" />
                <p> Verify</p>
              </Button>
            </div>
          </Form>
        </div>

        <p className="py-6 underline">Re-enter details</p>
      </AuthLayout>
    </div>
  );
};

export default SignUpOptions;
