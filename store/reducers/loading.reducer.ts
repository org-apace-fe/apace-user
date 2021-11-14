import isEmpty from "is-empty";

// const initialState = {
//   user: {},
//   businessType : null

// };

export const loadingReducer = (state = false, action: any) => {
  switch (action.type) {
    case "LOADING_START":
      return true;

    case "LOADING_STOP":
      return false;

    default:
      return state;
  }
};

export default loadingReducer;
