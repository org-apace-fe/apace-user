import { combineReducers } from "redux";
import apaceStoreReducer from "./apaceStore.reducer";
import loadingReducer from "./loader/index";
import notificationReducer from "./notification.reducer";

import userReducer from "./user.reducer";
import toastReducer from "../reducers/toast/index";
import modalReducer from "./modal";

export default combineReducers({
  auth: userReducer,
  stores: apaceStoreReducer,
  loader: loadingReducer,
  toast: toastReducer,
  modal: modalReducer,
  notification: notificationReducer,
});
