import React, { useState } from "react";
import { TextField, Button, IconButton } from "@material-ui/core";
import { useStyles } from "../../../hooks/useStyle";
import { useForm } from "../../../hooks/useForm";
import { Alerta } from "../Alerta";
import { Link, useHistory } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useParams } from "react-router-dom";
import axios from "axios";

export const ChangePass = () => {
  const history = useHistory();
  const classes = useStyles();
  const [errors, setErrors] = useState({});
  const { hash } = useParams();
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
            "https://kikoya-portal.herokuapp.com/api/v1/user/change_recovery_password/",
            {
              host: "sandbox001369cd406f49aa875bd8f230a0de80.mailgun.org",
              hashRecover: hash,
              password,
            }
          );
          console.log(data);
          if (data)
            updAlerta("Se actualizo tu contraseña con éxito.", "✅", true);
        } catch (error) {
          console.log(error.response);
          updAlerta("Algo salio mal en el servidor", "⚠️");
        }
      } else {
        updAlerta(
          "Confirmación de contraseña no coincide con la contraseña.",
          "⚠️"
        );
      }
    } else {
      updAlerta(errors.password, "⚠️");
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

  const handleBack = () => {
    history.goBack();
  };

  return (
    <>
      <div className="registro__container">
        <div className="container_back">
          <IconButton onClick={handleBack} style={{ color: "#FCBB13" }}>
            <ArrowBackIcon />
          </IconButton>
        </div>
        <div className="registro__form">
          <form onSubmit={handleSubmit}>
            <h1 className="titulo">Cambia tu contraseña</h1>
            <p className="informacion_parrafo">
              Recuerda que tu contraseña debe tener mínimo 8 dígitos.
            </p>
            <div className="registro__containerInput">
              <TextField
                className="registro__input"
                label="Nueva contraseña"
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
                label="Confirmar nueva contraseña"
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
              Cambiar contraseña
            </Button>
            <Link
              style={{ display: "block", margin: "8px 0" }}
              className="forgotPass"
            >
              ¿No te llego el correo? Reenviar correo{" "}
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
    </>
  );
};
