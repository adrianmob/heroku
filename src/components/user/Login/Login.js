import React, { useState } from "react";
import {
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import validator from "validator";
import { Link } from "react-router-dom";
import { Alerta } from "../Alerta";
import { useForm } from "../../../hooks/useForm";

export const Login = () => {
  const user = {
    email: "admin@gmail.com",
    password: "123456",
  };

  const [{ open, message, emoji }, setOpen] = useState({
    open: false,
    message: "",
    emoji: "",
  });
  const [errors, setErrors] = useState({});
  const [{ email, password }, handleChange] = useForm({
    email: "",
    password: "",
  });

  const handleClose = () => {
    setOpen({
      open: false,
      message: "",
      emoji: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validForm();
    if (Object.keys(errors).length === 0) {
      if (user.email === email) {
        if (user.password === password) {
          updAlerta("Tu sesión se inicio correctamente.", "👍");
        } else {
          updAlerta("Contraseña inválida.", "⚠️");
        }
      } else {
        updAlerta("Correo inválido.", "⚠️");
      }
    }
  };

  const updAlerta = (message, emoji) => {
    setOpen({
      open: true,
      message,
      emoji,
    });
  };

  const validForm = () => {
    setErrors({});
    let errors = {};
    if (!validator.isEmail(email)) {
      errors.email = "ingrese un email valido";
    }

    if (validator.isEmpty(email)) {
      errors.email = "Campo obligatorio";
    }

    if (validator.isEmpty(password)) {
      errors.password = "Campo obligatorio";
    }

    setErrors(errors);

    return errors;
  };

  const handleInputPress = (e) => {
    let error = "";
    switch (e.target.name) {
      case "email":
        if (!validator.isEmail(e.target.value)) {
          error = "Ingrese un email valido";
        }
        break;

      default:
        break;
    }

    if (validator.isEmpty(e.target.value)) {
      error = "Campo obligatorio";
    }

    setErrors({ ...errors, [e.target.name]: error });
  };

  return (
    <div className="login__container">
      <div className="login__form">
        <form onSubmit={handleSubmit}>
          <h1 className="login">Bienvenido a KIKOYA</h1>
          <div className="login__containerInput">
            <TextField
              className="login__input"
              label="Correo"
              name="email"
              value={email}
              onChange={handleChange}
              onKeyUp={handleInputPress}
              error={errors.email ? true : false}
              helperText={errors.email && errors.email}
            />
          </div>
          <div className="login__containerInput">
            <TextField
              className="login__input"
              label="Contraseña"
              name="password"
              size="small"
              type="password"
              value={password}
              onChange={handleChange}
              onKeyUp={handleInputPress}
              error={errors.password ? true : false}
              helperText={errors.password && errors.password}
            />
          </div>

          <div className="containerRecoveryLogin">
            <FormControlLabel
              value="end"
              control={<Checkbox color="primary" />}
              label={<span style={{ fontSize: "14px" }}>No cerrar sesión</span>}
              labelPlacement="end"
            />
            <Link className="forgotPass" to="/auth/user/recovery">
              ¿Olvidaste tu contraseña? <b>Recuperala</b>
            </Link>
          </div>
          <Button
            variant="contained"
            style={{
              width: "100%",
              display: "block",
              padding: "15px 0",
              margin: "15px 0",
              maxWidth: "400px",
            }}
            color="primary"
            type="submit"
          >
            INICIAR SESIÓN
          </Button>
          <Link
            style={{ display: "block", margin: "8px 0" }}
            to="/auth/user/registro"
            className="forgotPass"
          >
            ¿No tienes cuenta? <b>Registrate</b>
          </Link>

          <Link
            style={{ display: "block", margin: "8px 0" }}
            to="/auth/financiero/login"
            className="forgotPass"
          >
            ¿Eres usuario financiero? <b>Entra aquí</b>
          </Link>
        </form>
      </div>
      <div className="capaLogo"></div>
      <Alerta
        open={open}
        message={message}
        emoji={emoji}
        handleClose={handleClose}
      />
    </div>
  );
};
