import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "../../../form";
import Input from "../../../input";
import UploadPicComponent from "../upload-pic";
import Button from "../../../button";
import {
  LoadingStart,
  LoadingStop,
} from "../../../../store/actions/loader/loaderActions";
import { openToastAndSetContent } from "../../../../store/actions/toast/toastActions";
import axios from "axios";
import { fetchUserProfile } from "../../../../store/actions/user.action";

const ProfileForm = () => {
  const dispatch = useDispatch();

  const profile = useSelector((state: any) => state.auth);
  const personalInfo = profile?.user?.data?.peronal_info;
  const verifications = profile?.user?.data?.verifications;

  const initialState = {
    firstname: "",
    lastname: "",
    state: "",
    city: "",
    address: "",
    mobile: "",
    email: "",
    dob: "",
    pin: "",
    password: "",
  };
  const bvnState = { bvn: "", otp: "" };
  const [user, setUser] = useState<any>(initialState);
  const [bvnData, setBvnData] = useState(bvnState);

  const handleChange = (e: any) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleBvnChange = (e: any) => {
    setBvnData({ ...bvnData, [e.target.name]: e.target.value });
  };

  const { firstname, lastname, state, city, address, mobile, email, dob } =
    user;
  const { bvn, otp } = bvnData;

  const profileUpdate = async () => {
    let fields: any[] = [];
    Object.keys(user).forEach((key: string) => {
      if (user[key]) {
        fields.push({
          key: key,
          value: user[key],
        });
      }
    });
    try {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const headersRequest = {
        Authorization: `Bearer ${token}`,
        "auth-key": `${process.env.NEXT_PUBLIC_ENV_AUTH_KEY}`,
      };
      dispatch(LoadingStart());
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_ENV_API_AUTH_URL}/api/v1/customer/profile/update`,
        { fields },
        { headers: headersRequest }
      );
      dispatch(fetchUserProfile());
      dispatch(
        openToastAndSetContent({
          toastContent: "Profile Updated",
          toastStyles: {
            backgroundColor: "green",
          },
        })
      );
      dispatch(LoadingStop());
    } catch (error: any) {
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

  const onSubmit = (e: any) => {
    e.preventDefault();
    profileUpdate();
  };

  const uploadFile = async (e: any, type: any) => {
    const image = e?.target?.files[0];
    const form = new FormData();
    form.append("document", image);

    try {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const headersRequest = {
        Authorization: `Bearer ${token}`,
        "auth-key": `${process.env.NEXT_PUBLIC_ENV_AUTH_KEY}`,
      };
      dispatch(LoadingStart());
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_ENV_API_AUTH_URL}/api/v1/customer/verification/document/${type}/upload`,
        form,
        { headers: headersRequest }
      );
      dispatch(fetchUserProfile());
      dispatch(
        openToastAndSetContent({
          toastContent: res?.data?.message,
          toastStyles: {
            backgroundColor: "green",
          },
        })
      );
      dispatch(LoadingStop());
    } catch (error: any) {
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

  const verifyBvn = async (type: any) => {
    try {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const headersRequest = {
        Authorization: `Bearer ${token}`,
        "auth-key": `${process.env.NEXT_PUBLIC_ENV_AUTH_KEY}`,
      };
      dispatch(LoadingStart());
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_ENV_API_AUTH_URL}/api/v1/customer/verify-me`,
        {
          type,
          value: bvn,
          dob: personalInfo?.date_of_birth,
        },
        { headers: headersRequest }
      );
      dispatch(fetchUserProfile());
      dispatch(
        openToastAndSetContent({
          toastContent: res?.data?.message,
          toastStyles: {
            backgroundColor: "green",
          },
        })
      );
      dispatch(LoadingStop());
    } catch (error: any) {
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

  const verifyBvnOtp = async (type: any) => {
    try {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const headersRequest = {
        Authorization: `Bearer ${token}`,
        "auth-key": `${process.env.NEXT_PUBLIC_ENV_AUTH_KEY}`,
      };
      dispatch(LoadingStart());
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_ENV_API_AUTH_URL}/api/v1/customer/verify-me/complete`,
        {
          type,
          otp,
        },
        { headers: headersRequest }
      );
      dispatch(fetchUserProfile());
      dispatch(
        openToastAndSetContent({
          toastContent: res?.data?.message,
          toastStyles: {
            backgroundColor: "green",
          },
        })
      );
      dispatch(LoadingStop());
    } catch (error: any) {
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

  useEffect(() => {
    setUser({
      ...user,
      firstname: personalInfo?.first_name,
      lastname: personalInfo?.last_name,
      dob: personalInfo?.date_of_birth
        ? new Date(personalInfo?.date_of_birth).toISOString().substr(0, 10)
        : "",
      address: personalInfo?.address,
      email: personalInfo?.email_address,
      mobile: personalInfo?.mobile_number,
    });
  }, []);

  return (
    <div>
      <UploadPicComponent />
      <div>
        <Form className="w-full" onSubmit={onSubmit}>
          <Input
            placeholder="First name"
            className="mt-2 mb-6"
            type="text"
            name="firstname"
            value={firstname}
            onChange={handleChange}
            required
          />
          <Input
            placeholder="Last name"
            className="mt-2 mb-6"
            type="text"
            name="lastname"
            value={lastname}
            onChange={handleChange}
            required
          />
          <div className="flex flex-col mb-6">
            <Input
              placeholder="Date of birth (DD/MM/YYYY)"
              className="mt-2 mb-1"
              type="date"
              name="dob"
              value={dob}
              onChange={handleChange}
            />
            <small>Should match the date on valid ID </small>
          </div>
          <Input
            placeholder="Residential address"
            className="mt-2 mb-6"
            type="text"
            name="address"
            value={address}
            onChange={handleChange}
          />
          <div className="flex flex-col mb-6">
            <div className="relative ">
              <div className="absolute top-2 right-4">
                <img src="/icons/settings/attachment.svg" />
              </div>
              <Input
                placeholder="Proof of address"
                className="mb-1 w-full pt-2"
                type="file"
                name="utility_bill"
                onChange={(e) => uploadFile(e, "utility_bill")}
              />
            </div>
            <small>Utility bill or valid ID </small>
          </div>

          <h1 className="text-xl mb-8"> Account </h1>

          <Input
            placeholder="Email address"
            className="mt-2 mb-6"
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
          <Input
            placeholder="Phone number"
            className="mt-2 mb-6"
            type="text"
            name="mobile"
            value={mobile}
            onChange={handleChange}
            required
          />

          <h1 className="text-xl mb-8"> Security </h1>

          <div className="flex items-center justify-between w-full mb-6">
            <div className="flex flex-col mr-3 w-l/2">
              <Input
                placeholder="BVN"
                className="mt-2 mb-1 w-full"
                type="text"
                name="bvn"
                value={bvn}
                onChange={handleBvnChange}
              />
              <small
                onClick={() => verifyBvn("BVN")}
                className="text-white underline cursor-pointer"
              >
                Verify BVN
              </small>
            </div>
            <div className="flex flex-col w-l/2">
              <Input
                placeholder="OTP"
                className="mt-2 mb-1 w-full"
                type="text"
                name="otp"
                value={otp}
                onChange={handleBvnChange}
              />
              <small
                onClick={() => verifyBvnOtp("BVN")}
                className=" text-white underline cursor-pointer"
              >
                Verify BVN OTP
              </small>
            </div>
          </div>

          <div className="flex flex-col mb-2">
            <div className="relative">
              <div className="absolute top-2 right-4">
                <img src="/icons/settings/attachment.svg" />
              </div>
              <Input
                placeholder="Proof of address"
                className="mb-1 w-full pt-2"
                type="file"
                name="id_card"
                onChange={(e) => uploadFile(e, "id_card")}
              />
            </div>
            <small>Utility bill or valid ID </small>
          </div>

          <div className="flex">
            <Button className="mr-6 border-none">Cancel</Button>
            <Button className="bg-purple-600 border-purple-600 text-black">
              Verify
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ProfileForm;
