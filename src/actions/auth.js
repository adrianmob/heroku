import { types } from "../types/types";
export const login = ({
  api_key,
  userName,
  email,
  tokenAccess,
  tokenRefresh,
  name,
  userType,
  closeSesion,
}) => ({
  type: types.login,
  payload: {
    api_key,
    userName,
    email,
    tokenAccess,
    tokenRefresh,
    name,
    userType,
    closeSesion,
  },
});

export const logout = () => ({
  type: types.logout,
});

export const checkingLogin = () => {
  return (dispatch) => {
    const user = JSON.parse(localStorage.getItem("user_kikoya"));
    if (user) {
      if (user.closeSesion) {
        dispatch(login(user));
      } else {
        localStorage.removeItem("user_kikoya");
      }
    }
  };
};
