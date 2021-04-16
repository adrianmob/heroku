import { types } from "../types/types";

export const registroReducer = (state = {}, action) => {
  switch (action.type) {
    case types.register:
      return {
        host: action.payload.host,
        email: action.payload.email,
        phone: action.payload.phone,
        numeroCliente: action.payload.numeroCliente,
        birthday: action.payload.birthday,
      };

    default:
      return state;
  }
};
