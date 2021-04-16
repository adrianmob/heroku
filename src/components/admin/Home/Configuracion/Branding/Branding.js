import React from "react";
import Button from "@material-ui/core/Button";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import "./style.scss";
import Grid from "@material-ui/core/Grid";
import { Colors } from "./Colors";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

export const Branding = () => {
  return (
    <div>
      <form className="branding__form">
        <Grid container spacing={3}>
          <Grid item xl={4} lg={4} sm={6} xs={12}>
            <div className="branding__containerInput">
              <h3>Logotipo (180px - 70px)</h3>
              <input
                accept="image/*"
                id="logotipo"
                type="file"
                style={{ display: "none" }}
              />
              <label htmlFor="logotipo">
                <Button
                  variant="contained"
                  className="branding__button"
                  component="span"
                >
                  <p>Seleccionar archivo</p>
                  <AttachFileIcon className="icon" />
                </Button>
              </label>
            </div>
          </Grid>
          <Grid item xl={4} lg={4} sm={6} xs={12}>
            <div className="branding__containerInput">
              <h3>Botón principal (botón con relleno)</h3>
              <Colors />
            </div>
          </Grid>
          <Grid item xl={4} lg={4} sm={6} xs={12}>
            <div className="branding__containerInput">
              <h3>Botón secundario (botón solo con borde)</h3>
              <Colors />
            </div>
          </Grid>
          <Grid item xl={4} lg={4} sm={6} xs={12}>
            <div className="branding__containerInput">
              <h3>Imagen landing (647px - 895px) </h3>
              <input
                accept="image/*"
                id="logotipo"
                type="file"
                style={{ display: "none" }}
              />
              <label htmlFor="logotipo">
                <Button
                  variant="contained"
                  className="branding__button"
                  component="span"
                >
                  <p>Seleccionar archivo</p>
                  <AttachFileIcon className="icon" />
                </Button>
                <FormControlLabel
                  value="end"
                  control={<Checkbox color="primary" />}
                  label={<span style={{ fontSize: "14px" }}>Sin imagen</span>}
                  labelPlacement="end"
                />
              </label>
            </div>
          </Grid>
          <Grid item xl={4} lg={4} sm={6} xs={12}>
            <div className="branding__containerInput">
              <h3>Iconos</h3>
              <Colors />
            </div>
          </Grid>
          <Grid item xl={4} lg={4} sm={6} xs={12}>
            <div className="branding__containerInput">
              <h3>Selecciones (links, palabra seleccionada)</h3>
              <Colors />
            </div>
          </Grid>
        </Grid>
        <div className="branding__container_save">
          <Button
            className="branding__save_btn"
            variant="contained"
            color="primary"
          >
            Guardar cambios
          </Button>
        </div>
      </form>
    </div>
  );
};
