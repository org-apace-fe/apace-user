import isEmpty from "is-empty";

const initialState = {
  user: {},
  businessType: null,
  identifier: {},
};

export const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
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
