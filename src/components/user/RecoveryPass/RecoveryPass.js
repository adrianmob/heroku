import React, { useState } from "react";
import { TextField, Button, IconButton } from "@material-ui/core";
import { useStyles } from "../../../hooks/useStyle";
import { useForm } from "../../../hooks/useForm";
import { Alerta } from "../Alerta";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import validator from "validator";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import axios from "axios";

export const RecoveryPass = () => {
  const history = useHistory();
  const user = "admin@gmail.com";
  const classes = useStyles();
  const [{ open, message, emoji, success }, setOpen] = useState({
    open: false,
    message: "",
    emoji: "",
    success: false,
  });
  const [errors, setErrors] = useState({});

  const [{ email }, handleChange] = useForm({
    email: "",
  });

  const handleClose = () => {
    setOpen({
      open: false,
      message: "",
      emoji: "",
      success: false,
    });
    if (success) history.push("/auth/user/changepassword");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validForm();
    if (Object.keys(errors).length === 0) {
      // if (email === user) {
      //   updAlerta(
      //     "Se envio correctamente el corre, recibirás un correo electrónico con instrucciones sobre cómo restablecer tu contraseña.",
      //     "✅",
      //     true
      //   );
      // } else {
      //   updAlerta("El correo no existe.", "⚠️");
      // }
      try {
        const { data } = await axios.post(
          "https://kikoya-portal.herokuapp.com/api/v1/user/recovery_password/",
          {
            host: "sandbox001369cd406f49aa875bd8f230a0de80.mailgun.org",
            email,
          }
        );

        console.log(data);
      } catch (error) {
        console.log(error.response);
        updAlerta("Algo salio mal en el servidor", "⚠️");
      }
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

    if (!validator.isEmail(email)) {
      errors.email = "Ingrese un email valido.";
    }

    setErrors(errors);

    return errors;
  };

  const handleBack = () => {
    history.goBack();
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
    <>
      <div className="registro__container">
        <div className="container_back">
          <IconButton onClick={handleBack} style={{ color: "#FCBB13" }}>
            <ArrowBackIcon />
          </IconButton>
        </div>
        <div className="registro__form">
          <form onSubmit={handleSubmit}>
            <h1 className="titulo">Recupera tu contraseña</h1>
            <p className="informacion_parrafo">
              Ingresa el correo con el cual te registraste y te enviaremos las
              instrucciones para recuperarla.
            </p>
            <div className="registro__containerInput">
              <TextField
                className="registro__input"
                label="Correo"
                name="email"
                value={email}
                onChange={handleChange}
                onKeyUp={handleInputPress}
                error={errors.email ? true : false}
                helperText={errors.email && errors.email}
              />
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
              Enviar correo de confirmación
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
