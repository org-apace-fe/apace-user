import isEmpty from "is-empty"

const initialState = {
  user: {},
  businessType : null

};

export const userReducer = (state = initialState, action:any) => {
  switch (action.type) {
    case "SET_BUSINESS_TYPE":
      return {
        ...state,
        businessType: action.payload ,
      };
    default:
      return state;
  }
};

export default userReducer;
