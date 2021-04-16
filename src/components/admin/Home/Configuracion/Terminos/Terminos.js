import { Button, TextField } from "@material-ui/core";
import React from "react";
import "./styles.scss";

export const Terminos = () => {
  return (
    <main className="terminos__container">
      <h3 className="terminos__titulo">Terminos y avisos de privacidad</h3>
      <p className="terminos__subtitulo">
        Ingresa el texto que llevara cada una de las secciones
      </p>
      <div className="terminos__form">
        <div className="terminos_contInput">
          <p className="terminos__labelInput">Terminos y condiciones</p>
          <TextField
            className="terminos__input"
            multiline
            rows={9}
            variant="filled"
          />
          <Button className="terminos__btn" variant="contained" color="primary">
            Agregar
          </Button>
        </div>
        <div className="terminos_contInput">
          <p className="terminos__labelInput">Aviso de privacidad </p>
          <TextField
            className="terminos__input"
            multiline
            rows={9}
            variant="filled"
          />
          <Button className="terminos__btn" variant="contained" color="primary">
            Agregar
          </Button>
        </div>
        <div className="terminos_contInput">
          <p className="terminos__labelInput">Uso y aceptación de cookies</p>
          <TextField
            className="terminos__input"
            multiline
            rows={9}
            variant="filled"
          />
          <Button className="terminos__btn" variant="contained" color="primary">
            Agregar
          </Button>
        </div>
      </div>
    </main>
  );
};
