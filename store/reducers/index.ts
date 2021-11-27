import { combineReducers } from "redux";
import apaceStoreReducer from "./apaceStore.reducer";
import loadingReducer from "./loading.reducer";
import notificationReducer from "./notification.reducer";
import paymentReducer from "./payments.reducer";
import purchaseReducer from "./purchases.reducer";
import userReducer from "./user.reducer";

export default combineReducers({
  auth: userReducer,
  stores: apaceStoreReducer,
  loading: loadingReducer,
  payment: paymentReducer,
  purchase: purchaseReducer,
  notification: notificationReducer,
});
