import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { checkingLogin } from "../actions/auth";
import { WhiteLabel } from "../components/admin/Home/WhiteLabel/WhiteLabel";
import { AddEdit } from "../components/admin/Home/WhiteLabel/AddEdit/AddEdit"
import { Layout } from '../components/admin/Home/Layout/Layout'
import { Cliente } from "../components/admin/Home/Clientes/Cliente";
import { AuthRouter } from "./AuthRouter";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { CargaMasiva } from "../components/admin/Home/CargaMasiva/CargaMasiva";
import { Configuracion } from "../components/admin/Home/Configuracion/Configuracion";

export const AppRouter = () => {
  const { api_key } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkingLogin());
  }, [dispatch]);
  return (
    <>
      <Router>
        <Switch>
          <PublicRoute
            isAuthenticated={!!api_key}
            path="/auth"
            component={AuthRouter}
          ></PublicRoute>
          <PrivateRoute
            isAuthenticated={!!api_key}
            exact
            path="/admin/layout/Layout"
            component={Layout}
          ></PrivateRoute>
          <PrivateRoute
            isAuthenticated={!!api_key}
            exact
            path="/admin/clientes"
            component={Cliente}
          ></PrivateRoute>
          <PrivateRoute
            isAuthenticated={!!api_key}
            exact
            path="/admin/carga_masiva"
            component={CargaMasiva}
          ></PrivateRoute>
          <PrivateRoute
            isAuthenticated={!!api_key}
            exact
            path="/admin/configuracion"
            component={Configuracion}
          ></PrivateRoute>
          <PrivateRoute
            isAuthenticated={!!api_key}
            exact
            path="/admin/whitelabel/WhiteLabel"
            component={WhiteLabel}
          ></PrivateRoute>
          <PrivateRoute
            isAuthenticated={!!api_key}
            exact
            path="/admin/whitelabel/edit/:id"
            component={AddEdit}
          ></PrivateRoute>
          <PrivateRoute
            isAuthenticated={!!api_key}
            exact
            path="/admin/whiteLabel/create"
            component={AddEdit}
          ></PrivateRoute>

          <Redirect to="/auth" />
        </Switch>
      </Router>
    </>
  );
};
