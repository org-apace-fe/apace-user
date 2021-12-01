import axios from "axios";
import { LoadingStart, LoadingStop } from "./loader/loaderActions";
import { openToastAndSetContent } from "./toast/toastActions";

export const getAllStores = () => async (dispatch: any) => {
  dispatch(LoadingStart());
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_ENV_API_AUTH_URL}/api/v1/store/all`
    );

    dispatch({
      type: "SET_ALL_STORES",
      payload: res?.data,
    });

    dispatch(LoadingStop());
  } catch (error) {
    // dispatch(setAlert(error?.response?.data));
    dispatch(LoadingStop());
  }
};

export const getAllOnlineStores = () => async (dispatch: any) => {
  dispatch(LoadingStart());
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_ENV_API_AUTH_URL}/api/v1/store/all?BusinessType=Online`
    );

    dispatch({
      type: "SET_ONLINE_STORES",
      payload: res?.data,
    });

    dispatch(LoadingStop());
  } catch (error) {
    // dispatch(setAlert(error?.response?.data));
    dispatch(LoadingStop());
  }
};

export const getAllInStoreStores = () => async (dispatch: any) => {
  dispatch(LoadingStart());
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_ENV_API_AUTH_URL}/api/v1/store/all?BusinessType=Store`
    );

    dispatch({
      type: "SET_IN_STORE_STORES",
      payload: res?.data,
    });

    dispatch(LoadingStop());
  } catch (error) {
    // dispatch(setAlert(error?.response?.data));
    dispatch(LoadingStop());
  }
};

export const getAllTopDealsStores = () => async (dispatch: any) => {
  dispatch(LoadingStart());
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_ENV_API_AUTH_URL}/api/v1/store/featured/deals`
    );

    dispatch({
      type: "SET_TOP_DEALS_STORES",
      payload: res?.data,
    });

    dispatch(LoadingStop());
  } catch (error) {
    // dispatch(setAlert(error?.response?.data));
    dispatch(LoadingStop());
  }
};

export const getAllFeaturedStores = () => async (dispatch: any) => {
  dispatch(LoadingStart());
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_ENV_API_AUTH_URL}/api/v1/store/featured/stores`
    );

    dispatch({
      type: "SET_FEATURED_STORES",
      payload: res?.data,
    });

    dispatch(LoadingStop());
  } catch (error) {
    // dispatch(setAlert(error?.response?.data));
    dispatch(LoadingStop());
  }
};

export const getAllCategories = () => async (dispatch: any) => {
  dispatch(LoadingStart());
  try {
    const headersRequest = {
      "auth-key": `${process.env.NEXT_PUBLIC_ENV_AUTH_KEY}`,
    };
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_ENV_API_AUTH_URL}/api/v1/store/view/categories/all`,
      { headers: headersRequest }
    );

    dispatch({
      type: "SET_ALL_CATEGORIES",
      payload: res?.data,
    });

    dispatch(LoadingStop());
  } catch (error) {
    // dispatch(setAlert(error?.response?.data));
    dispatch(LoadingStop());
  }
};

export const waitList = (email: any) => async (dispatch: any) => {
  dispatch(LoadingStart());
  try {
    const headersRequest = {
      _auth: `watimagboauthkey`,
    };
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_ENV_API_AUTH_URL}/api/v1/store/waitlist/add`,
      email,
      { headers: headersRequest }
    );

    dispatch(
      openToastAndSetContent({
        toastContent: "Confirmed- you are on the list",
        toastStyles: {
          backgroundColor: "green",
        },
      })
    );
    dispatch(LoadingStop());
  } catch (error) {
    dispatch(
      openToastAndSetContent({
        toastContent: "Failed",
        toastStyles: {
          backgroundColor: "red",
        },
      })
    );
    dispatch(LoadingStop());
  }
};
