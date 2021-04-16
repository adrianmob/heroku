import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { useStyles } from "../../../hooks/useStyle";
import { useForm } from "../../../hooks/useForm";
import { Alerta } from "../Alerta";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import validator from "validator";

export const Password = () => {
  const { host, email } = useSelector((state) => state.registro);

  const history = useHistory();
  const classes = useStyles();
  const [errors, setErrors] = useState({});
  const [{ open, message, emoji, success }, setOpen] = useState({
    open: false,
    message: "",
    emoji: "",
    success: false,
  });

  const [{ password, rePassword }, handleChange] = useForm({
    password: "",
    rePassword: "",
  });

  const handleClose = () => {
    setOpen({
      open: false,
      message: "",
      emoji: "",
      success: false,
    });

    if (success) history.push("/auth/user/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validForm();
    if (Object.keys(errors).length === 0) {
      if (password === rePassword) {
        try {
          const { data } = await axios.post(
            "https://kikoya-portal.herokuapp.com/api/v1/user/create_new_password/",
            {
              host: "sandbox001369cd406f49aa875bd8f230a0de80.mailgun.org",
              email: "adrianquiroz@kikoya.io",
              password,
            }
          );
          if (data.valid)
            updAlerta("Se creo tu contraseña con éxito.", "✅", true);
        } catch (error) {
          console.log(error.response);
          updAlerta("Algo salio mal en el servidor", "⚠️");
        }
      } else {
        updAlerta("La confirmación no coincide con la contraseña.", "⛔");
      }
    } else {
      updAlerta(errors.password, "⛔");
    }
  };

  const updAlerta = (message, emoji, success = false) => {
    setOpen({
      open: true,
      message,
      emoji,
      success,
    });
  };

  const validForm = () => {
    setErrors({});

    let errors = {};
    let expreg = /^(?=.*[!@#$%^&*()--__+.])(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{6,12}$/;

    if (!expreg.test(password))
      errors.password = `Se requiere un formato de:
         1 mayúscula. 
         1 minúscula, 
         1 carácter especial 
         una longitud mínima de 6 y máxima de 12`;

    setErrors(errors);

    return errors;
  };

  return (
    <div className="registro__container">
      <div className="registro__form">
        <form onSubmit={handleSubmit}>
          <h1 className="titulo">Crea tu contraseña 🔒</h1>
          <p className="informacion_parrafo">
            Recuerda que tu contraseña debe tener mínimo 8 dígitos.
          </p>
          <div className="registro__containerInput">
            <TextField
              className="registro__input"
              label="Contraseña"
              name="password"
              type="password"
              value={password}
              onChange={handleChange}
              onKeyUp={validForm}
            />
          </div>
          <div className="registro__containerInput">
            <TextField
              className="registro__input"
              label="Repetir contraseña"
              name="rePassword"
              type="password"
              value={rePassword}
              onChange={handleChange}
            />
          </div>
          <div>
            {errors.password && (
              <p style={{ fontSize: "12px", color: "red" }}>
                {errors.password}
              </p>
            )}
          </div>
          <Button
            variant="contained"
            className={classes.primary}
            style={{
              width: "100%",
              display: "block",
              padding: "15px 0",
              margin: "15px 0",
              maxWidth: "400px",
            }}
            type="submit"
          >
            FINALIZAR REGISTRO
          </Button>
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
