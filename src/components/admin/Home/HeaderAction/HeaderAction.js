import React from "react";
import ExitToApp from "@material-ui/icons/ExitToApp";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import "./style.scss";
import { useDispatch } from "react-redux";
import { logout } from "../../../../actions/auth";
import { useHistory } from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useSelector } from "react-redux";
import ArrowBack from "@material-ui/icons/ArrowBack";
import Button from "@material-ui/core/Button";
import WorkOutline from "@material-ui/icons/WorkOutline";
import Dehaze from "@material-ui/icons/Dehaze";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import ArrowDropDownOutlinedIcon from "@material-ui/icons/ArrowDropDownOutlined";
import IconButton from "@material-ui/core/IconButton";

export const HeaderAction = (props) => {
  console.log(props);
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
          <Button
            className="header__btn_menu"
            startIcon={
              props.idComponent === 1 ? (
                <WorkOutline className="active" />
              ) : (
                <Dehaze className="active" />
              )
            }
          >
            {props.nameComponent}
          </Button>
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
      <label htmlFor="icon-button-file">
        <IconButton
          onClick={() => history.goBack()}
          color="primary"
          aria-label="upload picture"
          component="span"
        >
          <ArrowBack />
        </IconButton>
      </label>
      <h2>{props.nameActionComponent}</h2>
      <h3>Información general</h3>
    </header>
  );
};
