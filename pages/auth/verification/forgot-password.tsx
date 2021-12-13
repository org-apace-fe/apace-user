import type { NextPage } from "next";
import AuthLayout from "../../../components/auth/layout";
import Button from "../../../components/button";
import Form from "../../../components/form";
import Input from "../../../components/input";
import ViewPassword from "../../../components/view-password";
import Link from "next/link";
import { resendOTP, verifyAsShopper } from "../../../store/actions/user.action";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import withoutAuth from "../../../route/without-auth";

const Verification: NextPage = () => {
  const apaceIdentifier = useSelector((state: any) => state.auth.identifier);
  const [otp, setOtp] = useState("");

  //dispatch
  const dispatch = useDispatch();
  const router = useRouter();

  const handleChange = (e: any) => {
    setOtp(e.target.value);
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    dispatch({
      type: "SET_OTP",
      payload: otp,
    });
    router.push("/auth/reset-password");
  };

  return (
    <div>
      <AuthLayout>
        <div className="mb-12">
          <h1 className="text-6xl font-black">Verification</h1>
        </div>
        <div className="lg:w-4/12 md:w-7/12 w-full">
          <Form className="w-full " onSubmit={onSubmit}>
            <Input
              placeholder="Verification Code*"
              className="mt-2 mb-4"
              type="text"
              name="otp"
              onChange={handleChange}
              value={otp}
              required
            />
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

        <Link href="/auth/shopper/sign-up">
          <a className="py-6 underline">Re-enter details</a>
        </Link>
      </AuthLayout>
    </div>
  );
};

export default withoutAuth(Verification);
