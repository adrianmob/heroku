import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

export const Tabla = () => {
  return (
    <Table style={{ maxWidth: "200px", borderBottom: "1px solid #fcbb13" }}>
      <TableHead>
        <TableRow>
          <TableCell style={{ borderBottom: "1px solid #fcbb13" }}>
            Filas
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell style={{ borderBottom: "1px solid #fcbb13" }} align="left">
            A1
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ borderBottom: "1px solid #fcbb13" }} align="left">
            A2
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ borderBottom: "1px solid #fcbb13" }} align="left">
            A3
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ borderBottom: "1px solid #fcbb13" }} align="left">
            A4
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
