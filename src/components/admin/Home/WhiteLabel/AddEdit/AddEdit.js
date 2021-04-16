import React, { useEffect, useState } from "react";
import HeaderAction from "../../HeaderAction";
import { useSelector } from "react-redux";
import { useForm } from '../../../../../hooks/useForm';
import {
  TextField,
  Button
} from '@material-ui/core'
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import './style.scss'
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import { useStyles } from "../../../../../hooks/useStyle"
import validator from "validator";
import { Alerta } from "../../../Login/Alerta"
import { AlertaConfirmacion } from '../../../Login/AlertaConfirmacion'

let activeWhite = true;

function AddEdit({ history, match }) {
  const { tokenAccess } = useSelector((state) => state.auth);
  const config = {
    headers: {
      Authorization: 'Bearer ' + tokenAccess
    }
  }
  const { id } = match.params;
  const isAddMode = !id;
  const [checkState, setCheckState] = useState({
    active: true
  });

  const [checkStatePass, setCheckStatePass] = useState({
    require_strong_password: true
  });

  const [whitelabel, setWhitelabel] = useState({})
  const classes = useStyles();
  const [errors, setErrors] = useState({});

  const [
    {
      host, display_name, id_empresa, max_user_financier, max_user_admin,
      max_user, max_size_file, name, active, require_strong_password
    },
    handleChange,
    changeValue,
    reset,
  ] = useForm({
    host: '',
    display_name: '',
    id_empresa: 0,
    max_user_financier: 0,
    max_user_admin: 0,
    max_user: 0,
    max_size_file: 0,
    name: '',
    active: true,
    require_strong_password: true
  });

  const [{ open, message, emoji }, setOpen] = useState({
    open: false,
    message: "",
    emoji: "",
  });

  const [{ openC, messageC, emojiC, textButton }, setOpenC] = useState({
    openC: false,
    messageC: "",
    emojiC: "",
    textButton: "",
  })

  const updAlerta = (message, emoji) => {
    setOpen({
      open: true,
      message,
      emoji,
    });
  };

  const updAlertaConfirma = (messageC, emojiC, textButton) => {
    setOpenC({
      openC: true,
      messageC,
      emojiC,
      textButton
    })
  }

  const handleClose = () => {
    setOpen({
      open: false,
      message: "",
      emoji: "",
    });
    return history.push('..')
  };

  const handleCloseC = () => {
    setOpenC({
      openC: false,
      messageC: "",
      emojiC: "",
      textButton: ""
    })
  }

  const handleAcceptC = () => {
    setOpenC({
      openC: false,
      messageC: "",
      emojiC: "",
      textButton: ""
    });
    setCheckState({ ...checkState, "active": activeWhite })
  }

  const handleChangeCheck = (event) => {
    activeWhite = event.target.checked;

    if (event.target.checked == false) {
      updAlertaConfirma("¿Seguro que deseas desactivar la instancia?", "⚠️", "Desactivar instancia")
    } else {
      updAlertaConfirma("¿Seguro que deseas activar la instancia?", "⚠️", "Activar instancia")
    }
  };

  const handleChangeCheckPass = (event) => {
    setCheckStatePass({ ...checkStatePass, [event.target.name]: event.target.checked });
  };

  const IOSSwitch = withStyles((theme) => ({
    root: {
      width: 42,
      height: 26,
      padding: 0,
      margin: theme.spacing(1),
    },
    switchBase: {
      padding: 1,
      "&$checked": {
        transform: "translateX(16px)",
        color: theme.palette.common.white,
        "& + $track": {
          backgroundColor: "#52d869",
          opacity: 1,
          border: "none",
        },
      },
      "&$focusVisible $thumb": {
        color: "#52d869",
        border: "6px solid #fff",
      },
    },
    thumb: {
      width: 24,
      height: 24,
    },
    track: {
      borderRadius: 26 / 2,
      border: `1px solid ${theme.palette.grey[400]}`,
      backgroundColor: theme.palette.grey[50],
      opacity: 1,
      transition: theme.transitions.create(["background-color", "border"]),
    },
    checked: {},
    focusVisible: {},
  }))(({ classes, ...props }) => {
    return (
      <Switch
        focusVisibleClassName={classes.focusVisible}
        disableRipple
        classes={{
          root: classes.root,
          switchBase: classes.switchBase,
          thumb: classes.thumb,
          track: classes.track,
          checked: classes.checked,
        }}
        {...props}
      />
    );
  });

  const onSubmit = (e) => {
    e.preventDefault();
    const errors = validForm();
    if (Object.keys(errors).length === 0) {
      if (isAddMode) {
        let data = {
          host: e.target.elements.host.value,
          display_name: e.target.elements.display_name.value,
          max_financier_user: e.target.elements.max_user_financier.value,
          max_admin_user: e.target.elements.max_user_admin.value,
          max_client_user: e.target.elements.max_user.value,
          maximum_file_size: e.target.elements.max_size_file.value,
          name: e.target.elements.name.value,
          active: e.target.elements.active.checked,
          require_strong_password: e.target.elements.require_strong_password.checked
        }

        createWhiteLabel(data)
      } else {
        let data = {
          host: e.target.elements.host.value,
          display_name: e.target.elements.display_name.value,
          max_financier_user: e.target.elements.max_user_financier.value,
          max_admin_user: e.target.elements.max_user_admin.value,
          max_client_user: e.target.elements.max_user.value,
          maximum_file_size: e.target.elements.max_size_file.value,
          name: e.target.elements.name.value,
          active: e.target.elements.active.checked,
          require_strong_password: e.target.elements.require_strong_password.checked
        }

        updateWhiteLabel(id, data)
      }
    }
  }

  function createWhiteLabel(data) {
    try {
      axios.post(
        "https://kikoya-portal.herokuapp.com/api/v1/whitelabels",
        data,
        config
      ).then(res => {
        updAlerta("Se agrego correctamente.", "✅");
        // return history.push('.')
      })
    } catch (error) {
      console.log(error);
    }
  }

  function updateWhiteLabel(id, data) {
    try {
      axios.patch(
        "https://kikoya-portal.herokuapp.com/api/v1/whitelabels/" + id,
        data,
        config
      ).then(res => {
        updAlerta("Se actualizó correctamente.", "✅");
        // return history.push('..')
      })
    } catch (error) {
      console.log(error);
    }
  }

  const validForm = () => {
    setErrors({});
    let errors = {}

    if (validator.isEmpty(host)) {
      errors.host = "Campo obligatorio"
    }

    if (validator.isEmpty(name)) {
      errors.name = "Campo obligatorio"
    }

    if (validator.isEmpty(display_name)) {
      errors.display_name = "Campo obligatorio"
    }

    let validate_number = parseInt(max_user_financier, 10);
    if (validate_number <= 0 || isNaN(validate_number)) {
      errors.max_user_financier = "Campo debe ser un valor entero"
    }

    validate_number = parseInt(max_user_admin, 10);
    if (validate_number <= 0 || isNaN(validate_number)) {
      errors.max_user_admin = "Campo debe ser un valor entero"
    }

    validate_number = parseInt(max_user, 10);
    if (validate_number <= 0 || isNaN(validate_number)) {
      errors.max_user = "Campo debe ser un valor entero"
    }

    validate_number = parseInt(max_size_file, 10);
    if (validate_number <= 0 || isNaN(validate_number)) {
      errors.max_size_file = "Campo debe ser un valor entero"
    }

    setErrors(errors);
    return errors;
  }

  useEffect(() => {
    if (!isAddMode) {
      try {
        axios.get(
          "https://kikoya-portal.herokuapp.com/api/v1/whitelabels?id=" + id,
          config
        ).then(res => {
          const fields = {
            host: res.data.host,
            display_name: res.data.display_name,
            id_empresa: res.data.id,
            active: res.data.active,
            max_user_financier: (res.data.max_financier_user === null ? 0 : res.data.max_financier_user),
            max_user_admin: (res.data.max_admin_user === null ? 0 : res.data.max_admin_user),
            max_user: (res.data.max_client_user === null ? 0 : res.data.max_client_user),
            max_size_file: (res.data.maximum_file_size === null ? 0 : res.data.maximum_file_size),
            name: res.data.name
          }
          setCheckState({ ...checkState, "active": res.data.active })
          setCheckStatePass({ ...checkStatePass, "require_strong_password": res.data.active })

          changeValue(fields)
          setWhitelabel(res.data)
        })
      } catch (error) {
        console.log(error)
      }
    }
  }, []);

  return (
    <div>
      <HeaderAction nameComponent="WhiteLabel" idComponent={1} nameActionComponent={isAddMode ? 'Agregar Empresa' : 'Editar Empresa'} />
      <form className="form__edition" onSubmit={onSubmit} onReset={reset}>
        <Grid container spacing={0}>
          <Grid item xs={4} sm={4} md={4}>
            <TextField
              label="Alias"
              name="display_name"
              id="display_name"
              className="registro__input"
              value={display_name}
              type="text"
              onChange={handleChange}
              error={errors.display_name ? true : false}
              helperText={errors.display_name && errors.display_name}
            />
          </Grid>
          <Grid item xs={4} sm={4} md={4}>
            <TextField
              label="Host"
              name="host"
              className="registro__input"
              type="text"
              value={host}
              onChange={handleChange}
              error={errors.host ? true : false}
              helperText={errors.host && errors.host}
            />
          </Grid>
          <Grid item xs={4} sm={4} md={4}>
            <TextField
              label="Nombre"
              name="name"
              className="registro__input"
              type="text"
              value={name}
              onChange={handleChange}
              error={errors.name ? true : false}
              helperText={errors.name && errors.name}
            />
          </Grid>
          {
            !isAddMode ?
              (
                <Grid item xs={4} sm={4} md={4}>
                  <TextField
                    label="Identificador de Empresa"
                    name="id_empresa"
                    className="registro__input"
                    type="text"
                    onChange={handleChange}
                    readOnly="True"
                    value={id_empresa}
                    error={errors.id_empresa ? true : false}
                    helperText={errors.id_empresa && errors.id_empresa}
                    disable
                  />
                </Grid>
              ) :
              (
                <div></div>
              )
          }
          <Grid item xs={4} sm={4} md={4}>
            <FormGroup>
              <FormControlLabel
                control={<IOSSwitch checked={checkState.active} onChange={handleChangeCheck} name="active" />}
                label="Seguridad (Activación de instancia)"
              />
            </FormGroup>
          </Grid>
          <Grid item xs={4} sm={4} md={4}>
            <FormGroup>
              <FormControlLabel
                control={<IOSSwitch checked={checkStatePass.require_strong_password} onChange={handleChangeCheckPass} name="require_strong_password" />}
                label="Seguridad (Contraseña robusta)"
              />
            </FormGroup>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <h2>Tarificador</h2>
            <h3>Número de Usuarios</h3>
          </Grid>
          <Grid item xs={4} sm={4} md={4}>
            <TextField
              label="Máximo usuarios financieros"
              name="max_user_financier"
              className="registro__input"
              type="number"
              value={max_user_financier}
              error={errors.max_user_financier ? true : false}
              helperText={errors.max_user_financier && errors.max_user_financier}
              min="1"
              max="150"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4} sm={4} md={4}>
            <TextField
              label="Máximo usuarios administradores"
              name="max_user_admin"
              className="registro__input"
              type="number"
              value={max_user_admin}
              error={errors.max_user_admin ? true : false}
              helperText={errors.max_user_admin && errors.max_user_admin}
              min="1"
              max="150"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4} sm={4} md={4}>
            <TextField
              label="Máximo de clientes"
              name="max_user"
              className="registro__input"
              type="number"
              value={max_user}
              error={errors.max_user ? true : false}
              helperText={errors.max_user && errors.max_user}
              min="1"
              max="150"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <h3>Tamaño máximo de archivo CSV</h3>
          </Grid>
          <Grid item xs={4} sm={4} md={4}>
            <TextField
              label="Tamaño máximo de archivo"
              name="max_size_file"
              className="registro__input"
              type="number"
              value={max_size_file}
              error={errors.max_size_file ? true : false}
              helperText={errors.max_size_file && errors.max_size_file}
              min="1"
              max="100"
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Grid container spacing={0}>
          <Grid item xs={4} sm={4} md={4}>
            <Button
              variant="contained"
              className={classes.primary}
              style={{
                width: "90%",
                display: "block",
                padding: "15px 0",
                margin: "15px 0",
                maxWidth: "400px",
              }}
              type="submit"
            >
              {
                !isAddMode ? "ACTUALIZAR" : "AGREGAR"
              }
            </Button>
          </Grid>
        </Grid>
      </form>
      <Alerta
        open={open}
        message={message}
        emoji={emoji}
        handleClose={handleClose}
      />
      <AlertaConfirmacion
        openC={openC}
        messageC={messageC}
        emojiC={emojiC}
        textButton={textButton}
        handleCloseC={handleCloseC}
        handleAcceptC={handleAcceptC}
      />
    </div>
  )
}

export { AddEdit };
