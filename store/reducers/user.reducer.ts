import isEmpty from "is-empty";

const initialState = {
  user: {},
  businessType: null,
  otp: null,
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

    case "SET_OTP":
      return {
        ...state,
        otp: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
