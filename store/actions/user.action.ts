import axios from "axios";
// import setAuthToken from '../../utils/utils';
// import { clearAlert, setAlert } from './alert.actions';
import {
  LoadingStart,
  LoadingStop,
  subLoadingStart,
  subLoadingStop,
} from "./loading.action";

// Register/SignUp User
export const registerAsBusiness =
  (newUser: any, router: any) => async (dispatch: any) => {
    dispatch(LoadingStart());
    try {
      typeof window !== "undefined"
        ? localStorage.setItem("email", newUser?.email)
        : null;
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_ENV_API_AUTH_URL}/api/v1/store/dashboard/business/create`,
        newUser
      );

      console.log(res);

      // dispatch(setAlert(res?.data));
      router.push('/dashboard');
      dispatch(LoadingStop());
    } catch (error) {
      // dispatch(setAlert(error?.response?.data));
      dispatch(LoadingStop());
    }
  };
