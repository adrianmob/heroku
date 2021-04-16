import { types } from "../types/types";
export const registrar = ({ host, email, phone, numeroCliente, birthday }) => ({
  type: types.register,
  payload: {
    host,
    email,
    phone,
    numeroCliente,
    birthday,
  },
});
