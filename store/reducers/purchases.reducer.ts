import isEmpty from "is-empty";

const initialState = {
  allPurchases: {},
  allPurchaseCharts: {},
  allPurchaseStatistics: {},
};

export const purchaseReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "SET_ALL_PURCHASES":
      return {
        ...state,
        allPurchases: { ...action.payload },
      };

    case "SET_ALL_PURCHASES_STATISTICS":
      return {
        ...state,
        allLoansStatistics: { ...action.payload },
      };

    case "SET_ALL_PURCHASE_CHARTS":
      return {
        ...state,
        allLoansStatistics: { ...action.payload },
      };

    default:
      return state;
  }
};

export default purchaseReducer;
