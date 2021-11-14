import isEmpty from "is-empty";

const initialState = {
  allStores: {},
  onlineStores: {},
  inStoreStores: {},
  topDealsStores: {},
  featuredStores: {},
};

export const apaceStoreReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "SET_ALL_STORES":
      return {
        ...state,
        allStores: { ...action.payload },
      };

    case "SET_ONLINE_STORES":
      return {
        ...state,
        onlineStores: { ...action.payload },
      };

    case "SET_IN_STORE_STORES":
      return {
        ...state,
        inStoreStores: { ...action.payload },
      };

    case "SET_TOP_DEALS_STORES":
      return {
        ...state,
        topDealsStores: { ...action.payload },
      };

    case "SET_FEATURED_STORES":
      return {
        ...state,
        featuredStores: { ...action.payload },
      };

    default:
      return state;
  }
};

export default apaceStoreReducer;
