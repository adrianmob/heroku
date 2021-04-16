import React from "react";
import { Grid, Button } from "@material-ui/core";
import "./style.scss";
import AttachFileIcon from "@material-ui/icons/AttachFile";

import { Tabla } from "./Tabla";

export const InfoCredito = () => {
  return (
    <div>
      <main>
        <Grid container spacing={3}>
          <Grid item sm={6} xs={12}>
            <div className="clientes__titulo">
              <div className="clientes__chip">
                <span>1</span>
              </div>
              <h3>Descargar plantilla</h3>
            </div>
            <p>
              Has clic para descargar la plantilla base para su llenado si es
              que lo necesitas
            </p>
            <Button
              className="clientes__button"
              variant="outlined"
              color="primary"
            >
              Descargar
            </Button>
          </Grid>
          <Grid item sm={6} xs={12}>
            <div className="clientes__titulo">
              <div className="clientes__chip">
                <span>2</span>
              </div>
              <h3>Cargar plantilla completa</h3>
            </div>
            <p>Adjunta el archivo que descargaste ya llenado</p>
            <input
              accept="csv/*"
              id="csv"
              type="file"
              style={{ display: "none" }}
            />
            <label htmlFor="csv">
              <Button
                variant="contained"
                className="clientes__button"
                component="span"
              >
                <p>Seleccionar archivo</p>
                <AttachFileIcon className="icon" />
              </Button>
            </label>
          </Grid>
          <Grid item sm={6} xs={12}>
            <div className="clientes__titulo">
              <div className="clientes__chip">
                <span>3</span>
              </div>
              <h3>Registros que no se cargaron</h3>
            </div>
            <Tabla />
          </Grid>
          <Grid item sm={6} xs={12}>
            <div className="clientes__titulo">
              <div className="clientes__chip">
                <span>4</span>
              </div>
              <h3>Limpiar registros</h3>
            </div>
            <p>
              Si tuviste un error al subir tu archivo, da clic en el siguiente
              boton para eliminarlo
            </p>
            <Button
              className="clientes__button"
              variant="contained"
              color="primary"
              style={{ color: "#ffffff" }}
            >
              Limpiar registros
            </Button>
          </Grid>
        </Grid>
      </main>
    </div>
  );
};
