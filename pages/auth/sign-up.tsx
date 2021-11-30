import type { NextPage } from "next";
import AuthLayout from "../../components/auth/layout";
import Button from "../../components/button";
import Form from "../../components/form";
import Input from "../../components/input";
import ViewPassword from "../../components/view-password";
import Link from "next/link";
import { useEffect, useState } from "react";
import { registerAsBusiness } from "../../store/actions/user.action";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { openToastAndSetContent } from "../../store/actions/toast/toastActions";
import withoutAuth from "../../route/without-auth";

const SignUp: NextPage = () => {
  const [status, setStatus] = useState(false);
  const initialState = { email_address: "", password: "", country: "" };
  const [user, setUser] = useState(initialState);
  const [passwordStatus, setPasswordStatus] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const handleChange = (e: any) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const ultimateRegex =
    "^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[d]){1,})(?=(.*[W]){1,})(?!.*s).{8,}$";

  const selectChange = (country: any) => {
    setUser({ ...user, country: country?.value });
  };

  const businessType = useSelector((state: any) => state.auth.businessType);
  const listCountry = useSelector((state: any) => state.auth.countries);

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
    } else {
      const businessUser = { ...user, ...{ type: businessType } };
      dispatch(registerAsBusiness(businessUser, router));
    }
  };

  const customStyles = {
    control: (base: any, state: any) => ({
      ...base,
      background: "transparent",
      borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
      borderColor: "rgba(75, 85, 99, var(--tw-border-opacity))",
      boxShadow: state.isFocused ? null : null,
      placeholder: "#fff",
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      color: "#000",
      backgroundColor: "#fff",
    }),
    menu: (base: any) => ({
      ...base,
      borderRadius: 10,
      marginTop: 0,
    }),
    menuList: (base: any) => ({
      ...base,
      padding: 0,
    }),
  };

  const { email_address, password, country } = user;

  useEffect(() => {
    const checkPassword = new RegExp(ultimateRegex).test(password);
    if (checkPassword) {
      setPasswordStatus(true);
    } else setPasswordStatus(false);
  }, [password]);

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

            <Select
              onChange={selectChange}
              styles={customStyles}
              className="mt-2 mb-4"
              placeholder="Select a country ..."
              name="country"
              options={listCountry?.data?.map((countries: any) => {
                return { label: countries?.name, value: countries?.short_name };
              })}
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
                type={status ? "text" : "password"}
                value={password}
                onChange={handleChange}
                required
              />
            </div>

            <div className={` ${password.length < 1 ? "hidden" : ""} `}>
              {passwordStatus ? (
                <small className="text-green-600">
                  Password matches requirements
                </small>
              ) : (
                <small className="text-red-600">
                  Password does not matches requirements
                </small>
              )}
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

export default withoutAuth(SignUp);
