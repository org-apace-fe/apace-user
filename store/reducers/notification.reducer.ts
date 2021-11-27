import isEmpty from "is-empty";

const initialState = {
  allNotifications: {},
};

export const notificationReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "SET_ALL_NOTIFICATIONS":
      return {
        ...state,
        allNotifications: { ...action.payload },
      };
    default:
      return state;
  }
};

export default notificationReducer;
