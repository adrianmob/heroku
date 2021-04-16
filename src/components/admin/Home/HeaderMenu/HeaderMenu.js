import React, { useState } from "react";
import { Tabs, Tab } from "@material-ui/core";
import WhiteLabel from "../WhiteLabel";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { itemsSubMenu } from "../../../../data/submenu";
import { useParams } from "react-router-dom";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {" "}
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export const HeaderMenu = ({ id_menu }) => {
  const history = useHistory();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleMenu = () => {
    history.push("/admin/configuracion/branding");
  };
  return (
    <div>
      <h3>{itemsSubMenu[id_menu].titulo}</h3>
      {id_menu !== 0 && (
        <>
          {" "}
          <Tabs
            value={value}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleChange}
          >
            {itemsSubMenu[id_menu].items.map((item) => (
              <Tab
                key={item.id}
                style={{ textTransform: "capitalize" }}
                label={item.titulo}
              />
            ))}
          </Tabs>
          {itemsSubMenu[id_menu].items.map((item, idx) => (
            <TabPanel key={item.id} value={value} index={idx}>
              <item.component />
            </TabPanel>
          ))}
        </>
      )}
    </div>
  );
};
