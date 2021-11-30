import isEmpty from "is-empty";

const initialState = {
  allPurchases: {},
  allPurchaseCharts: {},
  allPurchaseStatistics: {},
  oneOrder: {},
};

export const purchaseReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "SET_ALL_PURCHASES":
      return {
        ...state,
        allPurchases: { ...action.payload },
      };

    case "SET_ONE_ORDER":
      return {
        ...state,
        oneOrder: action.payload,
      };

    case "SET_ALL_PURCHASES_STATISTICS":
      return {
        ...state,
        allPurchaseStatistics: { ...action.payload },
      };

    case "SET_ALL_PURCHASE_CHARTS":
      return {
        ...state,
        allPurchaseCharts: { ...action.payload },
      };

    default:
      return state;
  }
};

export default purchaseReducer;
