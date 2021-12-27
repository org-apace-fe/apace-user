import type { NextPage } from "next";
import AuthLayout from "../../../components/auth/layout";
import Button from "../../../components/button";
import Form from "../../../components/form";
import Input from "../../../components/input";
import ViewPassword from "../../../components/view-password";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import withoutAuth from "../../../route/without-auth";
import {
  LoadingStart,
  LoadingStop,
} from "../../../store/actions/loader/loaderActions";
import axios from "axios";
import { openToastAndSetContent } from "../../../store/actions/toast/toastActions";

const SignIn: NextPage = () => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const headersRequest = {
    Authorization: `Bearer ${token}`,
    "auth-key": `${process.env.NEXT_PUBLIC_ENV_AUTH_KEY}`,
  };

  const [status, setStatus] = useState(false);
  const initialState = {
    identifier: "",
    password: "",
  };
  const [user, setUser] = useState(initialState);

  //dispatch
  const dispatch = useDispatch();
  const router = useRouter();

  const handleChange = (e: any) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    dispatch({
      type: "SET_IDENTIFIER",
      payload: user,
    });
    dispatch(LoadingStart());
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_ENV_API_AUTH_URL}/api/v1/customer/sign-in`,
        user,
        { headers: headersRequest }
      );

      if (res?.data?.status_code === 11) {
        dispatch(
          openToastAndSetContent({
            toastContent: res?.data?.message,
            toastStyles: {
              backgroundColor: "green",
            },
          })
        );
        console.log(res?.data?.message);
        router.push("/auth/verification");
      }

      const { access_token } = res?.data?.token;

      typeof window !== "undefined"
        ? localStorage.setItem("token", access_token)
        : null;

      dispatch(
        openToastAndSetContent({
          toastContent: "Signed in successfully",
          toastStyles: {
            backgroundColor: "green",
          },
        })
      );

      router.push("/dashboard");
    } catch (error: any) {
      console.log(error?.response?.data);

      dispatch(
        openToastAndSetContent({
          toastContent: error?.response?.data?.message,
          toastStyles: {
            backgroundColor: "red",
          },
        })
      );
      dispatch(LoadingStop());
    }
  };

  const forgotPassword = async () => {
    try {
      dispatch(LoadingStart());
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_ENV_API_AUTH_URL}/api/v1/customer/forgot-password`,
        {
          identifier,
        },
        { headers: headersRequest }
      );

      dispatch(LoadingStop());
      dispatch({
        type: "SET_IDENTIFIER",
        payload: { identifier },
      });
      dispatch(
        openToastAndSetContent({
          toastContent: res?.data?.message,
          toastStyles: {
            backgroundColor: "green",
          },
        })
      );
      router.push("/auth/verification/forgot-password");
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

  const { identifier, password } = user;

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
                type={status ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleChange}
              />
            </div>

            <div className="mt-16 cursor-pointer">
              <div onClick={() => forgotPassword()} className="text-center">
                Forgot Password ?
              </div>
              <div className=" lg:w-3/6 w-5/6 mx-auto ">
                <Button
                  className="flex justify-center py-0 mt-6 my-8 w-full mx-auto text-black border bg-apace-orange-light  border-apace-orange-light  "
                  type="submit"
                >
                  <img src="/icons/account.svg" className="mr-2" />
                  <p> Sign in</p>
                </Button>
              </div>
            </div>
          </Form>
        </div>

        <p className="py-6">Don't have an account yet?</p>

        <div>
          <Link href="/auth/shopper/sign-up">
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

export default withoutAuth(SignIn);
