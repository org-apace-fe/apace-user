import isEmpty from "is-empty";

const initialState = {
  allLoans: {},
  allLoansDue: {},
  allLoansStatistics: {},
  oneLoan: {},
};

export const paymentReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "SET_ALL_LOANS":
      return {
        ...state,
        allLoans: { ...action.payload },
      };
    case "SET_ALL_LOANS_DUE":
      return {
        ...state,
        allLoansDue: { ...action.payload },
      };

    case "SET_ONE_LOAN":
      return {
        ...state,
        oneLoan: action.payload,
      };

    case "SET_ALL_LOANS_STATISTICS":
      return {
        ...state,
        allLoansStatistics: { ...action.payload },
      };

    default:
      return state;
  }
};

export default paymentReducer;
