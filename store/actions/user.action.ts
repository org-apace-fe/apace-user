import axios from "axios";

import { LoadingStart, LoadingStop } from "./loader/loaderActions";
import { openToastAndSetContent } from "./toast/toastActions";

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

      dispatch(LoadingStop());
      dispatch(
        openToastAndSetContent({
          toastContent: "Signed up successfully",
          toastStyles: {
            backgroundColor: "green",
          },
        })
      );
      router.push("https://apace-store-admin.herokuapp.com/user/login");
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

      router.push("/auth/verification");
      dispatch(LoadingStop());
    } catch (error: any) {
      console.log(error?.response?.data?.message);

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

export const fetchAllCountries = () => async (dispatch: any) => {
  dispatch(LoadingStart());
  try {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const headersRequest = {
      _auth: `${process.env.NEXT_PUBLIC_ENV_AUTH_KEY_AUTH2}`,
    };

    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_ENV_API_AUTH_URL}/api/v1/store/shipping/countries`,
      { headers: headersRequest }
    );

    const response = res?.data;

    dispatch({
      type: "SET_ALL_COUNTRIES",
      payload: res?.data,
    });

    if (response) dispatch(LoadingStop());
  } catch (error) {
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

      dispatch(
        openToastAndSetContent({
          toastContent: "Verified successfully",
          toastStyles: {
            backgroundColor: "green",
          },
        })
      );
      router.push("/auth/shopper/sign-in");
      dispatch(LoadingStop());
    } catch (error) {
      dispatch(
        openToastAndSetContent({
          toastContent: "Verified failed",
          toastStyles: {
            backgroundColor: "red",
          },
        })
      );
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

    dispatch(
      openToastAndSetContent({
        toastContent: "OTP sent successfully",
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

export const fetchMiscelaneousStatistics = () => async (dispatch: any) => {
  dispatch(LoadingStart());
  try {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const headersRequest = {
      Authorization: `Bearer ${token}`,
      "auth-key": `${process.env.NEXT_PUBLIC_ENV_AUTH_KEY}`,
    };

    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_ENV_API_AUTH_URL}/api/v1/customer/miscellaneous/statistics/general`,
      { headers: headersRequest }
    );

    const response = res?.data;

    dispatch({
      type: "SET_MiSCELLANEOUS_STATISTICS",
      payload: res?.data,
    });

    if (response) dispatch(LoadingStop());
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

  dispatch(setCurrentUser({}));
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (!token) router.push("/");
};
