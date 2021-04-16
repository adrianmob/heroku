import { types } from "../types/types";

export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case types.login:
      localStorage.setItem("user_kikoya", JSON.stringify(action.payload));
      return {
        api_key: action.payload.api_key,
        userName: action.payload.userName,
        email: action.payload.email,
        tokenAccess: action.payload.tokenAccess,
        tokenRefresh: action.payload.tokenRefresh,
        name: action.payload.name,
        userType: action.payload.userType,
        closeSesion: action.payload.closeSesion,
      };

    case types.logout:
      localStorage.removeItem("user_kikoya");
      return {};

    default:
      return state;
  }
};
