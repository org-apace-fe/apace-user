import isEmpty from "is-empty";

const initialState = {
  user: {},
  loading: false,
  referrals: {},
  referralActivities: {},
  referralStatistics: {},
  businessType: null,
  identifier: {},
  isAuthenticated: false,
  countries: {},
};

export const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: { ...action.payload },
      };
    case "SET_ALL_COUNTRIES":
      return {
        ...state,
        countries: { ...action.payload },
      };
    case "SET_ALL_REFERRALS":
      return {
        ...state,
        referrals: { ...action.payload },
      };
    case "SET_REFERRALS_ACTIVITIES":
      return {
        ...state,
        referralActivities: { ...action.payload },
      };
    case "SET_REFERRALS_STATISTICS":
      return {
        ...state,
        referralStatistics: { ...action.payload },
      };
    case "SET_BUSINESS_TYPE":
      return {
        ...state,
        businessType: action.payload,
      };
    case "SET_IDENTIFIER":
      return {
        ...state,
        identifier: { ...action.payload },
      };
    default:
      return state;
  }
};

export default userReducer;
