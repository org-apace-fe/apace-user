import { combineReducers } from "redux";
import apaceStoreReducer from "./apaceStore.reducer";
import loadingReducer from "./loader/index";
import notificationReducer from "./notification.reducer";
import paymentReducer from "./payments.reducer";
import purchaseReducer from "./purchases.reducer";
import userReducer from "./user.reducer";
import toastReducer from "../reducers/toast/index";

export default combineReducers({
  auth: userReducer,
  stores: apaceStoreReducer,
  loader: loadingReducer,
  toast: toastReducer,
  payment: paymentReducer,
  purchase: purchaseReducer,
  notification: notificationReducer,
});
