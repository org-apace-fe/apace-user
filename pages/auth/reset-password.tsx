import type { NextPage } from "next";
import AuthLayout from "../../components/auth/layout";
import Button from "../../components/button";
import Form from "../../components/form";
import Input from "../../components/input";
import ViewPassword from "../../components/view-password";
import Link from "next/link";
import withoutAuth from "../../route/without-auth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  LoadingStart,
  LoadingStop,
} from "../../store/actions/loader/loaderActions";
import { openToastAndSetContent } from "../../store/actions/toast/toastActions";
import router from "next/router";
import axios from "axios";

const ResetPassord: NextPage = () => {
  const dispatch = useDispatch();
  const initialState = { identifier: "", password: "", confirmPassword: "" };
  const [user, setUser] = useState(initialState);
  const [status, setStatus] = useState(false);
  const [passwordStatus, setPasswordStatus] = useState(false);
  const [confirmPasswordStatus, setconfirmPasswordStatus] = useState(false);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const headersRequest = {
    Authorization: `Bearer ${token}`,
    "auth-key": `${process.env.NEXT_PUBLIC_ENV_AUTH_KEY}`,
  };

  const otp = useSelector((state: any) => state.auth?.otp);
  const apaceIdentifier = useSelector((state: any) => state.auth.identifier);
  const identifier = apaceIdentifier?.identifier;

  const handleChange = (e: any) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (!password.match(ultimateRegex)) {
      dispatch(
        openToastAndSetContent({
          toastContent: "Password must meet requirements",
          toastStyles: {
            backgroundColor: "red",
          },
        })
      );
    } else if (password !== confirmPassword) {
      dispatch(
        openToastAndSetContent({
          toastContent: "Passwords do not match",
          toastStyles: {
            backgroundColor: "red",
          },
        })
      );
    } else {
      resetPassword();
    }
  };

  const resetPassword = async () => {
    try {
      dispatch(LoadingStart());
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_ENV_API_AUTH_URL}/api/v1/customer/reset-password`,
        {
          identifier,
          otp,
          new_password: password,
        },
        { headers: headersRequest }
      );

      dispatch(LoadingStop());

      dispatch(
        openToastAndSetContent({
          toastContent: res?.data?.message,
          toastStyles: {
            backgroundColor: "green",
          },
        })
      );
      router.push("/auth/shopper/sign-in");
    } catch (error: any) {
      dispatch(LoadingStop());
      dispatch(
        openToastAndSetContent({
          toastContent: error?.response?.data?.message,
          toastStyles: {
            backgroundColor: "red",
          },
        })
      );
    }
  };

  const { password, confirmPassword } = user;

  const ultimateRegex = `^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[-+_!@#$%^&*., ?]).{8,}`;

  useEffect(() => {
    const checkPassword = new RegExp(ultimateRegex).test(password);
    console.log(checkPassword);
    if (checkPassword) {
      setPasswordStatus(true);
    } else setPasswordStatus(false);
  }, [password]);

  return (
    <div>
      <AuthLayout>
        <div className="mb-12">
          <h1 className="text-6xl font-black">Enter new password</h1>
        </div>
        <div className="lg:w-4/12 md:w-7/12 w-full">
          <Form className="w-full " onSubmit={onSubmit}>
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
                type={status ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleChange}
              />
            </div>

            <div className={` ${password.length < 1 ? "hidden" : ""} `}>
              {passwordStatus ? (
                <small className="text-green-600 ">
                  Password matches requirements
                </small>
              ) : (
                <small className="text-red-600">
                  Password must be at least 8 characters, contain at least a
                  small letter,capital letter, a number and a special character.
                </small>
              )}
            </div>

            <div className="relative mt-6 mb-2">
              <div className="absolute top-3 right-4">
                <ViewPassword
                  onClick={() =>
                    setconfirmPasswordStatus(!confirmPasswordStatus)
                  }
                  status={confirmPasswordStatus}
                />
              </div>
              <Input
                placeholder="Confirm password*"
                className="mb-4 w-full"
                type={confirmPasswordStatus ? "text" : "password"}
                name="confirmPassword"
                value={confirmPassword}
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
      </AuthLayout>
    </div>
  );
};

export default withoutAuth(ResetPassord);
