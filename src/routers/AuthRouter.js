import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import LoginAdmin from "../components/admin/Login/index";
import LoginFinanc from "../components/financiero/Login/index";
import LoginUser from "../components/user/Login/index";
import { Password } from "../components/user/Password/Password";
import { ChangePass } from "../components/user/RecoveryPass/ChangePass";
import { RecoveryPass } from "../components/user/RecoveryPass/RecoveryPass";
import Registro from "../components/user/Registro/index";
import Validacion from "../components/user/Validacion/index";

export const AuthRouter = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/auth/admin/login" component={LoginAdmin}></Route>
        <Route
          exact
          path="/auth/financiero/login"
          component={LoginFinanc}
        ></Route>
        <Route exact path="/auth/user/login" component={LoginUser}></Route>
        <Route exact path="/auth/user/registro" component={Registro}></Route>
        <Route
          exact
          path="/auth/user/validacion"
          component={Validacion}
        ></Route>
        <Route
          exact
          path="/auth/user/create_password"
          component={Password}
        ></Route>
        <Route
          exact
          path="/auth/user/recovery"
          component={RecoveryPass}
        ></Route>
        <Route
          exact
          path="/auth/user/change_password/:hash"
          component={ChangePass}
        ></Route>
        <Redirect to="/auth/admin/login" />
      </Switch>
    </div>
  );
};
