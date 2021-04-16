import React, { useState } from "react";
import {
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import validator from "validator";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import "moment/locale/es";
import { useStyles } from "../../../hooks/useStyle";
import { useForm } from "../../../hooks/useForm";
import { Alerta } from "../Alerta";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { registrar } from "../../../actions/registro";

export const Registro = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const [{ open, message, emoji, success }, setOpen] = useState({
    open: false,
    message: "",
    emoji: "",
    success: false,
  });
  const [response, setResponse] = useState({
    host: "",
    email: "",
    phone: "",
    numeroCliente: "",
    birthday: "",
  });
  const [errors, setErrors] = useState({});
  const [date, setDate] = useState(Date.now());

  const handleDateChange = (date) => {
    setDate(date);
  };
  const [
    { numeroCliente, email, telefono, avisoPrivacidad, terminosCond },
    handleChange,
  ] = useForm({
    numeroCliente: "",
    email: "",
    telefono: "",
    avisoPrivacidad: false,
    terminosCond: false,
  });

  const handleClose = () => {
    setOpen({
      open: false,
      message: "",
      emoji: "",
    });
    if (success) {
      console.log(response);

      dispatch(registrar(response));
      history.push("/auth/user/validacion");
    }
  };

  const handleSubmit = async (e) => {
    // console.log(date.format("YYYY-MM-DD"));
    e.preventDefault();
    const errors = validForm();
    if (Object.keys(errors).length === 0) {
      if (!avisoPrivacidad) {
        updAlerta(
          "Debes aceptar los avisos de privacidad para poder continuar.",
          "⚠️"
        );
        return;
      }

      if (!terminosCond) {
        updAlerta(
          "Debes aceptar los términos y condiciones para continuar.",
          "⚠️"
        );
        return;
      }

      try {
        const { data } = await axios.post(
          "https://kikoya-portal.herokuapp.com/api/v1/enrollment/registry/",
          {
            host: "sandbox001369cd406f49aa875bd8f230a0de80.mailgun.org",
            client_number: numeroCliente,
            email: email,
            phone: telefono,
            birthday: date.format("YYYY-MM-DD"),
          }
        );

        const { user } = data;

        setResponse({
          host: user.host,
          email: user.email,
          phone: user.phone,
          birthday: date.format("YYYY-MM-DD"),
          numeroCliente,
        });

        updAlerta(
          "Se ha enviado un NIP a tu correo electrónico y celular.",
          "🔢",
          true
        );
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
      errors.email = "Ingrese un email valido";
    }

    if (validator.isEmpty(numeroCliente)) {
      errors.numeroCliente = "Campo obligatorio";
    }
    if (validator.isEmpty(telefono)) {
      errors.telefono = "Campo obligatorio";
    }
    if (validator.isEmpty(email)) {
      errors.email = "Campo obligatorio";
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
    <div className="registro__container">
      <div className="registro__form">
        <form onSubmit={handleSubmit}>
          <h1 className="titulo">Registrate para ser parte de KIKOYA</h1>
          <p className="informacion_parrafo">
            Ten a la mano la información de tu cuenta para poder acceder.
          </p>
          <div className="registro__containerInput">
            <TextField
              className="registro__input"
              label="Número de cliente"
              name="numeroCliente"
              value={numeroCliente}
              onChange={handleChange}
              onKeyUp={handleInputPress}
              type="password"
              error={errors.numeroCliente ? true : false}
              helperText={errors.numeroCliente && errors.numeroCliente}
            />
          </div>
          <div className="registro__containerInput">
            <MuiPickersUtilsProvider utils={MomentUtils} locale="es">
              <KeyboardDatePicker
                className="registro__input"
                format="DD/MM/yyyy"
                label="Fecha de nacimiento"
                value={date}
                placeholder="dd/mm/aaaa"
                onChange={handleDateChange}
              />
            </MuiPickersUtilsProvider>
          </div>
          <div className="registro__containerInput">
            <TextField
              className="registro__input"
              label="Teléfono"
              type="number"
              name="telefono"
              value={telefono}
              onChange={handleChange}
              error={errors.telefono ? true : false}
              helperText={errors.telefono && errors.telefono}
              onKeyUp={handleInputPress}
            />
          </div>
          <div className="registro__containerInput">
            <TextField
              className="registro__input"
              label="Correo electrónico"
              name="email"
              type="email"
              value={email}
              error={errors.email ? true : false}
              helperText={errors.email && errors.email}
              onChange={handleChange}
              onKeyUp={handleInputPress}
            />
          </div>

          <div className="containerRecoveryLogin">
            <FormControlLabel
              value="end"
              control={
                <Checkbox
                  value={avisoPrivacidad}
                  name="avisoPrivacidad"
                  onChange={handleChange}
                  color="primary"
                />
              }
              label={
                <span style={{ fontSize: "14px" }}>
                  Estoy de acuerdo con el Aviso de privacidad
                </span>
              }
              labelPlacement="end"
            />
            <FormControlLabel
              value="end"
              control={
                <Checkbox
                  value={terminosCond}
                  name="terminosCond"
                  onChange={handleChange}
                  color="primary"
                />
              }
              label={
                <span style={{ fontSize: "14px" }}>
                  Acepto los Términos y condiciones
                </span>
              }
              labelPlacement="end"
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
            REGÍSTRATE
          </Button>
          <Link
            style={{ display: "block", margin: "8px 0" }}
            className="forgotPass"
            to="/auth/user/login"
          >
            ¿Ya tienes una cuenta? Inicia sesión
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
