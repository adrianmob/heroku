import React from "react";
import Header from "../Header";
import "./styles.scss";
export const Cliente = () => {
  return (
    <div>
      <Header id_menu={0} />
      <main className="clientes__container">
        <div className="clientes__tarjetasInfo">
          <div className="clientes__tarjetaItem">
            <p className="clientes__tarjetaTitulo">Clientes Activos</p>
            <p className="clientes__tarjetaData">2</p>
          </div>
          <div className="clientes__tarjetaItem">
            <p className="clientes__tarjetaTitulo">Clientes Bloqueados</p>
            <p className="clientes__tarjetaData">2</p>
          </div>
          <div className="clientes__tarjetaItem">
            <p className="clientes__tarjetaTitulo">Clientes Actualizados</p>
            <p className="clientes__tarjetaData">2</p>
          </div>
          <div className="clientes__tarjetaItem">
            <p className="clientes__tarjetaTitulo">Clientes No Actualizados</p>
            <p className="clientes__tarjetaData">2</p>
          </div>
        </div>
      </main>
    </div>
  );
};
