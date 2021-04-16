// STYLES
import "./style.scss";
import "../../../../../node_modules/font-awesome/css/font-awesome.min.css"
// REACT
import React, { useState, useEffect } from 'react';
import Grid from "@material-ui/core/Grid";
import { Link } from 'react-router-dom';
import $ from 'jquery';
import axios from 'axios';
import { useSelector } from 'react-redux'
// DATATABLES
import 'datatables.net-dt/css/jquery.dataTables.min.css'
import 'datatables.net-buttons/js/dataTables.buttons.js'
import 'datatables.net-buttons/js/buttons.html5.min.js'
import 'datatables.net-buttons/js/buttons.print.js'
import 'datatables.net-buttons-dt/css/buttons.dataTables.min.css'
// EXPORT EXCEL, HTML, PDF
import JSZip from 'jszip';

window.JSZip = JSZip;

export const WhiteLabel = () => {
  const { tokenAccess } = useSelector((state) => state.auth);
  const [white, setWhiteLabel] = useState([]);

  useEffect(() => {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + tokenAccess,
        },
      };

      axios.get(
        "http://kikoya-portal.herokuapp.com/api/v1/whitelabels",
        config
      ).then(res => {
        setWhiteLabel(res.data)

        $("#table_whitelabel").DataTable({
          dom: 'Bfrtip',
          buttons: [
            {
              extend: 'copyHtml5',
              text: '<i class="fa fa-files-o"></i>',
              titleAttr: 'Copy'
            },
            {
              extend: 'excelHtml5',
              text: '<i class="fa fa-file-excel-o"></i>',
              titleAttr: 'Excel'
            },
            {
              extend: 'csvHtml5',
              text: '<i class="fa fa-file-text-o"></i>',
              titleAttr: 'CSV'
            },
          ],
          "language": {
            "url": "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
          }
        });
      });
    } catch (error) {
      console.log(error)
    }
  }, []);

  return (
    <div>
      <form className="whitelabel__form">
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <div>
              <h3 className="color_font_text">Portales</h3>
            </div>
          </Grid>
          <Grid
            item
            xs={6}
            style={{
              textAlign: "-webkit-right"
            }}
          >
            <Link
              className="whitelabel__button buttonAdd"
              variant="body2"
              color="primary"
              to="/admin/WhiteLabel/create"
            >
              <i class="fa fa-plus-circle">&nbsp;</i>
                        Agregar nuevo portal
                        </Link>
          </Grid>
          <Grid item xs={12}>
            <table id="table_whitelabel" className="nowrap compact">
              <thead>
                <tr>
                  <th>Empresa</th>
                  <th>Url</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {
                  white.map(w =>
                    <tr key={w.id}>
                      <td className="color_font_text">{w.display_name}</td>
                      <td className="color_font_text">{w.host}</td>
                      <td><Link className="tableEdit" to={`/admin/WhiteLabel/edit/${w.id}`}><i class="fa fa-pencil"> Editar</i></Link></td>
                    </tr>
                  )
                }
              </tbody>
            </table>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}
