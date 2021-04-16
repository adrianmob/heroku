import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { useStyles } from "../../../hooks/useStyle";
import { useForm } from "../../../hooks/useForm";
import { Alerta } from "../Alerta";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import validator from "validator";
import axios from "axios";
import { useSelector } from "react-redux";

export const Validacion = () => {
  const { host, email, phone } = useSelector((state) => state.registro);
  const history = useHistory();
  const classes = useStyles();
  const [{ open, message, emoji, success }, setOpen] = useState({
    open: false,
    message: "",
    emoji: "",
    success: false,
  });
  const [errors, setErrors] = useState({});

  const [{ codigo }, handleChange] = useForm({
    codigo: "",
  });

  const handleClose = () => {
    setOpen({
      open: false,
      message: "",
      emoji: "",
      success: false,
    });
    if (success) history.push("/auth/user/create_password");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validForm();
    if (Object.keys(errors).length === 0) {
      try {
        const { data } = await axios.post(
          "https://kikoya-portal.herokuapp.com/api/v1/enrollment/validate/",
          {
            host,
            otp: codigo,
            email,
            phone,
          }
        );

        if (data.result == "Ok")
          updAlerta("Se validó tu código con éxito.", "✅", true);
      } catch (error) {
        console.log(error.response);
        updAlerta("Código inválido.", "⛔");
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

    if (validator.isEmpty(codigo)) {
      errors.codigo = "Campo requerido.";
    }

    setErrors(errors);

    return errors;
  };

  const handleInputPress = (e) => {
    let error = "";

    if (validator.isEmpty(e.target.value)) {
      error = "Campo obligatorio";
    }

    setErrors({ ...errors, [e.target.name]: error });
  };

  return (
    <div className="registro__container">
      <div className="registro__form">
        <form onSubmit={handleSubmit}>
          <h1 className="titulo">Ya estas a unos pasos 🙌</h1>
          <p className="informacion_parrafo">
            Te llegará un código el cual deberas ingresar y posteriormente debes
            presionar el botón “Validar Código” para continuar con tu registro,
            recuerda que el código dura 5 minutos.
          </p>
          <div className="registro__containerInput">
            <TextField
              className="registro__input"
              label="Codigo"
              name="codigo"
              size="small"
              value={codigo}
              onChange={handleChange}
              onKeyUp={handleInputPress}
              error={errors.codigo ? true : false}
              helperText={errors.codigo && errors.codigo}
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
            VALIDAR CÓDIGO
          </Button>
          <Link
            style={{ display: "block", margin: "8px 0" }}
            className="forgotPass"
          >
            ¿No recibiste tu NIP? Reenviar código
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
