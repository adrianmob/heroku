import React from "react";
import Button from "@material-ui/core/Button";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import ArrowDropDownOutlinedIcon from "@material-ui/icons/ArrowDropDownOutlined";
import ExitToApp from "@material-ui/icons/ExitToApp";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import "./style.scss";
import { HeaderMenu } from "../HeaderMenu/HeaderMenu";
import { useDispatch } from "react-redux";
import { logout } from "../../../../actions/auth";
import { useHistory } from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useSelector } from "react-redux";
import { itemsMenu } from "../../../../data/menu";
import { Link } from "react-router-dom";

export const Header = ({ id_menu }) => {
  const { userName } = useSelector((state) => state.auth);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    dispatch(logout());
    history.push("auth/admin/login");
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <header>
      <div className="header__menuPrincipal">
        <div className="header__botonera">
          {itemsMenu.map((item, idx) => (
            <Button
              key={item.id}
              className={
                id_menu === idx ? "header__btn_menu active" : "header__btn_menu"
              }
              startIcon={<item.icon />}
            >
              <Link
                className={id_menu === idx ? "active" : ""}
                style={{ textDecoration: "none", color: "#284056" }}
                to={item.ruta}
              >
                {item.titulo}
              </Link>
            </Button>
          ))}
          <div className="header__container_logo">
            <img className="logo" src="/imgs/logo.png" alt="logo"></img>
          </div>
        </div>
        <div className="header__user">
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
            className="header__btn_menu"
            endIcon={
              <ArrowDropDownOutlinedIcon
                className="active"
                style={{ fontSize: "30px" }}
              />
            }
            startIcon={<PersonOutlineOutlinedIcon className="active" />}
          >
            {userName}
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            getContentAnchorEl={null}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            transformOrigin={{ vertical: "top", horizontal: "center" }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <ExitToApp fontSize="small" />
              </ListItemIcon>
              Cerrar Sesión
            </MenuItem>
          </Menu>
        </div>
      </div>
      <HeaderMenu id_menu={id_menu} />
    </header>
  );
};
