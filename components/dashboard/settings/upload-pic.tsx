import { Button } from "react-bootstrap";
import Avatar from "react-avatar";
import { useDispatch, useSelector } from "react-redux";
import {
  LoadingStart,
  LoadingStop,
} from "../../../store/actions/loader/loaderActions";
import axios from "axios";
import { openToastAndSetContent } from "../../../store/actions/toast/toastActions";
import { fetchUserProfile } from "../../../store/actions/user.action";

const UploadPicComponent = () => {
  const dispatch = useDispatch();

  const profile = useSelector((state: any) => state.auth);
  const personalInfo = profile?.user?.data?.peronal_info;

  const avatarUpdate = async (e: any) => {
    const image = e?.target?.files[0];
    const form = new FormData();
    form.append("avatar", image);

    try {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const headersRequest = {
        Authorization: `Bearer ${token}`,
        "auth-key": `${process.env.NEXT_PUBLIC_ENV_AUTH_KEY}`,
      };
      dispatch(LoadingStart());
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_ENV_API_AUTH_URL}/api/v1/customer/profile/set-avatar`,
        form,
        { headers: headersRequest }
      );

      dispatch(fetchUserProfile());
      dispatch(
        openToastAndSetContent({
          toastContent: "Avatar Updated",
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

  return (
    <div>
      <div className="flex items-center">
        <div>
          {!personalInfo?.avatar ? (
            <Avatar
              className="sb-avatar rounded-full mr-4"
              size="8rem"
              color="#ED6E24"
              name={`${personalInfo?.first_name} ${personalInfo?.last_name} `}
            />
          ) : (
            <div className="w-32 h-32 mr-4 rounded-full overflow-hidden">
              <img
                src={personalInfo?.avatar}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
        <label className="bg-purple-400 rounded-full cursor-pointer text-black py-1 px-6 mr-4 ">
          <i className="fas fa-cloud-upload-alt fa-3x"></i>
          <span className="flex items-center text-base leading-normal">
            <img src="/icons/settings/change.svg" />{" "}
            <p className="ml-1"> Change </p>
          </span>
          <input
            type="file"
            className="hidden"
            onChange={(e) => avatarUpdate(e)}
          />
        </label>
        <Button onClick={(e) => avatarUpdate("")}>Remove</Button>
      </div>
    </div>
  );
};

export default UploadPicComponent;
