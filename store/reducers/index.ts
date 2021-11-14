import { combineReducers } from "redux";
import apaceStoreReducer from "./apaceStore.reducer";
import loadingReducer from "./loading.reducer";
import userReducer from "./user.reducer";

export default combineReducers({
  auth: userReducer,
  stores: apaceStoreReducer,
  loading: loadingReducer,
});
