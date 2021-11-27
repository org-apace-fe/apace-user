import axios from "axios";
// import setAuthToken from '../../utils/utils';
// import { clearAlert, setAlert } from './alert.actions';
import { LoadingStart, LoadingStop } from "./loader/loaderActions";

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
