import axios from "axios";

// import { clearAlert, setAlert } from './alert.actions';
import {
  LoadingStart,
  LoadingStop,
  subLoadingStart,
  subLoadingStop,
} from "./loading.action";

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
      // router.push("/dashboard");
      dispatch(LoadingStop());
    } catch (error) {
      // dispatch(setAlert(error?.response?.data));
      dispatch(LoadingStop());
    }
  };

export const registerAsShopper =
  (newUser: any, router: any, type: any) => async (dispatch: any) => {
    dispatch(LoadingStart());
    try {
      typeof window !== "undefined"
        ? localStorage.setItem("email", newUser?.email)
        : null;
      const headersRequest = {
        "auth-key": `${process.env.NEXT_PUBLIC_ENV_AUTH_KEY}`,
      };
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_ENV_API_AUTH_URL}/api/v1/customer/sign-up/${type}`,
        newUser,
        { headers: headersRequest }
      );

      // dispatch(setAlert(res?.data));
      router.push("/auth/verification");
      dispatch(LoadingStop());
    } catch (error) {
      // dispatch(setAlert(error?.response?.data));
      dispatch(LoadingStop());
    }
  };

export const verifyAsShopper =
  (data: any, router: any, type: any) => async (dispatch: any) => {
    dispatch(LoadingStart());
    try {
      typeof window !== "undefined"
        ? localStorage.setItem("email", data?.email)
        : null;
      const headersRequest = {
        "auth-key": `${process.env.NEXT_PUBLIC_ENV_AUTH_KEY}`,
      };
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_ENV_API_AUTH_URL}/api/v1/customer/sign-up/${type}/complete`,
        data,
        { headers: headersRequest }
      );

      // dispatch(setAlert(res?.data));
      router.push("/dashboard");
      dispatch(LoadingStop());
    } catch (error) {
      // dispatch(setAlert(error?.response?.data));
      dispatch(LoadingStop());
    }
  };

export const resendOTP = (data: any) => async (dispatch: any) => {
  dispatch(LoadingStart());
  try {
    typeof window !== "undefined"
      ? localStorage.setItem("email", data?.email)
      : null;
    const headersRequest = {
      "auth-key": `${process.env.NEXT_PUBLIC_ENV_AUTH_KEY}`,
    };
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_ENV_API_AUTH_URL}/api/v1/customer/resend-otp`,
      data,
      { headers: headersRequest }
    );

    // dispatch(setAlert(res?.data));
    // router.push("/dashboard");
    dispatch(LoadingStop());
  } catch (error) {
    // dispatch(setAlert(error?.response?.data));
    dispatch(LoadingStop());
  }
};

export const signinAsShopper =
  (user: any, router: any) => async (dispatch: any) => {
    dispatch(LoadingStart());
    try {
      const headersRequest = {
        "auth-key": `${process.env.NEXT_PUBLIC_ENV_AUTH_KEY}`,
      };
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_ENV_API_AUTH_URL}/api/v1/customer/sign-in`,
        user,
        { headers: headersRequest }
      );
      const { access_token } = res?.data?.token;
      console.log(access_token);

      typeof window !== "undefined"
        ? localStorage.setItem("token", access_token)
        : null;

      router.push("/dashboard");
    } catch (error) {
      dispatch(LoadingStop());
    }
  };

// Fetch User Profile
export const fetchUserProfile = () => async (dispatch: any) => {
  dispatch(LoadingStart());
  try {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const headersRequest = {
      Authorization: `Bearer ${token}`,
      "auth-key": `${process.env.NEXT_PUBLIC_ENV_AUTH_KEY}`,
    };

    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_ENV_API_AUTH_URL}/api/v1/customer/me`,
      { headers: headersRequest }
    );
    dispatch(setCurrentUser(res?.data));
    const response = res?.data;

    if (response) dispatch(LoadingStop());
  } catch (error) {
    dispatch(LoadingStop());
  }
};

export const fetchAllReferrals = () => async (dispatch: any) => {
  dispatch(LoadingStart());
  try {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const headersRequest = {
      Authorization: `Bearer ${token}`,
      "auth-key": `${process.env.NEXT_PUBLIC_ENV_AUTH_KEY}`,
    };

    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_ENV_API_AUTH_URL}/api/v1/customer/referral/all`,
      { headers: headersRequest }
    );

    const response = res?.data;

    dispatch({
      type: "SET_ALL_REFERRALS",
      payload: res?.data,
    });

    if (response) dispatch(LoadingStop());
  } catch (error) {
    dispatch(LoadingStop());
  }
};

export const fetchReferralsStatistics = () => async (dispatch: any) => {
  dispatch(LoadingStart());
  try {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const headersRequest = {
      Authorization: `Bearer ${token}`,
      "auth-key": `${process.env.NEXT_PUBLIC_ENV_AUTH_KEY}`,
    };

    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_ENV_API_AUTH_URL}/api/v1/customer/referral/statistics`,
      { headers: headersRequest }
    );

    const response = res?.data;

    dispatch({
      type: "SET_REFERRALS_STATISTICS",
      payload: res?.data,
    });

    if (response) dispatch(LoadingStop());
  } catch (error) {
    dispatch(LoadingStop());
  }
};

export const fetchReferralsActivities = () => async (dispatch: any) => {
  dispatch(LoadingStart());
  try {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const headersRequest = {
      Authorization: `Bearer ${token}`,
      "auth-key": `${process.env.NEXT_PUBLIC_ENV_AUTH_KEY}`,
    };

    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_ENV_API_AUTH_URL}/api/v1/customer/referral/activities`,
      { headers: headersRequest }
    );

    const response = res?.data;

    dispatch({
      type: "SET_REFERRALS_ACTIVITIES",
      payload: res?.data,
    });

    if (response) dispatch(LoadingStop());
  } catch (error) {
    dispatch(LoadingStop());
  }
};

export const signinAsBusiness =
  (user: any, router: any) => async (dispatch: any) => {
    dispatch(LoadingStart());
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_ENV_API_AUTH_URL}/api/v1/store/dashboard/user/login`,
        user
      );
      // const { token } = res?.data?.data;
      // typeof window !== 'undefined' ? localStorage.setItem('token', token) : null;

      router.push("/dashboard");
    } catch (error) {
      dispatch(LoadingStop());
    }
  };

// Set logged in user
export const setCurrentUser = (decoded: any) => {
  return {
    type: "SET_CURRENT_USER",
    payload: decoded,
  };
};

// Log user out
export const logoutUser = (router: any) => (dispatch: any) => {
  // Remove token from local storage
  localStorage.removeItem("token");
  localStorage.removeItem("persist:root");
  // Remove auth header for future requests
  // setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (!token) router.push("/");
};
