import React, { useState } from "react";
import {
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Link,
} from "@material-ui/core";
import validator from "validator";

import { Alerta } from "./Alerta";
import { useStyles } from "../../../hooks/useStyle";
import { useForm } from "../../../hooks/useForm";

export const Login = () => {
  const user = {
    email: "admin@gmail.com",
    id: "123456",
  };
  const classes = useStyles();
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

  return (
    <div className="login__container">
      <div className="login__form">
        <form onSubmit={handleSubmit}>
          <h1 className="login">Bienvenido a KIKOYA</h1>
          <div className="login__containerInput">
            {errors.email && <span>{errors.email}</span>}
            <TextField
              className="login__input"
              label="Correo"
              name="email"
              size="small"
              value={email}
              onChange={handleChange}
            />
          </div>
          <div className="login__containerInput">
            {errors.password && <span>{errors.password}</span>}
            <TextField
              className="login__input"
              label="Contraseña"
              name="password"
              size="small"
              type="password"
              value={password}
              onChange={handleChange}
            />
          </div>

          <div className="containerRecoveryLogin">
            <FormControlLabel
              value="end"
              control={<Checkbox color="primary" />}
              label={<span style={{ fontSize: "14px" }}>No cerrar sesión</span>}
              labelPlacement="end"
            />
            <Link component="button" variant="body2" className="forgotPass">
              ¿Olvidaste tu contraseña? <b>Recuperala</b>
            </Link>
          </div>
          <Button
            variant="contained"
            className={classes.primary}
            style={{
              width: "400px",
              display: "block",
              padding: "15px 0",
              margin: "15px 0",
            }}
            //   color="secondary"
            type="submit"
          >
            INICIAR SESIÓN
          </Button>
          <Link
            style={{ display: "block", margin: "8px 0" }}
            component="button"
            variant="body2"
            className="forgotPass"
          >
            ¿No tienes cuenta? <b>Registrate</b>
          </Link>

          <Link
            style={{ display: "block", margin: "8px 0" }}
            component="button"
            variant="body2"
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
