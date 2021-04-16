import { React } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";
import { Branding } from "../components/admin/Home/Branding/Branding";
import { WhiteLabel } from "../components/admin/Home/WhiteLabel/WhiteLabel";
import { AddEdit } from "../components/admin/Home/WhiteLabel/AddEdit/AddEdit";
import { Layout } from "../components/admin/Home/Layout/Layout";
import { Clientes } from "../components/admin/Home/CargaMasiva/InfoCredito/InfoCredito";
import { Cliente } from "../components/admin/Home/Clientes/Cliente";
import { PrivateRoute } from "./PrivateRoute";
import { useSelector } from "react-redux";

export const MenuRouter = () => {
  debugger;
  const { api_key } = useSelector((state) => state.auth);

  return (
    <>
      <Router>
        <Switch>
          <Route
            path="/admin/cargamasiva/clientes"
            component={Clientes}
          ></Route>
          <Redirect to="/auth" />
        </Switch>
      </Router>
    </>
  );
};
