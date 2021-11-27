import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore } from "redux-persist";

import rootReducer from "./reducers";

const initialState = {};
const middleware = [thunk];

const isClient = typeof window !== "undefined";
let store: any;

if (isClient) {
  const { persistReducer } = require("redux-persist");
  const storage = require("redux-persist/lib/storage").default;

  const persistConfig = {
    key: "root",
    storage,
  };

  store = createStore(
    persistReducer(persistConfig, rootReducer),
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
  );

  store.__PERSISTOR = persistStore(store);
} else {
  store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
  );
}

// const { persistReducer } = require("redux-persist");
// const storage = require("redux-persist/lib/storage").default;

// const persistConfig = {
//   key: "root",
//   storage,
// };

// let store = createStore(
//   persistReducer(persistConfig, rootReducer),
//   initialState,
//   composeWithDevTools(applyMiddleware(...middleware))
// );

// store.__PERSISTOR = persistStore(store);

export default store;

export type RootState = ReturnType<typeof store.getState>;
